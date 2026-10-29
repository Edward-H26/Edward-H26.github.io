import path from "node:path"
import { fileURLToPath } from "node:url"

/** Repository root, resolved from this file so the generator works from any working directory. */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

/** The content entry that loadContent bundles. */
export const CONTENT_ENTRY = path.join(ROOT, "src/data/index.ts")

/** Vite's build output, where the route pages are written after the build. */
export const DIST_DIR = path.join(ROOT, "dist")
