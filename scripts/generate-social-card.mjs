import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const width = 1200;
const height = 630;
const portraitPath = new URL("../public/joaquin-ganan-profile.jpeg", import.meta.url);
const outputPath = new URL("../public/og-portfolio.png", import.meta.url);

const portrait = await sharp(await readFile(portraitPath))
  .resize(420, 540, { fit: "cover", position: "north" })
  .composite([
    {
      input: Buffer.from(`
        <svg width="420" height="540" xmlns="http://www.w3.org/2000/svg">
          <rect width="420" height="540" rx="210" ry="210" fill="white"/>
          <rect y="210" width="420" height="330" rx="24" fill="white"/>
        </svg>
      `),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const card = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f7f8f6"/>
    <rect x="0" y="0" width="18" height="630" fill="#2f5232"/>
    <rect x="18" y="0" width="7" height="630" fill="#8aca74"/>

    <g transform="translate(70 64)">
      <rect width="22" height="22" fill="#2f5232"/>
      <rect x="27" width="22" height="22" fill="#8aca74"/>
      <rect y="27" width="22" height="22" fill="#2f5232"/>
      <rect x="27" y="27" width="22" height="22" fill="#8aca74"/>
    </g>

    <text x="70" y="195" fill="#2f5232" font-family="Georgia, serif" font-size="29" letter-spacing="3">SENIOR QA ENGINEER</text>
    <text x="66" y="300" fill="#202620" font-family="Georgia, serif" font-size="88">Joaquín</text>
    <text x="66" y="388" fill="#202620" font-family="Georgia, serif" font-size="88">Gañán</text>
    <text x="70" y="458" fill="#566157" font-family="Arial, sans-serif" font-size="27">Quality strategy · APIs · E2E · Automation</text>

    <rect x="70" y="524" width="280" height="54" rx="27" fill="#2f5232"/>
    <text x="210" y="559" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="700">joaquinganan.dev</text>

    <rect x="734" y="45" width="420" height="540" rx="210" fill="#e3ebdf"/>
    <rect x="734" y="255" width="420" height="330" rx="24" fill="#e3ebdf"/>
    <rect x="710" y="124" width="8" height="390" rx="4" fill="#8aca74"/>
  </svg>
`);

await sharp(card)
  .composite([{ input: portrait, left: 734, top: 45 }])
  .png({ compressionLevel: 9 })
  .toFile(fileURLToPath(outputPath));

console.log(`Generated ${outputPath.pathname} (${width}x${height})`);
