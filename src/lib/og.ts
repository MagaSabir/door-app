import "server-only";
import path from "node:path";
import { cacheLife } from "next/cache";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/jpeg";

const fromPublic = (src: string) => path.join(process.cwd(), "public", src);

const toResponse = (bytes: Uint8Array) =>
  new Response(bytes as BodyInit, {
    headers: {
      "Content-Type": ogContentType,
      // Let the CDN keep generated previews instead of rebuilding them on every request
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });

// Rendering reads files and runs sharp, so with Cache Components it must be cached:
// each preview is built once and reused until the next deploy.

async function renderCover(src: string, position: "right" | "centre") {
  "use cache";
  cacheLife("max");
  const buf = await sharp(fromPublic(src))
    .resize(ogSize.width, ogSize.height, { fit: "cover", position })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Uint8Array(buf);
}

async function renderProduct(src: string) {
  "use cache";
  cacheLife("max");
  const { width: W, height: H } = ogSize;
  const input = sharp(fromPublic(src));
  const [backdrop, front] = await Promise.all([
    input.clone().resize(W, H, { fit: "cover" }).blur(40).modulate({ brightness: 0.9 }).toBuffer(),
    input
      .clone()
      .resize({ width: W - 60, height: H - 60, fit: "inside", withoutEnlargement: true })
      .toBuffer({ resolveWithObject: true }),
  ]);
  const buf = await sharp(backdrop)
    .composite([
      {
        input: front.data,
        top: Math.round((H - front.info.height) / 2),
        left: Math.round((W - front.info.width) / 2),
      },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Uint8Array(buf);
}

/** Wide crop of a landscape photo (home / general pages) */
export async function coverOg(src: string, position: "right" | "centre" = "centre") {
  return toResponse(await renderCover(src, position));
}

/** Product photo centred on a blurred backdrop of itself (never upscaled, always fits the canvas) */
export async function productOg(src: string) {
  return toResponse(await renderProduct(src));
}
