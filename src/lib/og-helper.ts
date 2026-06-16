import { siteConfig } from "@/config/site";

/**
 * Loads an image from the public folder as an ArrayBuffer.
 * In Edge runtime (production), it uses fetch() to load from the public URL.
 * In Node.js runtime (build time, dev mode), it reads directly from the filesystem.
 */
export async function getImageBuffer(
  relativePath: string
): Promise<ArrayBuffer> {
  const cleanPath = relativePath.startsWith("/")
    ? relativePath
    : `/${relativePath}`;

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime: must fetch using the absolute public site URL
    const url = `${siteConfig.url}${cleanPath}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch image in Edge runtime: ${url} (Status: ${res.status})`
      );
    }
    return await res.arrayBuffer();
  } else {
    // Node.js runtime (build-time / dev): read directly from disk to bypass missing local server
    try {
      // Indirect dynamic imports to bypass Webpack static analysis for Edge target compilation
      const fs = await Function("return import('node:fs/promises')")();
      const path = await Function("return import('node:path')")();
      const buffer = await fs.readFile(
        path.join(process.cwd(), "public", cleanPath)
      );
      return buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      );
    } catch (fsError) {
      console.warn(
        `FS read failed for public${cleanPath}, falling back to fetch:`,
        fsError
      );
      // Fallback: fetch from absolute URL
      const url = `${siteConfig.url}${cleanPath}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch image: ${url} (Status: ${res.status})`
        );
      }
      return await res.arrayBuffer();
    }
  }
}
