# Portfolio Website Redesign - Design Document

**Date:** February 9, 2026  
**Website:** https://josiahkerrick.com/  
**Status:** Approved, ready for implementation

---

## Overview

Complete redesign of personal portfolio website, last updated in 2022. Goals:
- Update content to reflect 3+ years of Visa experience and Remy project
- Modernize layout while keeping the gamer/nerdy aesthetic
- Remove outdated planet timeline image
- Follow modern design principles

---

## Design Decisions

### Aesthetic Direction
**Evolved retro-gaming** — Keep the pixel font and neon palette but with polished, modern layout patterns and better whitespace.

### Typography
- **Headers (h1-h3):** Press Start 2P (pixel font, gamer aesthetic)
- **Body text:** IBM Plex Mono (readable, techy, professional)
- **Sizing:** Larger body text than current (10px is too small)

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Dark purple | #2a2b3b |
| Primary accent | Pink | #ff6288 |
| Secondary accent | Cyan | #79dce8 |
| Tertiary | Yellow | #ffc007 |
| Body text | Orange | #fc9966 |
| Success/tech | Green | #a8dc76 |

### Skill Tag Color Coding
- Languages → Cyan
- Frameworks → Pink
- Infrastructure/DevOps → Green
- Tools → Orange

---

## Page Structure

### 1. Hero Section
- "Hey," + "I'm Jo!" in yellow (Press Start 2P)
- Carousel: "software engineer" / "builder" / "problem solver"
  - **2 second intervals** (faster than current 3s)
  - Crossfade transition
- Subtext (metrics + builder angle): "Building systems at scale by day, AI-powered apps by night. Currently engineering infrastructure at Visa that handles billions of transactions annually."
- Buttons: Resume + Letter of Rec
- Keep illustration on right side

### 2. About Section
- Metrics-focused + builder/creator narrative
- Highlight: 3+ years experience, billions of transactions, side projects
- Keep some personality (hobbies, interests)

### 3. Experience Section
**Layout:** Vertical timeline with nested entries

- Vertical line (cyan) on the left
- Timeline nodes (pink circles) for each entry
- Skill tags on each entry showing technologies used

**Visa Block (nested for promotion):**
- Company header: "Visa" with logo + "Foster City, CA" + "Jan 2023 – Present"
- "↑ PROMOTED" badge in pink
- Senior Software Test Engineer card (Jan 2025 – Present)
  - Title, description, achievements
  - Tech tags: Go, Kafka, Cassandra, MySQL, DB2, Docker, Kubernetes
- Software Test Engineer card (indented, Jan 2023 – Jan 2025)
  - Title, description, achievements
  - Tech tags: Python, Selenium, Jenkins, Kafka

**Other Entries:**
- Freelance Web Development (May 2022 – Dec 2023)
- Cal Poly IT Services
- Teaching Assistant
- EY Internship

### 4. Skills Section
**Layout:** Tag cloud / pills grouped by category

**Categories:**
- **Languages:** Python, Java, Golang, JavaScript, TypeScript, SQL, C, C++, Ruby, PHP, Solidity, HTML/CSS
- **Frameworks & Libraries:** Next.js, React, Node.js, Tailwind CSS
- **Databases & Storage:** Postgres, MySQL, Cassandra, DB2
- **Infrastructure & DevOps:** Kubernetes, Docker, Kafka, Git, Unix, Jenkins, Agile/Scrum
- **Tools & Platforms:** WordPress, JIRA, Excel, Supabase, OpenAI APIs

### 5. Projects Section
**Layout:** Bento grid with asymmetric cards

**Remy Web App (Featured - Large 2x2 card):**
- Video preview: `video/short_remy_demo.mp4` autoplays muted on hover
- "Featured" badge
- Click opens modal with:
  - YouTube embed: https://youtu.be/TFbu-JiR4-o
  - Full description
  - Tech tags: Next.js, React, TypeScript, Supabase, OpenAI API

**Interstellar Hangover (Medium card):**
- Thumbnail
- Link to Unity: https://play.unity.com/mg/other/webgl-uz5
- Tech tags: Unity, C#, A* Algorithm

**Blockchain Voting Ballot (Medium card):**
- Thumbnail
- Tech tags: Solidity, Remix IDE, MetaMask, Ganache, Ethereum

**Smaller cards:**
- Guess My Number
- Pig Game
- Calculator
- Etch-a-sketch

### 6. Contact Section
- Keep existing structure
- Email: josiahkerrick@gmail.com
- Phone: 484-881-1766
- Social: GitHub, LinkedIn, Instagram

---

## Interactions & Animations

### Hover Effects
- Timeline cards: Subtle glow + slight lift
- Project cards: Brightness boost + drop shadow
- Skill tags: Background color fill
- Buttons: Outline → filled transition

### Video Behavior
- Remy preview: Muted autoplay on hover (or scroll into view on mobile)
- Click → modal with YouTube embed + close button
- Modal has dark overlay backdrop

### Scroll Animations
- Timeline entries: Fade in + slide from left
- Project cards: Stagger fade-in
- Skills pills: Fade in with delay cascade

### Navigation
- Sticky nav at top
- Active section highlighting on scroll

---

## Content Updates

Reference `portfolio-update-guide.md` for all content details including:
- Full Visa job descriptions and achievements
- Remy Web App description
- Updated skills list
- Updated bio text

---

## Technical Notes

### Video Files
- Preview: `video/short_remy_demo.mp4` (23MB) - inline preview
- Full demo: YouTube embed (https://youtu.be/TFbu-JiR4-o) - modal playback

### Fonts (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Tech Stack
- HTML/CSS (keeping current approach)
- Bootstrap (existing)
- Vanilla JS for interactions
- No framework migration needed

---

## Implementation Priority

1. Update typography (add IBM Plex Mono)
2. Rebuild Experience section (vertical timeline with nested Visa)
3. Rebuild Projects section (bento grid with Remy featured)
4. Rebuild Skills section (tag cloud)
5. Update Hero content and carousel speed
6. Update About content
7. Add scroll animations
8. Add video modal functionality
9. Mobile responsiveness pass
10. Final polish

---

**Approved:** February 9, 2026
