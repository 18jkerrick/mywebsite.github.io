$(document).ready(function () {
  // ===========================================
  // CAROUSEL SPEED UPDATE (2 seconds)
  // ===========================================
  const carousel = document.getElementById('carouselExampleSlidesOnly');
  if (carousel) {
    // Update Bootstrap carousel interval to 2 seconds
    const carouselInstance = new bootstrap.Carousel(carousel, {
      interval: 2000,
      ride: 'carousel'
    });
  }
});

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
document.querySelectorAll('.timeline-entry.animate-in').forEach(entry => {
  scrollObserver.observe(entry);
});

// Observe bento cards
document.querySelectorAll('.bento-card.animate-in').forEach(card => {
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
// NAVBAR HIGHLIGHT FEATURE
// ===========================================
const sections = document.querySelectorAll("section");
const navs = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navs.forEach((nav) => {
    nav.classList.remove("active");
    if (nav.getAttribute("href") === `#${current}`) {
      nav.classList.add("active");
    }
  });
});

// ===========================================
// VIDEO MODAL
// ===========================================
const modal = document.getElementById('video-modal');
const youtubeEmbed = document.getElementById('youtube-embed');
const youtubeUrl = 'https://www.youtube.com/embed/TFbu-JiR4-o';

function openModal() {
  if (!modal || !youtubeEmbed) return;
  youtubeEmbed.src = youtubeUrl + '?autoplay=1';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal || !youtubeEmbed) return;
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

// Close modal on close button click
const closeBtn = document.querySelector('.modal-close');
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

// Close on overlay click (outside modal container)
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});
