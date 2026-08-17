import fs from "node:fs/promises";
import path from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const sourceDir = process.argv[2];
const outputFile = process.argv[3];
const pageNumbers = process.argv.slice(4).map(Number);
const columns = 4;
const thumbWidth = 320;
const labelHeight = 34;
const gap = 16;
const firstImage = await loadImage(path.join(sourceDir, `page-${String(pageNumbers[0]).padStart(2, "0")}.png`));
const thumbHeight = Math.round((firstImage.height / firstImage.width) * thumbWidth);
const rows = Math.ceil(pageNumbers.length / columns);
const canvas = createCanvas(columns * thumbWidth + (columns + 1) * gap, rows * (thumbHeight + labelHeight) + (rows + 1) * gap);
const context = canvas.getContext("2d");
context.fillStyle = "#e7e4df";
context.fillRect(0, 0, canvas.width, canvas.height);
context.font = "bold 18px sans-serif";
context.fillStyle = "#202020";

for (let index = 0; index < pageNumbers.length; index += 1) {
  const pageNumber = pageNumbers[index];
  const image = await loadImage(path.join(sourceDir, `page-${String(pageNumber).padStart(2, "0")}.png`));
  const column = index % columns;
  const row = Math.floor(index / columns);
  const x = gap + column * (thumbWidth + gap);
  const y = gap + row * (thumbHeight + labelHeight + gap);
  context.drawImage(image, x, y, thumbWidth, thumbHeight);
  context.fillText(`Page ${pageNumber}`, x, y + thumbHeight + 24);
}

await fs.writeFile(outputFile, canvas.toBuffer("image/png"));
console.log(outputFile);
