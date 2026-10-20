import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
const jpgPath = path.join(publicDir, 'logo.jpg')
const outPath = path.join(publicDir, 'logo.png')

if (!existsSync(jpgPath)) {
  console.log('No logo.jpg — keep existing public/logo.png as-is.')
  process.exit(0)
}

const { data, info } = await sharp(jpgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
const pixels = new Uint8Array(data)

const isDark = (i) => pixels[i] < 32 && pixels[i + 1] < 32 && pixels[i + 2] < 32

const visited = new Uint8Array(width * height)
const queue = []

for (let x = 0; x < width; x++) queue.push([x, 0], [x, height - 1])
for (let y = 0; y < height; y++) queue.push([0, y], [width - 1, y])

const idx = (x, y) => (y * width + x) * channels

while (queue.length) {
  const [x, y] = queue.pop()
  if (x < 0 || y < 0 || x >= width || y >= height) continue
  const p = y * width + x
  if (visited[p]) continue
  visited[p] = 1
  const i = idx(x, y)
  if (!isDark(i)) continue
  pixels[i + 3] = 0
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } }).png().toFile(outPath)
console.log(`Wrote transparent ${outPath}`)
