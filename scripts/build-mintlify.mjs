import { cp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(root, "mintlify-docs");
const outputDir = join(root, "mintlify-site");

await rm(outputDir, { recursive: true, force: true });
await cp(sourceDir, outputDir, { recursive: true });
await cp(join(root, "img"), join(outputDir, "img"), { recursive: true });

console.log(`Mintlify files generated in ${outputDir}`);
