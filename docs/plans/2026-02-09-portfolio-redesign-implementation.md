# Portfolio Redesign Implementation Plan

**Goal:** Redesign josiahkerrick.com from outdated 2022 "recent grad" site to modern 2026 senior engineer portfolio with vertical timeline, bento grid projects, and skills tag cloud.

**Architecture:** Single-page HTML/CSS/JS site using Bootstrap foundation. Add new CSS modules for timeline, bento grid, tags, and modal. Use Intersection Observer for scroll animations. Lazy load video. YouTube embed for full demo.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Bootstrap 5, Vanilla JS, Google Fonts (Press Start 2P + IBM Plex Mono)

---

## Task 1: Typography Update

**Files:**
- Modify: `css/style.css:1-16`

**Step 1: Update font imports**

Replace the existing font import section:

```css
@import url(./fonts.css);
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=IBM+Plex+Mono:wght@400;500;600&display=swap");

:root {
  /* Font Families */
  --font-display: 'Press Start 2P', cursive;
  --font-body: 'IBM Plex Mono', monospace;
  
  /* Core Palette */
  --bg-primary: #2a2b3b;
  --bg-secondary: #1e1f2e;
  --bg-elevated: #353648;
  
  /* Accent Colors */
  --accent-pink: #ff6288;
  --accent-cyan: #79dce8;
  --accent-yellow: #ffc007;
  --accent-orange: #fc9966;
  --accent-green: #a8dc76;
  
  /* Skill Tag Colors */
  --tag-languages: #79dce8;
  --tag-frameworks: #ff6288;
  --tag-infrastructure: #a8dc76;
  --tag-tools: #fc9966;
  
  /* Text Colors */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
  
  /* Effects */
  --glow-pink: 0 0 20px rgba(255, 98, 136, 0.4);
  --glow-cyan: 0 0 20px rgba(121, 220, 232, 0.4);
  --shadow-lift: 0 8px 32px rgba(0, 0, 0, 0.4);
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}

body {
  background-color: var(--bg-primary);
  font-family: var(--font-display);
}

/* Body text uses IBM Plex Mono */
p, li, span, .body-text {
  font-family: var(--font-body);
}
```

**Step 2: Verify change**

Open `index.html` in browser and confirm:
- Headers still use Press Start 2P (pixel font)
- Body text uses IBM Plex Mono (readable monospace)
- CSS variables are available in dev tools

**Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add IBM Plex Mono font and CSS custom properties"
```

---

## Task 2: Create Timeline CSS

**Files:**
- Create: `css/timeline.css`

**Step 1: Create the timeline stylesheet**

Create `css/timeline.css`:

```css
/* ===========================================
   EXPERIENCE TIMELINE
   =========================================== */

.experience-section {
  padding: var(--space-16) var(--space-6);
  max-width: 900px;
  margin: 0 auto;
}

.experience-title {
  font-family: var(--font-display);
  font-size: 1.953rem;
  color: var(--accent-pink);
  text-align: center;
  margin-bottom: var(--space-12);
  letter-spacing: 3px;
}

/* Timeline Container */
.experience-timeline {
  position: relative;
  padding-left: var(--space-16);
}

/* Vertical Timeline Line */
.experience-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    var(--accent-cyan) 0%,
    var(--accent-cyan) 90%,
    transparent 100%
  );
  border-radius: 3px;
}

/* Timeline Entry */
.timeline-entry {
  position: relative;
  margin-bottom: var(--space-10);
  padding: var(--space-6);
  background: var(--bg-elevated);
  border-radius: 12px;
  border-left: 4px solid var(--accent-cyan);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-entry:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-lift);
}

/* Timeline Node (circle) */
.timeline-entry::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-16) - 2px);
  top: var(--space-6);
  width: 16px;
  height: 16px;
  background: var(--accent-pink);
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  box-shadow: var(--glow-pink);
  z-index: 2;
}

/* First entry: larger node */
.timeline-entry:first-child::before {
  width: 20px;
  height: 20px;
  left: calc(-1 * var(--space-16) - 4px);
}

/* Company Header */
.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(121, 220, 232, 0.3);
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.company-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--accent-pink);
  letter-spacing: 2px;
  margin: 0;
}

.company-location {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.date-range {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--accent-yellow);
  white-space: nowrap;
}

/* Nested Role Entry (for promotions) */
.role-entry {
  background: rgba(42, 43, 59, 0.8);
  border-radius: 8px;
  padding: var(--space-4);
  margin-top: var(--space-4);
  border: 1px solid rgba(121, 220, 232, 0.2);
}

.role-entry:first-of-type {
  margin-top: 0;
}

/* Promoted Badge */
.promoted-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: 0.64rem;
  color: var(--accent-green);
  background: rgba(168, 220, 118, 0.15);
  padding: var(--space-1) var(--space-3);
  border-radius: 4px;
  margin-bottom: var(--space-2);
  letter-spacing: 1px;
}

/* Role Title */
.role-title {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-1) 0;
}

/* Role Dates */
.role-dates {
  font-family: var(--font-body);
  font-size: 0.64rem;
  color: var(--accent-yellow);
  margin-bottom: var(--space-3);
}

/* Role Description */
.role-description {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin: 0;
  padding: 0;
  list-style: none;
}

.role-description li {
  margin-bottom: var(--space-2);
  padding-left: var(--space-4);
  position: relative;
}

.role-description li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-cyan);
}

/* Tech Tags Container */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

/* Scroll Animation States */
.timeline-entry {
  opacity: 0;
  transform: translateY(30px);
}

.timeline-entry.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Staggered delays */
.timeline-entry:nth-child(1).visible { transition-delay: 0ms; }
.timeline-entry:nth-child(2).visible { transition-delay: 150ms; }
.timeline-entry:nth-child(3).visible { transition-delay: 300ms; }
.timeline-entry:nth-child(4).visible { transition-delay: 450ms; }
.timeline-entry:nth-child(5).visible { transition-delay: 600ms; }

/* Responsive: Mobile */
@media (max-width: 639px) {
  .experience-timeline {
    padding-left: var(--space-10);
  }
  
  .experience-timeline::before {
    left: 12px;
    width: 2px;
  }
  
  .timeline-entry::before {
    left: calc(-1 * var(--space-10) - 2px);
    width: 12px;
    height: 12px;
  }
  
  .timeline-entry:first-child::before {
    width: 14px;
    height: 14px;
    left: calc(-1 * var(--space-10) - 3px);
  }
  
  .timeline-entry {
    padding: var(--space-4);
  }
  
  .company-name {
    font-size: 0.8rem;
  }
  
  .timeline-header {
    flex-direction: column;
  }
}
```

**Step 2: Link stylesheet in index.html**

Add to `<head>` section after style.css:

```html
<link rel="stylesheet" href="css/timeline.css" />
```

**Step 3: Verify**

Open browser, confirm no CSS errors in console.

**Step 4: Commit**

```bash
git add css/timeline.css index.html
git commit -m "feat: add experience timeline CSS with vertical line and nodes"
```

---

## Task 3: Build Timeline HTML Structure

**Files:**
- Modify: `index.html` (replace experience section lines ~145-203)

**Step 1: Replace experience section HTML**

Replace the entire `brand-area` section with:

```html
<!-- ========================== EXPERIENCE AREA ========================== -->
<section class="experience-section" id="history">
  <h2 class="experience-title">EXPERIENCE</h2>
  
  <div class="experience-timeline">
    
    <!-- VISA (Nested - Promotion) -->
    <article class="timeline-entry">
      <header class="timeline-header">
        <div class="company-info">
          <h3 class="company-name">VISA</h3>
          <span class="company-location">Foster City, CA</span>
        </div>
        <span class="date-range">Jan 2023 – Present</span>
      </header>
      
      <!-- Senior Role (Current) -->
      <div class="role-entry">
        <span class="promoted-badge">↑ PROMOTED</span>
        <h4 class="role-title">Senior Software Test Engineer</h4>
        <span class="role-dates">January 2025 – Present</span>
        <ul class="role-description">
          <li>Engineer on Visa's next-generation global authorization platform handling hundreds of billions of transactions per year</li>
          <li>Designed low-latency, high-throughput microservices using Go, Kafka, Cassandra with strong emphasis on fault tolerance</li>
          <li>Owned critical authorization workflows for Nigeria's payment ecosystem, scaling toward 6–22B transactions annually</li>
          <li>Debugged production issues across network, service, and data layers with incident turnaround under 36 hours</li>
        </ul>
        <div class="tech-tags">
          <span class="skill-tag language">Go</span>
          <span class="skill-tag infra">Kafka</span>
          <span class="skill-tag infra">Cassandra</span>
          <span class="skill-tag language">MySQL</span>
          <span class="skill-tag infra">Docker</span>
          <span class="skill-tag infra">Kubernetes</span>
        </div>
      </div>
      
      <!-- Previous Role -->
      <div class="role-entry">
        <h4 class="role-title">Software Test Engineer</h4>
        <span class="role-dates">January 2023 – January 2025</span>
        <ul class="role-description">
          <li>Built Selenium-based automation framework with Jenkins CI/CD, increasing test coverage 6x</li>
          <li>Reduced release sign-off time from 1 month to 1 week</li>
          <li>Developed and validated high-volume data pipelines processing up to 100GB/day</li>
          <li>Led integration testing for real-time and batch systems ensuring backward compatibility</li>
        </ul>
        <div class="tech-tags">
          <span class="skill-tag language">Python</span>
          <span class="skill-tag tool">Selenium</span>
          <span class="skill-tag tool">Jenkins</span>
          <span class="skill-tag infra">Kafka</span>
        </div>
      </div>
    </article>
    
    <!-- Freelance Web Development -->
    <article class="timeline-entry">
      <header class="timeline-header">
        <div class="company-info">
          <h3 class="company-name">FREELANCE</h3>
          <span class="company-location">San Luis Obispo, CA</span>
        </div>
        <span class="date-range">May 2022 – Dec 2023</span>
      </header>
      
      <div class="role-entry">
        <h4 class="role-title">Full-Stack Developer</h4>
        <span class="role-dates">Web Developer for Bob and Beth Whitworth</span>
        <ul class="role-description">
          <li>Managed frontend and backend operations for 3 WordPress websites promoting "Through My Eyes" book</li>
          <li>Migrated websites from outdated server using FTP and data backups</li>
          <li>Updated PHP and plugins, troubleshot compatibility errors with legacy software</li>
          <li>Designed new frontend layouts for 8+ year old websites</li>
        </ul>
        <div class="tech-tags">
          <span class="skill-tag framework">WordPress</span>
          <span class="skill-tag language">PHP</span>
          <span class="skill-tag language">MySQL</span>
          <span class="skill-tag tool">FTP</span>
        </div>
      </div>
    </article>
    
    <!-- Cal Poly IT -->
    <article class="timeline-entry">
      <header class="timeline-header">
        <div class="company-info">
          <h3 class="company-name">CAL POLY IT</h3>
          <span class="company-location">San Luis Obispo, CA</span>
        </div>
        <span class="date-range">2021 – 2022</span>
      </header>
      
      <div class="role-entry">
        <h4 class="role-title">IT Support Technician</h4>
        <ul class="role-description">
          <li>Provided technical support for campus network and systems</li>
          <li>Troubleshot hardware and software issues for students and faculty</li>
        </ul>
        <div class="tech-tags">
          <span class="skill-tag tool">Networking</span>
          <span class="skill-tag tool">Troubleshooting</span>
        </div>
      </div>
    </article>
    
    <!-- EY Internship -->
    <article class="timeline-entry">
      <header class="timeline-header">
        <div class="company-info">
          <h3 class="company-name">EY</h3>
          <span class="company-location">Los Angeles, CA</span>
        </div>
        <span class="date-range">Summer 2021</span>
      </header>
      
      <div class="role-entry">
        <h4 class="role-title">Technology Consulting Intern</h4>
        <ul class="role-description">
          <li>Participated in client engagements for technology transformation projects</li>
          <li>Collaborated with cross-functional teams on deliverables</li>
        </ul>
        <div class="tech-tags">
          <span class="skill-tag tool">Consulting</span>
          <span class="skill-tag tool">Agile</span>
        </div>
      </div>
    </article>
    
    <!-- Cal Poly Education -->
    <article class="timeline-entry">
      <header class="timeline-header">
        <div class="company-info">
          <h3 class="company-name">CAL POLY SLO</h3>
          <span class="company-location">San Luis Obispo, CA</span>
        </div>
        <span class="date-range">2018 – 2022</span>
      </header>
      
      <div class="role-entry">
        <h4 class="role-title">B.S. Computer Science</h4>
        <span class="role-dates">Concentration: Software Engineering</span>
        <ul class="role-description">
          <li>AWS Certified Solutions Architect – Associate</li>
          <li>Relevant coursework: Data Structures, Algorithms, Databases, Software Engineering</li>
          <li>Active member: Delta Chi Fraternity, National Society of Black Engineers</li>
        </ul>
        <div class="tech-tags">
          <span class="skill-tag infra">AWS</span>
          <span class="skill-tag language">Java</span>
          <span class="skill-tag language">Python</span>
          <span class="skill-tag language">C++</span>
        </div>
      </div>
    </article>
    
  </div>
</section>
<!-- ========================== EXPERIENCE AREA ========================== -->
```

**Step 2: Verify**

Open in browser:
- Vertical cyan line on left
- Pink nodes at each entry
- Visa shows nested promotion with badge
- Tech tags display with colors

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add experience timeline HTML with Visa promotion nesting"
```

---

## Task 4: Create Bento Grid CSS

**Files:**
- Create: `css/bento-grid.css`

**Step 1: Create the bento grid stylesheet**

Create `css/bento-grid.css`:

```css
/* ===========================================
   PROJECTS BENTO GRID
   =========================================== */

.projects-section {
  padding: var(--space-16) var(--space-6);
}

.projects-title {
  font-family: var(--font-display);
  font-size: 1.953rem;
  color: var(--accent-cyan);
  text-align: center;
  margin-bottom: var(--space-12);
  letter-spacing: 3px;
}

/* Bento Grid Container */
.projects-bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: var(--space-5);
  max-width: 1200px;
  margin: 0 auto;
}

/* Card Base Styles */
.bento-card {
  background: var(--bg-elevated);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;
}

.bento-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    var(--shadow-lift),
    0 0 40px rgba(121, 220, 232, 0.15);
}

/* Featured Card (Remy - 2×2) */
.bento-card--featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Medium Card (2×1) */
.bento-card--medium {
  grid-column: span 2;
  grid-row: span 1;
}

/* Small Card (1×1) */
.bento-card--small {
  grid-column: span 1;
  grid-row: span 1;
}

/* Card Image/Thumbnail */
.card-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.bento-card:hover .card-thumbnail {
  transform: scale(1.05);
}

/* Video Preview Container */
.video-preview {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  overflow: hidden;
}

.video-preview video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bento-card:hover .video-preview video {
  opacity: 1;
}

.bento-card:hover .video-preview .card-thumbnail {
  opacity: 0;
}

/* Play Button Overlay */
.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  background: rgba(255, 98, 136, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 
    transform 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 5;
}

.play-button::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  margin-left: 4px;
}

.bento-card:hover .play-button {
  transform: translate(-50%, -50%) scale(1.15);
  background: var(--accent-pink);
  box-shadow: var(--glow-pink);
}

/* Featured Badge */
.featured-badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  font-family: var(--font-display);
  font-size: 0.64rem;
  color: var(--bg-primary);
  background: var(--accent-yellow);
  padding: var(--space-1) var(--space-3);
  border-radius: 4px;
  letter-spacing: 1px;
  z-index: 3;
}

/* Card Content Overlay */
.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-5);
  background: linear-gradient(
    transparent 0%,
    rgba(30, 31, 46, 0.9) 30%,
    rgba(30, 31, 46, 0.98) 100%
  );
}

/* Project Title */
.project-title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: var(--accent-pink);
  margin: 0 0 var(--space-2) 0;
  letter-spacing: 1px;
}

.bento-card--featured .project-title {
  font-size: 1rem;
}

/* Project Description */
.project-description {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 var(--space-3) 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bento-card--featured .project-description {
  -webkit-line-clamp: 3;
}

/* Project Tech Stack */
.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Scroll Animation */
.bento-card {
  opacity: 0;
  transform: translateY(30px);
}

.bento-card.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.bento-card:nth-child(1).visible { transition-delay: 0ms; }
.bento-card:nth-child(2).visible { transition-delay: 100ms; }
.bento-card:nth-child(3).visible { transition-delay: 200ms; }
.bento-card:nth-child(4).visible { transition-delay: 300ms; }
.bento-card:nth-child(5).visible { transition-delay: 400ms; }

/* Responsive: Mobile */
@media (max-width: 639px) {
  .projects-bento {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  
  .bento-card--featured,
  .bento-card--medium,
  .bento-card--small {
    grid-column: span 1;
    grid-row: span 1;
    min-height: 280px;
  }
  
  .bento-card--featured {
    min-height: 400px;
  }
  
  .play-button {
    width: 56px;
    height: 56px;
  }
  
  .play-button::after {
    border-left-width: 16px;
    border-top-width: 10px;
    border-bottom-width: 10px;
  }
}

/* Responsive: Tablet */
@media (min-width: 640px) and (max-width: 1023px) {
  .projects-bento {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
  }
  
  .bento-card--featured {
    grid-column: span 2;
    grid-row: span 2;
  }
  
  .bento-card--medium {
    grid-column: span 2;
    grid-row: span 1;
  }
}
```

**Step 2: Link stylesheet**

Add to `<head>` in index.html:

```html
<link rel="stylesheet" href="css/bento-grid.css" />
```

**Step 3: Commit**

```bash
git add css/bento-grid.css index.html
git commit -m "feat: add bento grid CSS for projects section"
```

---

## Task 5: Build Projects Bento Grid HTML

**Files:**
- Modify: `index.html` (replace projects section lines ~269-352)

**Step 1: Replace projects section HTML**

Replace the entire `project-area` section with:

```html
<!-- ========================== PROJECTS AREA ========================== -->
<section class="projects-section" id="projects">
  <h2 class="projects-title">PROJECTS</h2>
  
  <div class="projects-bento">
    
    <!-- REMY - Featured (2x2) -->
    <article class="bento-card bento-card--featured" data-project="remy">
      <span class="featured-badge">FEATURED</span>
      <div class="video-preview">
        <img 
          src="img/remy-thumbnail.jpg" 
          alt="Remy Web App" 
          class="card-thumbnail"
          loading="lazy"
        >
        <video 
          src="video/short_remy_demo.mp4" 
          muted 
          loop 
          playsinline
          preload="none"
        ></video>
        <button class="play-button" aria-label="Watch Remy demo"></button>
      </div>
      <div class="card-content">
        <h3 class="project-title">REMY WEB APP</h3>
        <p class="project-description">
          AI-powered app that extracts recipes from Instagram, TikTok, YouTube, and websites, transforming them into structured grocery lists with Instacart integration.
        </p>
        <div class="project-tech">
          <span class="skill-tag framework">Next.js</span>
          <span class="skill-tag framework">React</span>
          <span class="skill-tag language">TypeScript</span>
          <span class="skill-tag infra">Supabase</span>
          <span class="skill-tag tool">OpenAI</span>
        </div>
      </div>
    </article>
    
    <!-- Interstellar Hangover (1x1) -->
    <article class="bento-card bento-card--small">
      <a href="https://play.unity.com/mg/other/webgl-uz5" target="_blank" rel="noopener">
        <img 
          src="img/int-hang.jpg" 
          alt="Interstellar Hangover Game" 
          class="card-thumbnail"
          loading="lazy"
        >
        <div class="card-content">
          <h3 class="project-title">INTERSTELLAR HANGOVER</h3>
          <p class="project-description">3D arcade shooter with A* pathfinding AI</p>
          <div class="project-tech">
            <span class="skill-tag framework">Unity</span>
            <span class="skill-tag language">C#</span>
          </div>
        </div>
      </a>
    </article>
    
    <!-- Blockchain Voting (1x1) -->
    <article class="bento-card bento-card--small">
      <img 
        src="img/blockchain.jpg" 
        alt="Blockchain Voting Ballot" 
        class="card-thumbnail"
        loading="lazy"
      >
      <div class="card-content">
        <h3 class="project-title">BLOCKCHAIN VOTING</h3>
        <p class="project-description">Ethereum smart contract for proposals and voting</p>
        <div class="project-tech">
          <span class="skill-tag language">Solidity</span>
          <span class="skill-tag tool">MetaMask</span>
        </div>
      </div>
    </article>
    
    <!-- Guess My Number (1x1) -->
    <article class="bento-card bento-card--small">
      <a href="https://18jkerrick.github.io/GuessMyNumber/" target="_blank" rel="noopener">
        <img 
          src="img/guessmynum.jpg" 
          alt="Guess My Number Game" 
          class="card-thumbnail"
          loading="lazy"
        >
        <div class="card-content">
          <h3 class="project-title">GUESS MY NUMBER</h3>
          <div class="project-tech">
            <span class="skill-tag language">JavaScript</span>
          </div>
        </div>
      </a>
    </article>
    
    <!-- Pig Game (1x1) -->
    <article class="bento-card bento-card--small">
      <a href="https://18jkerrick.github.io/PigGame/" target="_blank" rel="noopener">
        <img 
          src="img/pig.jpg" 
          alt="Pig Game" 
          class="card-thumbnail"
          loading="lazy"
        >
        <div class="card-content">
          <h3 class="project-title">PIG GAME</h3>
          <div class="project-tech">
            <span class="skill-tag language">JavaScript</span>
          </div>
        </div>
      </a>
    </article>
    
  </div>
</section>
<!-- ========================== PROJECTS AREA ========================== -->
```

**Step 2: Create placeholder thumbnail for Remy**

You'll need to create `img/remy-thumbnail.jpg` - a screenshot from the video to use as poster. For now, you can use a placeholder or screenshot the first frame.

**Step 3: Verify**

- Remy card takes 2x2 space
- Other projects in 1x1 cards
- Hover effects work
- Grid is responsive

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add projects bento grid HTML with Remy featured"
```

---

## Task 6: Create Skills Tag Cloud CSS and HTML

**Files:**
- Create: `css/tag-cloud.css`
- Modify: `index.html` (replace skills section)

**Step 1: Create tag cloud stylesheet**

Create `css/tag-cloud.css`:

```css
/* ===========================================
   SKILLS TAG CLOUD
   =========================================== */

.skills-section {
  padding: var(--space-16) var(--space-6);
  max-width: 1000px;
  margin: 0 auto;
}

.skills-title {
  font-family: var(--font-display);
  font-size: 1.953rem;
  color: var(--accent-green);
  text-align: center;
  margin-bottom: var(--space-12);
  letter-spacing: 3px;
}

/* Category Group */
.skill-category {
  margin-bottom: var(--space-8);
}

.category-label {
  font-family: var(--font-display);
  font-size: 0.64rem;
  color: var(--text-muted);
  letter-spacing: 2px;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.category-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--text-muted) 0%,
    transparent 100%
  );
}

/* Tags Container */
.skill-tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

/* Base Tag Pill */
.skill-tag {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  padding: var(--space-2) var(--space-4);
  border-radius: 20px;
  border: 2px solid transparent;
  cursor: default;
  transition: 
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

/* Language Tags (Cyan) */
.skill-tag.language {
  background: rgba(121, 220, 232, 0.15);
  color: var(--tag-languages);
  border-color: rgba(121, 220, 232, 0.3);
}

.skill-tag.language:hover {
  border-color: var(--tag-languages);
  box-shadow: 0 0 16px rgba(121, 220, 232, 0.3);
  transform: translateY(-2px);
}

/* Framework Tags (Pink) */
.skill-tag.framework {
  background: rgba(255, 98, 136, 0.15);
  color: var(--tag-frameworks);
  border-color: rgba(255, 98, 136, 0.3);
}

.skill-tag.framework:hover {
  border-color: var(--tag-frameworks);
  box-shadow: 0 0 16px rgba(255, 98, 136, 0.3);
  transform: translateY(-2px);
}

/* Infrastructure Tags (Green) */
.skill-tag.infra {
  background: rgba(168, 220, 118, 0.15);
  color: var(--tag-infrastructure);
  border-color: rgba(168, 220, 118, 0.3);
}

.skill-tag.infra:hover {
  border-color: var(--tag-infrastructure);
  box-shadow: 0 0 16px rgba(168, 220, 118, 0.3);
  transform: translateY(-2px);
}

/* Tool Tags (Orange) */
.skill-tag.tool {
  background: rgba(252, 153, 102, 0.15);
  color: var(--tag-tools);
  border-color: rgba(252, 153, 102, 0.3);
}

.skill-tag.tool:hover {
  border-color: var(--tag-tools);
  box-shadow: 0 0 16px rgba(252, 153, 102, 0.3);
  transform: translateY(-2px);
}

/* Responsive: Mobile */
@media (max-width: 639px) {
  .skill-tag {
    font-size: 0.64rem;
    padding: var(--space-1) var(--space-3);
  }
}
```

**Step 2: Replace skills section HTML**

Replace the `skills-area` section with:

```html
<!-- ========================== SKILLS AREA ========================== -->
<section class="skills-section" id="skills">
  <h2 class="skills-title">SKILLS</h2>
  
  <!-- Languages -->
  <div class="skill-category">
    <h3 class="category-label">LANGUAGES</h3>
    <div class="skill-tags-group">
      <span class="skill-tag language">Python</span>
      <span class="skill-tag language">Java</span>
      <span class="skill-tag language">Go</span>
      <span class="skill-tag language">JavaScript</span>
      <span class="skill-tag language">TypeScript</span>
      <span class="skill-tag language">SQL</span>
      <span class="skill-tag language">C</span>
      <span class="skill-tag language">C++</span>
      <span class="skill-tag language">Ruby</span>
      <span class="skill-tag language">PHP</span>
      <span class="skill-tag language">Solidity</span>
      <span class="skill-tag language">HTML/CSS</span>
    </div>
  </div>
  
  <!-- Frameworks -->
  <div class="skill-category">
    <h3 class="category-label">FRAMEWORKS & LIBRARIES</h3>
    <div class="skill-tags-group">
      <span class="skill-tag framework">Next.js</span>
      <span class="skill-tag framework">React</span>
      <span class="skill-tag framework">Node.js</span>
      <span class="skill-tag framework">Tailwind CSS</span>
      <span class="skill-tag framework">Bootstrap</span>
      <span class="skill-tag framework">Selenium</span>
    </div>
  </div>
  
  <!-- Databases -->
  <div class="skill-category">
    <h3 class="category-label">DATABASES & STORAGE</h3>
    <div class="skill-tags-group">
      <span class="skill-tag infra">PostgreSQL</span>
      <span class="skill-tag infra">MySQL</span>
      <span class="skill-tag infra">Cassandra</span>
      <span class="skill-tag infra">DB2</span>
      <span class="skill-tag infra">Supabase</span>
    </div>
  </div>
  
  <!-- Infrastructure -->
  <div class="skill-category">
    <h3 class="category-label">INFRASTRUCTURE & DEVOPS</h3>
    <div class="skill-tags-group">
      <span class="skill-tag infra">Kubernetes</span>
      <span class="skill-tag infra">Docker</span>
      <span class="skill-tag infra">Kafka</span>
      <span class="skill-tag infra">AWS</span>
      <span class="skill-tag infra">Jenkins</span>
      <span class="skill-tag infra">Git</span>
      <span class="skill-tag infra">Unix</span>
    </div>
  </div>
  
  <!-- Tools -->
  <div class="skill-category">
    <h3 class="category-label">TOOLS & PLATFORMS</h3>
    <div class="skill-tags-group">
      <span class="skill-tag tool">OpenAI API</span>
      <span class="skill-tag tool">JIRA</span>
      <span class="skill-tag tool">WordPress</span>
      <span class="skill-tag tool">Agile/Scrum</span>
      <span class="skill-tag tool">Excel</span>
    </div>
  </div>
</section>
<!-- ========================== SKILLS AREA ========================== -->
```

**Step 3: Link stylesheet**

Add to `<head>`:

```html
<link rel="stylesheet" href="css/tag-cloud.css" />
```

**Step 4: Commit**

```bash
git add css/tag-cloud.css index.html
git commit -m "feat: add skills tag cloud with color-coded categories"
```

---

## Task 7: Add Scroll Animations JavaScript

**Files:**
- Modify: `js/main.js`

**Step 1: Add Intersection Observer code**

Add to `js/main.js`:

```javascript
// ===========================================
// SCROLL ANIMATIONS - Intersection Observer
// ===========================================

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe timeline entries
document.querySelectorAll('.timeline-entry').forEach(entry => {
  scrollObserver.observe(entry);
});

// Observe bento cards
document.querySelectorAll('.bento-card').forEach(card => {
  scrollObserver.observe(card);
});

// ===========================================
// VIDEO HOVER PREVIEW
// ===========================================

const videoCards = document.querySelectorAll('.bento-card[data-project]');

videoCards.forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play().catch(() => {}); // Ignore autoplay errors
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
  });
});

// ===========================================
// CAROUSEL SPEED UPDATE (2 seconds)
// ===========================================

// Update Bootstrap carousel interval
const carousel = document.getElementById('carouselExampleSlidesOnly');
if (carousel) {
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 2000, // 2 seconds
    ride: 'carousel'
  });
}
```

**Step 2: Verify**

- Scroll down page, timeline entries fade in
- Project cards fade in with stagger
- Carousel rotates every 2 seconds
- Video plays on hover over Remy card

**Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: add scroll animations and video hover preview"
```

---

## Task 8: Add Video Modal

**Files:**
- Create: `css/modal.css`
- Modify: `js/main.js`
- Modify: `index.html`

**Step 1: Create modal CSS**

Create `css/modal.css`:

```css
/* ===========================================
   VIDEO MODAL
   =========================================== */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 31, 46, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: 
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-container {
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  background: var(--bg-elevated);
  border-radius: 20px;
  overflow: hidden;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 
    0 24px 80px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(121, 220, 232, 0.1);
}

.modal-overlay.active .modal-container {
  transform: scale(1) translateY(0);
}

.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 48px;
  height: 48px;
  background: rgba(255, 98, 136, 0.1);
  border: 2px solid var(--accent-pink);
  border-radius: 12px;
  color: var(--accent-pink);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 
    background 0.2s ease,
    transform 0.2s ease;
  z-index: 10;
}

.modal-close:hover {
  background: var(--accent-pink);
  color: var(--bg-primary);
  transform: rotate(90deg);
}

.video-embed {
  position: relative;
  padding-top: 56.25%; /* 16:9 */
  background: #000;
}

.video-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.modal-content {
  padding: var(--space-6);
}

.modal-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--accent-pink);
  margin: 0 0 var(--space-3) 0;
  letter-spacing: 2px;
}

.modal-description {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 639px) {
  .modal-container {
    width: 100%;
    max-width: none;
    border-radius: 0;
    max-height: 100vh;
  }
  
  .modal-content {
    padding: var(--space-4);
  }
}
```

**Step 2: Add modal HTML to index.html**

Add before closing `</body>`:

```html
<!-- Video Modal -->
<div class="modal-overlay" id="video-modal">
  <div class="modal-container">
    <button class="modal-close" aria-label="Close modal">×</button>
    <div class="video-embed">
      <iframe 
        id="youtube-embed"
        src="" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
    <div class="modal-content">
      <h3 class="modal-title">REMY WEB APP</h3>
      <p class="modal-description">
        Full demo showcasing the AI-powered recipe extraction workflow. Watch how Remy transforms social media content into organized grocery lists with Instacart integration.
      </p>
    </div>
  </div>
</div>
```

**Step 3: Add modal JavaScript to main.js**

Add to `js/main.js`:

```javascript
// ===========================================
// VIDEO MODAL
// ===========================================

const modal = document.getElementById('video-modal');
const youtubeEmbed = document.getElementById('youtube-embed');
const youtubeUrl = 'https://www.youtube.com/embed/TFbu-JiR4-o';

function openModal() {
  youtubeEmbed.src = youtubeUrl + '?autoplay=1';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  youtubeEmbed.src = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Open modal on play button click
document.querySelectorAll('.play-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  });
});

// Close modal
document.querySelector('.modal-close').addEventListener('click', closeModal);

// Close on overlay click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
```

**Step 4: Link modal CSS**

Add to `<head>`:

```html
<link rel="stylesheet" href="css/modal.css" />
```

**Step 5: Verify**

- Click play button on Remy card
- Modal opens with YouTube video
- Close button works
- Click outside closes modal
- Escape key closes modal

**Step 6: Commit**

```bash
git add css/modal.css js/main.js index.html
git commit -m "feat: add video modal with YouTube embed for Remy demo"
```

---

## Task 9: Update Hero and About Content

**Files:**
- Modify: `index.html` (hero section lines ~67-117, about section lines ~120-142)

**Step 1: Update hero section**

Replace the hero section content:

```html
<!-- ========================== BANNER AREA ========================== -->
<section class="banner" id="home">
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-12 intro">
        <h3 class="text-title">Hey,</h3>
        <h1 class="text-title text-upper">I'm Jo!</h1>
        <h4 class="text-title text-upper">I am a</h4>
        <div
          id="carouselExampleSlidesOnly"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="2000">
              <h4 class="text-title">software engineer</h4>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <h4 class="text-title">builder</h4>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <h4 class="text-title">problem solver</h4>
            </div>
          </div>
        </div>
        <p class="hero-subtext">
          Building systems at scale by day, AI-powered apps by night.<br>
          Currently engineering infrastructure at Visa that handles billions of transactions annually.
        </p>
        <div class="site-buttons">
          <div class="d-flex flex-row flex-wrap gap-3">
            <a href="/pdf/CSResume.pdf" target="_blank">
              <button type="button" class="btn btn-outline-warning my-4">Resume</button>
            </a>
            <a href="/pdf/Jo-LetterofRecommendation.pdf" target="_blank">
              <button type="button" class="btn btn-outline-warning my-4">Letter of Rec</button>
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12">
        <img src="img/josiah.png" alt="a picture of Jo" class="img-fluid" />
      </div>
    </div>
  </div>
</section>
<!-- ========================== BANNER AREA ========================== -->
```

**Step 2: Update about section**

Replace the about section content:

```html
<!-- ========================== ABOUT AREA ========================== -->
<section class="about-area" id="about">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <div class="about-img">
          <img src="img/clouds.png" alt="animation of Jo in clouds">
        </div>
      </div>
      <div class="col-lg-6 col-md-12">
        <h2 class="text-upper py-5">
          <span>About</span>
          <span>Me</span>
        </h2>
        <p class="about-info">
          Senior Software Engineer at Visa with 3+ years of experience building distributed systems that process billions of transactions annually. I specialize in low-latency microservices, data pipelines handling 100GB/day, and automation that reduced release cycles from 1 month to 1 week.
        </p>
        <p class="about-info">
          When I'm not debugging production issues or mentoring engineers, I'm building AI-powered side projects. My latest is Remy — an app that transforms social media recipes into smart grocery lists using LLMs.
        </p>
        <p class="about-info">
          Outside of code, you'll find me surfing, snowboarding, playing basketball, or making music on guitar and piano.
        </p>
      </div>
    </div>
  </div>
</section>
<!-- ========================== ABOUT AREA ========================== -->
```

**Step 3: Add hero subtext CSS**

Add to `css/style.css`:

```css
/* Hero Subtext */
.hero-subtext {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-top: var(--space-4);
  max-width: 500px;
}
```

**Step 4: Verify**

- Hero shows updated messaging
- Carousel rotates: "software engineer" → "builder" → "problem solver"
- Carousel speed is 2 seconds
- About section has metrics-focused content

**Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: update hero and about with metrics-focused builder narrative"
```

---

## Task 10: Final Verification Checklist

**Step 1: Run through all features**

- [ ] Typography: Press Start 2P for headers, IBM Plex Mono for body
- [ ] Colors: CSS variables working for all accent colors
- [ ] Hero: Carousel at 2 second intervals with new text
- [ ] About: Metrics-focused content
- [ ] Experience: Vertical timeline with cyan line and pink nodes
- [ ] Experience: Visa nested entries with PROMOTED badge
- [ ] Experience: Tech tags on each entry
- [ ] Skills: Tag cloud with color-coded categories
- [ ] Projects: Bento grid with Remy 2x2 featured
- [ ] Projects: Video preview on hover
- [ ] Projects: Modal opens with YouTube embed
- [ ] Scroll animations: Fade-in on timeline and projects
- [ ] Responsive: Test at 375px, 768px, 1024px, 1440px
- [ ] Links: All project links working

**Step 2: Create Remy thumbnail**

You need to create `img/remy-thumbnail.jpg` from the video. You can:
- Screenshot the first frame of the demo
- Or create a custom thumbnail

**Step 3: Commit final state**

```bash
git add .
git commit -m "feat: complete portfolio redesign implementation"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Typography Update | `css/style.css` |
| 2 | Timeline CSS | `css/timeline.css` |
| 3 | Timeline HTML | `index.html` |
| 4 | Bento Grid CSS | `css/bento-grid.css` |
| 5 | Projects HTML | `index.html` |
| 6 | Skills Tag Cloud | `css/tag-cloud.css`, `index.html` |
| 7 | Scroll Animations | `js/main.js` |
| 8 | Video Modal | `css/modal.css`, `js/main.js`, `index.html` |
| 9 | Hero & About Content | `index.html`, `css/style.css` |
| 10 | Final Verification | Checklist |

**Video files:**
- Preview: `video/short_remy_demo.mp4` (23MB) — inline preview on hover
- Full demo: YouTube embed `https://youtu.be/TFbu-JiR4-o` — in modal
