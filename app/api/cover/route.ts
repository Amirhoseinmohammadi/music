import { NextResponse } from 'next/server';
import { parseBuffer, selectCover } from 'music-metadata';
import fs from 'fs';
import path from 'path';

/**
 * Normalizes an audio URL:
 * - Detects Google Drive share/view URLs and converts them to direct download/stream URLs.
 * - Detects local relative paths and verifies if the file exists directly in public/.
 * - Resolves relative URLs against the incoming request origin.
 */
function resolveAudioSource(
  rawUrl: string,
  requestUrl: string
): { sourceUrl: string; isGoogleDrive: boolean; localFilePath?: string } {
  const trimmed = rawUrl.trim();

  // 1. Detect Google Drive link patterns
  // Examples:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?id=FILE_ID
  // - https://docs.google.com/uc?id=FILE_ID
  const driveMatch = trimmed.match(
    /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^&]*&)*id=)|docs\.google\.com\/uc\?(?:[^&]*&)*id=)([a-zA-Z0-9_-]{20,})/i
  );
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    const streamUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
    console.log(`[Cover API] Converted Google Drive URL to direct stream link: ${streamUrl}`);
    return {
      sourceUrl: streamUrl,
      isGoogleDrive: true,
    };
  }

  // 2. Check if it's a relative URL or local public path
  if (trimmed.startsWith('/') || !/^https?:\/\//i.test(trimmed)) {
    const relativePath = decodeURIComponent(trimmed.startsWith('/') ? trimmed.slice(1) : trimmed);
    const localPath = path.join(process.cwd(), 'public', relativePath);

    if (fs.existsSync(localPath)) {
      console.log(`[Cover API] Found local audio file on filesystem: ${localPath}`);
      return {
        sourceUrl: trimmed,
        isGoogleDrive: false,
        localFilePath: localPath,
      };
    }

    // Resolve relative path to absolute HTTP URL
    const absoluteUrl = new URL(trimmed, requestUrl).toString();
    console.log(`[Cover API] Resolved relative URL against request origin: ${absoluteUrl}`);
    return {
      sourceUrl: absoluteUrl,
      isGoogleDrive: false,
    };
  }

  return {
    sourceUrl: trimmed,
    isGoogleDrive: false,
  };
}

/**
 * Fetches the audio file into a Buffer.
 * Supports local filesystem reading, HTTP/HTTPS redirect following,
 * and handles Google Drive confirmation/interstitial pages.
 */
async function getAudioBuffer(
  sourceUrl: string,
  isGoogleDrive: boolean,
  localFilePath?: string
): Promise<{ buffer: Buffer; contentType?: string }> {
  // If available directly on the local filesystem, read immediately
  if (localFilePath) {
    console.log(`[Cover API] Reading audio directly from disk: ${localFilePath}`);
    const buffer = await fs.promises.readFile(localFilePath);
    console.log(`[Cover API] Successfully read ${buffer.length} bytes from disk.`);
    return { buffer, contentType: 'audio/mpeg' };
  }

  console.log(`[Cover API] Fetching audio from remote URL: ${sourceUrl}`);
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  let res = await fetch(sourceUrl, {
    redirect: 'follow',
    headers: {
      'User-Agent': userAgent,
      Accept: '*/*',
    },
  });

  console.log(`[Cover API] Response status: ${res.status} ${res.statusText}`);
  console.log(`[Cover API] Response URL (after redirects): ${res.url}`);
  console.log(`[Cover API] Response Content-Type: ${res.headers.get('content-type')}`);
  console.log(`[Cover API] Response Content-Length: ${res.headers.get('content-length')}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch audio from ${sourceUrl} (status: ${res.status} ${res.statusText})`);
  }

  let contentType = res.headers.get('content-type') || '';

  // Google Drive virus scan warning / HTML interstitial handler
  if (isGoogleDrive && contentType.includes('text/html')) {
    console.log('[Cover API] Google Drive served HTML page instead of raw audio stream. Inspecting for confirmation token...');
    const html = await res.text();

    const linkMatch =
      html.match(/href="([^"]*confirm=[^"]*)"/i) ||
      html.match(/action="([^"]*confirm=[^"]*)"/i) ||
      html.match(/href="(\/uc\?export=download[^"]*)"/i);

    if (linkMatch && linkMatch[1]) {
      let confirmUrl = linkMatch[1].replace(/&amp;/g, '&');
      if (confirmUrl.startsWith('/')) {
        confirmUrl = `https://drive.google.com${confirmUrl}`;
      }
      console.log(`[Cover API] Retrying fetch using confirmation download URL: ${confirmUrl}`);
      res = await fetch(confirmUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent': userAgent,
          Accept: '*/*',
        },
      });

      console.log(`[Cover API] Confirmed Response status: ${res.status} ${res.statusText}`);
      console.log(`[Cover API] Confirmed Content-Type: ${res.headers.get('content-type')}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch confirmed download stream (status: ${res.status})`);
      }
      contentType = res.headers.get('content-type') || contentType;
    } else {
      console.warn('[Cover API] Warning: Google Drive returned HTML but no confirmation link could be extracted.');
    }
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(`[Cover API] Fetched audio buffer size: ${buffer.length} bytes (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`);

  return { buffer, contentType };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get('url');

  console.log('--- [Cover API] Incoming Request ---');
  console.log(`[Cover API] Request URL: ${request.url}`);
  console.log(`[Cover API] Audio target param: ${audioUrl}`);

  if (!audioUrl) {
    console.warn('[Cover API] Error: Missing `url` query parameter.');
    return new NextResponse('Missing `url` query parameter', { status: 400 });
  }

  try {
    // 1. Resolve source (local file vs remote URL vs Google Drive)
    const { sourceUrl, isGoogleDrive, localFilePath } = resolveAudioSource(audioUrl, request.url);

    // 2. Fetch or load the audio buffer
    const { buffer, contentType } = await getAudioBuffer(sourceUrl, isGoogleDrive, localFilePath);

    // 3. Parse metadata with music-metadata parseBuffer
    console.log(`[Cover API] Parsing audio buffer with music-metadata (buffer size: ${buffer.length} bytes)...`);
    
    let metadata;
    try {
      metadata = await parseBuffer(buffer, { mimeType: contentType || 'audio/mpeg' }, { duration: false });
    } catch (parseErr) {
      console.warn('[Cover API] parseBuffer with specific mimeType failed, retrying auto-detection:', parseErr);
      metadata = await parseBuffer(buffer, undefined, { duration: false });
    }

    // Extensive debug logs for parsed metadata
    console.log('[Cover API] Metadata top-level keys:', Object.keys(metadata));
    if (metadata.format) {
      console.log('[Cover API] Audio format info:', {
        container: metadata.format.container,
        codec: metadata.format.codec,
        bitrate: metadata.format.bitrate,
        sampleRate: metadata.format.sampleRate,
        tagTypes: metadata.format.tagTypes,
      });
    }

    console.log('[Cover API] Common metadata keys:', Object.keys(metadata.common || {}));
    console.log('[Cover API] Track title:', metadata.common?.title);
    console.log('[Cover API] Track artist:', metadata.common?.artist);
    console.log('[Cover API] Track album:', metadata.common?.album);

    // Check for pictures in common.picture
    const pictures = metadata.common?.picture;
    const pictureCount = pictures?.length ?? 0;
    console.log(`[Cover API] Number of pictures in common.picture: ${pictureCount}`);

    let picture = pictures && pictures.length > 0 ? (selectCover(pictures) || pictures[0]) : undefined;

    if (pictures && pictures.length > 0) {
      pictures.forEach((pic, i) => {
        console.log(`[Cover API] Picture [${i}]: format="${pic.format}", type="${pic.type}", desc="${pic.description}", bytes=${pic.data?.length}`);
      });
    }

    // 4. Fallback search in native tags if common.picture is empty
    if (!picture && metadata.native) {
      console.log('[Cover API] common.picture empty. Searching native tags:', Object.keys(metadata.native));
      for (const [tagFamily, tags] of Object.entries(metadata.native)) {
        if (Array.isArray(tags)) {
          for (const tag of tags as Array<{ id: string; value: any }>) {
            if (
              (tag.id === 'APIC' || tag.id === 'PIC' || tag.id === 'covr') &&
              tag.value &&
              tag.value.data
            ) {
              picture = {
                format: tag.value.format || tag.value.mimeType || 'image/jpeg',
                data: tag.value.data,
                description: tag.value.description,
                type: tag.value.type,
              };
              console.log(`[Cover API] Successfully found cover in native tag "${tagFamily}.${tag.id}"! Format: ${picture.format}, Size: ${picture.data.length} bytes`);
              break;
            }
          }
        }
        if (picture) break;
      }
    }

    if (!picture || !picture.data || picture.data.length === 0) {
      console.warn(`[Cover API] No embedded cover art found in ID3 tags for: ${audioUrl}`);
      return new NextResponse('No cover art found in audio metadata', {
        status: 404,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
    }

    const imageFormat = picture.format || 'image/jpeg';
    console.log(`[Cover API] Successfully extracted cover image! Format: ${imageFormat}, Size: ${picture.data.length} bytes. Returning 200 OK.`);

    return new NextResponse(picture.data, {
      status: 200,
      headers: {
        'Content-Type': imageFormat,
        'Content-Length': picture.data.length.toString(),
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('[Cover API] Fatal error extracting cover metadata:', error);
    return new NextResponse(
      `Error extracting cover art: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}
