import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "docs");

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of ["index.html", "src", "img"]) {
  await cp(join(root, entry), join(outputDir, entry), { recursive: true });
}

await writeFile(join(outputDir, ".nojekyll"), "");

console.log(`Static files generated in ${outputDir}`);
