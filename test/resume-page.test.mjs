import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workspaceRoot = dirname(root);

function readProjectFile(path) {
  return readFileSync(join(root, path), "utf8");
}

function readWorkspaceFile(path) {
  return readFileSync(join(workspaceRoot, path), "utf8");
}

function extractThemeVars(css, theme) {
  const block = css.match(new RegExp(`body\\[data-theme="${theme}"\\]\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.notEqual(block, null);
  return Object.fromEntries(
    [...block[1].matchAll(/--([\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
}

function extractCssRule(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.notEqual(block, null);
  return block[1];
}

test("browser scripts avoid module MIME requirements", () => {
  const html = readProjectFile("index.html");
  const appScript = readProjectFile("src/app.js");
  const dataScript = readProjectFile("src/resume-data.js");

  assert.doesNotMatch(html, /type=["']module["']/);

  const dataScriptTag = 'src="./src/resume-data.js"';
  const appScriptTag = 'src="./src/app.js"';
  const dataIndex = html.indexOf(dataScriptTag);
  const appIndex = html.indexOf(appScriptTag);

  assert.notEqual(dataIndex, -1);
  assert.notEqual(appIndex, -1);
  assert.ok(dataIndex < appIndex);
  assert.doesNotMatch(appScript, /^\s*import\s/m);
  assert.match(appScript, /^\(function \(\) \{/);
  assert.match(appScript, /\}\)\(\);\s*$/);
  assert.match(dataScript, /window\.resumeData\s*=/);
});

test("local serve command sends JavaScript with a browser-safe MIME type", () => {
  const packageJson = JSON.parse(readProjectFile("package.json"));
  const serverPath = join(root, "server.mjs");

  assert.equal(packageJson.scripts.serve, "node server.mjs");
  assert.equal(existsSync(serverPath), true);
  const server = readProjectFile("server.mjs");
  assert.match(server, /text\/javascript/);
  assert.match(server, /request\.method !== "GET" && request\.method !== "HEAD"/);
});

test("single page uses Wix-style anchor navigation instead of legacy templates", () => {
  const html = readProjectFile("index.html");
  const script = readProjectFile("src/app.js");
  const css = readProjectFile("src/styles.css");
  const data = readProjectFile("src/resume-data.js");
  const combined = html + script + css + data;

  assert.doesNotMatch(combined, /templateSwitcher|data-template|ibm-carbon|dark-systems|apple-minimal|database-board|figma-poster/);

  for (const label of ["首页", "简历", "项目", "联系"]) {
    assert.match(combined, new RegExp(`>${label}<|${label}`));
  }

  for (const id of ["home", "resume", "projects", "contact"]) {
    assert.match(combined, new RegExp(`href="#${id}"`));
    assert.match(script, new RegExp(`id="${id}"|id: "${id}"`));
  }
});

test("page exposes blue and black theme choices in one SPA", () => {
  const html = readProjectFile("index.html");
  const script = readProjectFile("src/app.js");
  const css = readProjectFile("src/styles.css");
  const combined = html + script + css;

  assert.match(html, /data-theme="black"/);
  assert.match(combined, /themeToggle/);
  assert.match(combined, /data-theme-value="blue"/);
  assert.match(combined, /data-theme-value="black"/);
  assert.match(css, /body\[data-theme="blue"\]/);
  assert.match(css, /body\[data-theme="black"\]/);
});

test("blue and black themes use distinct backgrounds, panels, and buttons", () => {
  const css = readProjectFile("src/styles.css");
  const blue = extractThemeVars(css, "blue");
  const black = extractThemeVars(css, "black");

  for (const key of ["canvas", "surface", "topbar-bg", "panel-bg", "button-primary", "button-secondary", "circle-a", "circle-c"]) {
    assert.notEqual(blue[key], black[key], `${key} should differ between themes`);
  }

  assert.match(blue.canvas, /#ffffff/i);
  assert.match(blue.surface, /#f3f7fc/i);
  assert.match(black.canvas, /#0[0-9a-f]{5}|#1[0-9a-f]{5}/i);
  assert.match(black["panel-bg"], /#0[0-9a-f]{5}|#1[0-9a-f]{5}/i);
  assert.match(css, /background:\s*var\(--topbar-bg\)/);
  assert.match(css, /background:\s*var\(--panel-bg\)/);
  assert.match(css, /background:\s*var\(--button-primary\)/);
});

test("visible interface labels are localized to Chinese", () => {
  const html = readProjectFile("index.html");
  const script = readProjectFile("src/app.js");
  const css = readProjectFile("src/styles.css");
  const data = readProjectFile("src/resume-data.js");
  const combined = html + script + css + data;

  for (const label of ["叶翔", "你好", "首页", "简历", "项目", "联系", "蓝色", "黑色", "个人简介", "工作经历"]) {
    assert.match(combined, new RegExp(label));
  }

  assert.doesNotMatch(combined, />YX<|data-fallback="YX"|content:\s*"YX"/);
  assert.doesNotMatch(combined, />Hello<|>Home<|>Resume<|>Projects<|>Contact<|>Blue<|>Black<|>Profile<|>Work Experience</);
});

test("Wix-inspired resume layout includes hero, circular CTAs, projects, and contact footer", () => {
  const script = readProjectFile("src/app.js");
  const css = readProjectFile("src/styles.css");
  const data = readProjectFile("src/resume-data.js");
  const combined = script + css + data;

  for (const token of [
    "hero-portrait",
    "hero-title",
    "circle-links",
    "resume-section",
    "project-timeline",
    "contact-footer",
  ]) {
    assert.match(combined, new RegExp(token));
  }

  assert.match(data, /heroImage/);
  assert.match(data, /projectImages/);
});

test("page uses readable UTF-8 resume content", () => {
  const data = readProjectFile("src/resume-data.js");

  for (const text of [
    "叶翔",
    "自动化开发工程师",
    "18487199921",
    "962010454@qq.com",
    "西门子 S7-1200",
    "VisionMaster",
    "CCD 视觉检测",
    "智能钥匙柜",
    "千里眼",
    "深圳三航物联科技有限责任公司",
  ]) {
    assert.match(data, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("home hero uses the local avatar image", () => {
  const data = readProjectFile("src/resume-data.js");
  const heroImage = data.match(/heroImage:\s*"([^"]+)"/)?.[1];

  assert.equal(heroImage, "./img/avator.png");
  assert.doesNotMatch(heroImage, /images\.unsplash\.com/);
});

test("build script generates deployable static files in docs", () => {
  const packageJson = JSON.parse(readProjectFile("package.json"));

  assert.equal(packageJson.scripts.build, "node scripts/build-static.mjs");

  rmSync(join(root, "docs"), { recursive: true, force: true });
  execFileSync(process.execPath, ["scripts/build-static.mjs"], { cwd: root, stdio: "pipe" });

  for (const path of [
    "docs/index.html",
    "docs/src/styles.css",
    "docs/src/resume-data.js",
    "docs/src/app.js",
    "docs/img/avator.png",
    "docs/.nojekyll",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should be generated`);
  }

  const builtHtml = readProjectFile("docs/index.html");
  assert.match(builtHtml, /<link rel="stylesheet" href="\.\/src\/styles\.css"/);
  assert.match(builtHtml, /<script src="\.\/src\/resume-data\.js"><\/script>/);
});

test("build script generates a Mintlify-compatible documentation site", () => {
  const packageJson = JSON.parse(readProjectFile("package.json"));

  assert.equal(packageJson.scripts["build:mintlify"], "node scripts/build-mintlify.mjs");

  rmSync(join(root, "mintlify-site"), { recursive: true, force: true });
  execFileSync(process.execPath, ["scripts/build-mintlify.mjs"], { cwd: root, stdio: "pipe" });

  for (const path of [
    "mintlify-site/docs.json",
    "mintlify-site/index.mdx",
    "mintlify-site/resume.mdx",
    "mintlify-site/projects.mdx",
    "mintlify-site/contact.mdx",
    "mintlify-site/style.css",
    "mintlify-site/img/avator.png",
  ]) {
    assert.equal(existsSync(join(root, path)), true, `${path} should be generated`);
  }

  const docsConfig = JSON.parse(readProjectFile("mintlify-site/docs.json"));
  assert.equal(docsConfig.name, "叶翔");
  assert.deepEqual(docsConfig.navigation.tabs[0].groups[0].pages, ["index", "resume", "projects", "contact"]);

  const homePage = readProjectFile("mintlify-site/index.mdx");
  assert.match(homePage, /title: "自动化开发工程师"/);
  assert.match(homePage, /!\[叶翔头像\]\(\/img\/avator\.png\)/);
  assert.match(homePage, /工业自动化/);
});

test("Mintlify homepage uses a 100px avatar and hides search inputs", () => {
  rmSync(join(root, "mintlify-site"), { recursive: true, force: true });
  execFileSync(process.execPath, ["scripts/build-mintlify.mjs"], { cwd: root, stdio: "pipe" });

  const homePage = readProjectFile("mintlify-site/index.mdx");
  const customCss = readProjectFile("mintlify-site/style.css");

  assert.match(homePage, /<img[\s\S]*src="\/img\/avator\.png"[\s\S]*width:\s*'100px'/);
  assert.match(homePage, /height:\s*'100px'/);
  assert.match(customCss, /#search-bar-entry/);
  assert.match(customCss, /#search-bar-entry-mobile/);
  assert.match(customCss, /chat-assistant-floating-input/);
  assert.match(customCss, /display:\s*none\s*!important/);
});

test("publish script syncs Mintlify files to the gh-pages branch root", () => {
  const packageJson = JSON.parse(readProjectFile("package.json"));
  const publishScript = readProjectFile("scripts/publish-static-branch.mjs");

  assert.equal(packageJson.scripts["publish:static"], "node scripts/publish-static-branch.mjs");
  assert.equal(packageJson.scripts["publish:mintlify"], "node scripts/publish-static-branch.mjs");
  assert.match(publishScript, /const deployBranch = "gh-pages"/);
  assert.match(publishScript, /const mintlifySiteDir = join\(root, "mintlify-site"\)/);
  assert.match(publishScript, /\["scripts\/build-mintlify\.mjs"\]/);
  assert.match(publishScript, /git\(\["worktree", "remove", "--force", worktreeDir\]/);
  assert.match(publishScript, /git\(\["rm", "-r", "-f", "--ignore-unmatch", "\."\]/);
  assert.match(publishScript, /git\(\["push", "-u", "origin", deployBranch\]/);
});

test("layout includes responsive, image fallback, and reduced-motion safeguards", () => {
  const html = readProjectFile("index.html");
  const css = readProjectFile("src/styles.css");
  const script = readProjectFile("src/app.js");

  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1"/);
  assert.match(html, /<link rel="icon" href="data:,"/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /aspect-ratio/);
  assert.match(script, /onerror=/);
  assert.match(script, /data-fallback=/);
  assert.match(css, /content:\s*attr\(data-fallback\)/);
});

test("mobile topbar keeps the theme toggle inside the viewport", () => {
  const css = readProjectFile("src/styles.css");

  assert.match(css, /grid-template-areas:\s*"brand theme"\s*"nav nav"/);
  assert.match(css, /width:\s*max-content/);
  assert.match(css, /max-width:\s*100%/);
})

test("interface has the required resume content categories", () => {
  const html = readProjectFile("index.html");
  const script = readProjectFile("src/app.js");
  const data = readProjectFile("src/resume-data.js");

  for (const key of ["profile", "contact", "skills", "projects", "experience", "evaluation"]) {
    assert.match(html + script + data, new RegExp(key));
  }

  for (const field of ["positioning", "evidence", "systemFlow", "projectBullets"]) {
    assert.match(data, new RegExp(field));
  }
});

test("local wix resume style skill documents layout and two color systems", () => {
  const skillPath = join(workspaceRoot, "skill", "wix-resume-style", "SKILL.md");
  const referencePath = join(workspaceRoot, "skill", "wix-resume-style", "references", "portfolio-cv-style.md");

  assert.equal(existsSync(skillPath), true);
  assert.equal(existsSync(referencePath), true);

  const skill = readWorkspaceFile("skill/wix-resume-style/SKILL.md");
  const reference = readWorkspaceFile("skill/wix-resume-style/references/portfolio-cv-style.md");

  assert.match(skill, /name:\s*wix-resume-style/);
  assert.match(skill, /Wix/);
  assert.match(reference, /Blue/);
  assert.match(reference, /Black/);
  assert.match(reference, /Coinbase|Meta/);
  assert.match(reference, /Vercel/);
});

test("project entries expose required section labels", () => {
  const script = readProjectFile("src/app.js");

  for (const label of ["项目概述", "个人职责", "项目成果"]) {
    assert.match(script, new RegExp(label));
  }

  assert.match(script, /project-detail-label/);
});

test("hero CTAs share one color while labels are larger and intro copy is smaller", () => {
  const css = readProjectFile("src/styles.css");

  assert.match(css, /\.circle-link\s*\{[\s\S]*?background:\s*var\(--button-primary\)/);
  assert.doesNotMatch(css, /\.circle-projects\s*\{[\s\S]*?background:\s*var\(--button-secondary\)/);
  assert.doesNotMatch(css, /\.circle-contact\s*\{[\s\S]*?background:\s*var\(--circle-c\)/);
  assert.match(css, /\.circle-link\s*\{[\s\S]*?font-size:\s*(?:20|2[1-9])px/);
  assert.match(css, /\.hero-summary\s*\{[\s\S]*?font-size:\s*16px/);
});

test("summary metrics use updated resume wording", () => {
  const data = readProjectFile("src/resume-data.js");

  assert.doesNotMatch(data, /工控机部署升级压缩/);
  assert.match(data, /系统部署交付提效/);
});

test("section labels are larger while companion headings are smaller", () => {
  const css = readProjectFile("src/styles.css");
  const script = readProjectFile("src/app.js");
  const sectionHeading = extractCssRule(css, ".section-heading");

  assert.match(sectionHeading, /grid-template-columns:\s*1fr/);
  assert.match(css, /\.section-heading \.eyebrow,\s*\.contact-footer \.eyebrow\s*\{[\s\S]*?font-size:\s*clamp\(28px,\s*4vw,\s*46px\)/);
  assert.doesNotMatch(script, /控制、视觉、上位机和数据链路的复合工程经验。/);
  assert.doesNotMatch(script, /从现场控制到可追溯数据的项目交付记录。/);
  assert.doesNotMatch(script, /期待参与能把设备、软件和数据真正串起来的工程项目。/);
});

test("contact self introduction sits below the contact heading", () => {
  const script = readProjectFile("src/app.js");

  assert.match(script, /<div class="contact-intro">\s*<p class="eyebrow">联系<\/p>\s*<p class="footer-note">\$\{resume\.evaluation\.map\(escapeHtml\)\.join\(" "\)\}<\/p>\s*<\/div>/);
});
