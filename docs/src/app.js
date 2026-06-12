(function () {
const { resume } = window.resumeData;

const app = document.querySelector("#app");
const themeToggle = document.querySelector("#themeToggle");
const body = document.body;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function list(items, className = "") {
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function chips(items) {
  return `<div class="chips">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
}

function projectDetail(label, value, className = "") {
  return `
    <div class="project-detail${className ? ` ${className}` : ""}">
      <span class="project-detail-label">${escapeHtml(label)}</span>
      <p>${escapeHtml(value)}</p>
    </div>
  `;
}

function imageFrame(src, alt, className, fallback = "图片") {
  return `
    <figure class="image-frame ${className}" data-fallback="${escapeHtml(fallback)}">
      <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.closest('.image-frame').classList.add('is-fallback'); this.remove();" />
    </figure>
  `;
}

function renderContactItems(className = "contact-list") {
  return `
    <div class="${className}">
      ${resume.contact
        .map((item) => `<span><b>${escapeHtml(item.label)}</b>${escapeHtml(item.value)}</span>`)
        .join("")}
    </div>
  `;
}

function renderHero() {
  return `
    <section id="home" class="hero-section snap-section">
      <div class="hero-portrait-wrap">
        ${imageFrame(resume.heroImage, `${resume.name} 头像占位图`, "hero-portrait", resume.name)}
      </div>
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(resume.profile)}</p>
        <h1 class="hero-title">${escapeHtml(resume.greeting)}</h1>
        <h2>${escapeHtml(resume.name)} / ${escapeHtml(resume.role)}</h2>
        <p class="hero-summary">${escapeHtml(resume.positioning)}</p>
        <div class="circle-links" aria-label="主要页面入口">
          <a class="circle-link circle-resume" href="#resume"><span>简历</span></a>
          <a class="circle-link circle-projects" href="#projects"><span>项目</span></a>
          <a class="circle-link circle-contact" href="#contact"><span>联系</span></a>
        </div>
      </div>
    </section>
  `;
}

function renderResume() {
  return `
    <section id="resume" class="resume-section snap-section">
      <div class="section-heading">
        <p class="eyebrow">简历</p>
      </div>

      <div class="summary-grid">
        <article class="profile-panel">
          <h3>个人简介</h3>
          <p>${escapeHtml(resume.positioning)}</p>
          ${list(resume.evidence, "evidence-list")}
        </article>
        <div class="metric-grid">
          ${resume.highlights
            .map((item) => `<article><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></article>`)
            .join("")}
        </div>
      </div>

      <div class="skill-matrix">
        ${resume.skills
          .map(
            (skill) => `
              <article>
                <h3>${escapeHtml(skill.title)}</h3>
                ${list(skill.items)}
              </article>
            `,
          )
          .join("")}
      </div>

      <div class="experience-list">
        <h3>工作经历</h3>
        ${resume.experience
          .map(
            (job) => `
              <article>
                <time>${escapeHtml(job.period)}</time>
                <div>
                  <h4>${escapeHtml(job.company)}</h4>
                  <strong>${escapeHtml(job.role)}</strong>
                  <p>${escapeHtml(job.content)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderProjects() {
  return `
    <section id="projects" class="projects-section snap-section">
      <div class="section-heading">
        <p class="eyebrow">项目</p>
      </div>
      <div class="project-timeline">
        ${resume.projects
          .map((project, index) => {
            const image = resume.projectImages[index % resume.projectImages.length];
            return `
              <article class="project-row">
                ${imageFrame(image, `${project.name} 项目占位图`, "project-image", "项目")}
                <div class="project-content">
                  <time>${escapeHtml(project.period)}</time>
                  <h3>${escapeHtml(project.name)}</h3>
                  <p class="project-company">${escapeHtml(project.company)}</p>
                  ${chips(project.tags)}
                  ${projectDetail("项目概述", project.overview)}
                  ${projectDetail("个人职责", project.responsibilities)}
                  ${projectDetail("项目成果", project.outcome, "project-result")}
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section id="contact" class="contact-footer snap-section">
      <div class="contact-intro">
        <p class="eyebrow">联系</p>
        <p class="footer-note">${resume.evaluation.map(escapeHtml).join(" ")}</p>
      </div>
      ${renderContactItems("footer-contact")}
    </section>
  `;
}

function renderApp() {
  app.innerHTML = `
    ${renderHero()}
    ${renderResume()}
    ${renderProjects()}
    ${renderContact()}
  `;
}

function setTheme(theme) {
  const nextTheme = theme === "black" ? "black" : "blue";
  body.dataset.theme = nextTheme;
  for (const button of themeToggle.querySelectorAll("[data-theme-value]")) {
    button.setAttribute("aria-pressed", String(button.dataset.themeValue === nextTheme));
  }
}

themeToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-theme-value]");
  if (!button) return;
  setTheme(button.dataset.themeValue);
});

renderApp();
setTheme(body.dataset.theme);
})();
