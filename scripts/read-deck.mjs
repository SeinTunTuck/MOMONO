import fs from "node:fs/promises";
import path from "node:path";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";

globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;

const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
const input = process.argv[2];
const outputDir = process.argv[3] ?? "tmp/pdfs/rendered";

if (!input) {
  throw new Error("Usage: node scripts/read-deck.mjs INPUT_PDF [OUTPUT_DIR]");
}

await fs.mkdir(outputDir, { recursive: true });
const bytes = new Uint8Array(await fs.readFile(input));
const document = await pdfjs.getDocument({ data: bytes, disableWorker: true }).promise;
const textPages = [];

for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
  const page = await document.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");
  await page.render({ canvasContext: context, viewport }).promise;
  const imageName = `page-${String(pageNumber).padStart(2, "0")}.png`;
  await fs.writeFile(path.join(outputDir, imageName), canvas.toBuffer("image/png"));

  const text = await page.getTextContent();
  textPages.push(`===== PAGE ${pageNumber} =====\n${text.items.map((item) => item.str).join(" ")}`);
}

await fs.writeFile(path.join(outputDir, "momono.txt"), textPages.join("\n\n"));
console.log(`Rendered and extracted ${document.numPages} pages.`);
