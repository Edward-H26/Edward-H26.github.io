import { build } from "esbuild"
import { CONTENT_ENTRY } from "./paths.mjs"

/**
 * The site content exactly as src/data/index.ts exports it.
 * @typedef {typeof import("../../src/data/index.js")} SiteContent
 */

/**
 * Bundles the TypeScript content modules with esbuild and imports the result, so the generator
 * reads the same data the React app renders.
 * @returns {Promise<SiteContent>}
 */
export async function loadContent() {
  const { outputFiles } = await build({
    entryPoints: [CONTENT_ENTRY],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent"
  })
  const code = Buffer.from(outputFiles[0].text).toString("base64")
  return import(`data:text/javascript;base64,${code}`)
}
