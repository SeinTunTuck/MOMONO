import fs from "node:fs/promises";
import path from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const source = "tmp/pdfs/rendered";
const output = "public/assets";
await fs.mkdir(output, { recursive: true });

async function crop(page, name, x, y, width, height, options = {}) {
  const image = await loadImage(path.join(source, `page-${String(page).padStart(2, "0")}.png`));
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.drawImage(image, x, y, width, height, 0, 0, width, height);

  if (options.transparentCream) {
    const pixels = context.getImageData(0, 0, width, height);
    for (let index = 0; index < pixels.data.length; index += 4) {
      const red = pixels.data[index];
      const green = pixels.data[index + 1];
      const blue = pixels.data[index + 2];
      const distance = Math.abs(red - 247) + Math.abs(green - 241) + Math.abs(blue - 231);
      if (distance < 28) pixels.data[index + 3] = 0;
    }
    context.putImageData(pixels, 0, 0);
  }

  await fs.writeFile(path.join(output, name), canvas.toBuffer("image/png"));
}

await fs.copyFile(path.join(source, "page-29.png"), path.join(output, "momono-world.png"));
await crop(1, "momono-logo.png", 500, 260, 1160, 560);
await crop(19, "starter-box.png", 65, 385, 935, 650);
await crop(20, "refill-five.png", 70, 315, 550, 730);
await crop(20, "refill-ten.png", 700, 315, 530, 730);
await crop(19, "school-guardian.png", 1510, 325, 188, 405);
await crop(19, "rain-guardian.png", 1735, 325, 169, 405);
await crop(19, "birthday-guardian.png", 1945, 325, 203, 405);
await crop(19, "dream-guardian.png", 1590, 715, 190, 420);
await crop(19, "secret-guardian.png", 1820, 715, 205, 420);
await crop(21, "benefit-bio.png", 185, 295, 490, 830);
await crop(21, "benefit-guardians.png", 840, 295, 520, 830);
await crop(21, "benefit-refill.png", 1525, 295, 500, 830);

console.log("Prepared MOMONO assets in public/assets.");
