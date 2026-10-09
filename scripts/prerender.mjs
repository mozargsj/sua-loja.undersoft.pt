// Pré-renderiza a página para HTML estático: o Google e o primeiro paint recebem conteúdo
// real, e o React hidrata por cima. Corre depois dos dois builds (ver "build" no package.json).
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
const { app } = render()

const file = resolve('dist/index.html')
const html = await readFile(file, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('Marcador em falta no dist/index.html')

await writeFile(file, html.replace('<!--app-html-->', () => app))
await rm(resolve('dist-server'), { recursive: true, force: true })
console.log(`Pré-render concluído: ${(app.length / 1024).toFixed(1)} kB de HTML em dist/index.html`)
