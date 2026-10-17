import { coverOg, ogContentType, ogSize } from "@/lib/og";
import { siteTitle } from "@/lib/site";

export const alt = siteTitle;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return coverOg("/images/hero-poster.webp", "right");
}
