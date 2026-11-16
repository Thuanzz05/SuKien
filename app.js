const activities = [
  {
    label: 'KẾT NỐI · TRẢI NGHIỆM · GIAO DỊCH',
    title: 'Tech Hub',
    description: 'Không gian giới thiệu, trưng bày và kết nối các giải pháp công nghệ xanh với nhu cầu ứng dụng.',
    details: ['Trưng bày sản phẩm, giải pháp công nghệ', 'Kết nối đơn vị cung cấp với đối tác', 'Hỗ trợ giao dịch và chuyển giao công nghệ'],
    image: 'assets/gallery/hero-tech.webp',
    alt: 'Công nghệ và đổi mới sáng tạo'
  },
  {
    label: 'KHOA HỌC · ƯƠM TẠO · CHUYỂN GIAO',
    title: 'Innovation Hub',
    description: 'Kết nối hoạt động khoa học công nghệ, đổi mới sáng tạo và các sáng kiến khởi nghiệp.',
    details: ['Hỗ trợ hoạt động khoa học và công nghệ', 'Kết nối hệ sinh thái khởi nghiệp', 'Đồng hành cùng chuyển giao công nghệ'],
    image: 'assets/gallery/training.webp',
    alt: 'Chia sẻ tri thức và hỗ trợ đổi mới sáng tạo'
  },
  {
    label: 'ESG · PHÁT TRIỂN BỀN VỮNG · TÀI CHÍNH XANH',
    title: 'ESG & tài chính xanh',
    description: 'Tạo cầu nối cho các giao dịch tài chính xanh và sáng kiến hướng tới phát triển bền vững.',
    details: ['Kết nối đối tác và nguồn lực', 'Thúc đẩy sáng kiến ESG', 'Hướng tới tăng trưởng bền vững'],
    image: 'assets/gallery/esg-consulting.webp',
    alt: 'Chuyên gia và doanh nghiệp trao đổi về phát triển bền vững'
  }
];

const gallery = [
  { src: 'assets/gallery/summit-forum.webp', title: 'Diễn đàn kết nối', category: 'DIỄN ĐÀN' },
  { src: 'assets/gallery/community.webp', title: 'Cộng đồng đổi mới sáng tạo', category: 'CỘNG ĐỒNG' },
  { src: 'assets/gallery/roadmap-workshop.webp', title: 'Cùng xây dựng lộ trình', category: 'HỢP TÁC' },
  { src: 'assets/gallery/consulting.webp', title: 'Trao đổi cùng chuyên gia', category: 'KẾT NỐI' },
  { src: 'assets/gallery/cooperation-handshake.png', title: 'Hợp tác vì mục tiêu chung', category: 'ĐỐI TÁC' },
  { src: 'assets/gallery/training.webp', title: 'Chia sẻ tri thức', category: 'ĐÀO TẠO' },
  { src: 'assets/gallery/hero-tech.webp', title: 'Công nghệ xanh', category: 'CÔNG NGHỆ' },
  { src: 'assets/gallery/esg-consulting.webp', title: 'Giải pháp ESG', category: 'PHÁT TRIỂN BỀN VỮNG' },
  { src: 'assets/gallery/industrial-facility.webp', title: 'Đổi mới trong công nghiệp', category: 'CÔNG NGHIỆP' },
  { src: 'assets/gallery/agriculture.webp', title: 'Tương lai xanh', category: 'CÔNG NGHỆ XANH' }
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const galleryCards = document.getElementById('galleryCards');
const viewGallery = document.getElementById('viewGallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let galleryExpanded = false;
let galleryIndex = 0;
let lastFocused = null;
let revealObserver;

if ('IntersectionObserver' in window && !reducedMotion) {
  revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  }), { threshold: .08, rootMargin: '0px 0px 9% 0px' });
  document.body.classList.add('motion-ready');
}

function watchRevealItems(root = document) {
  const items = [...root.querySelectorAll('.reveal-item:not(.is-visible)')];
  if (!revealObserver) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  items.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 55, 220)}ms`);
    revealObserver.observe(item);
  });
}

function renderGallery() {
  const visible = galleryExpanded ? gallery : gallery.slice(0, 3);
  galleryCards.innerHTML = visible.map((item, index) => `
    <button class="highlight-card reveal-item${index === 1 ? ' center' : ''}" type="button" data-gallery-index="${index}" aria-label="Xem ảnh: ${item.title}">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      ${index === 1 ? '<span class="highlight-play" aria-hidden="true">↗</span>' : ''}
      <span>${item.title}</span>
    </button>`).join('');
  viewGallery.textContent = galleryExpanded ? 'Thu gọn' : `Xem tất cả (${gallery.length})`;
  viewGallery.setAttribute('aria-expanded', String(galleryExpanded));
  watchRevealItems(galleryCards);
}

function openGallery(index) {
  if (!lightbox.classList.contains('open')) lastFocused = document.activeElement;
  galleryIndex = (index + gallery.length) % gallery.length;
  const item = gallery[galleryIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.title;
  lightboxCaption.textContent = `${item.category} · ${item.title} · ${galleryIndex + 1}/${gallery.length}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  document.getElementById('closeLightbox').focus();
}

function closeGallery() {
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lastFocused?.focus();
}

renderGallery();
watchRevealItems();
galleryCards.addEventListener('click', event => {
  const card = event.target.closest('[data-gallery-index]');
  if (card) openGallery(Number(card.dataset.galleryIndex));
});
viewGallery.addEventListener('click', () => {
  galleryExpanded = !galleryExpanded;
  renderGallery();
});
document.getElementById('closeLightbox').addEventListener('click', closeGallery);
document.getElementById('prevImage').addEventListener('click', () => openGallery(galleryIndex - 1));
document.getElementById('nextImage').addEventListener('click', () => openGallery(galleryIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });

const programTabs = document.querySelector('.program-tabs');
const programPanel = document.querySelector('.program-panel');
const programImage = document.querySelector('.program-image');
let programSwitchTimeout;

programTabs.addEventListener('click', event => {
  const button = event.target.closest('button[data-activity]');
  if (!button) return;
  const item = activities[Number(button.dataset.activity)];
  if (!item) return;

  programTabs.querySelectorAll('button').forEach(tab => {
    const selected = tab === button;
    tab.classList.toggle('selected', selected);
    tab.setAttribute('aria-selected', String(selected));
  });

  const updateContent = () => {
    document.querySelector('.program-label').textContent = item.label;
    document.getElementById('programTitle').textContent = item.title;
    document.getElementById('programDescription').textContent = item.description;
    document.getElementById('programDetails').innerHTML = item.details.map(detail => `<li>${detail}</li>`).join('');
    const image = document.getElementById('programImage');
    image.src = item.image;
    image.alt = item.alt;
  };

  if (reducedMotion) {
    updateContent();
    return;
  }

  clearTimeout(programSwitchTimeout);
  programPanel.classList.add('switching');
  programImage.classList.add('switching');
  programSwitchTimeout = setTimeout(() => {
    updateContent();
    programPanel.classList.remove('switching');
    programImage.classList.remove('switching');
  }, 220);
});

const sections = [...document.querySelectorAll('[data-section]')];
const navLinks = [...document.querySelectorAll('[data-section-link]')];
const rail = document.getElementById('siteRail');
function activateSection(section) {
  const theme = section.dataset.railTheme || 'light';
  rail.dataset.theme = theme;
  navLinks.forEach(link => {
    const active = link.dataset.sectionLink === section.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const index = sections.indexOf(section) + 1;
  document.getElementById('mobileNavCount').textContent = `SECTION · ${index}/${sections.length}`;
  document.getElementById('mobileNavCurrent').textContent = section.dataset.label || 'GTISD Hub';
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) activateSection(visible.target);
  }, { rootMargin: '-38% 0px -42% 0px', threshold: [0,.12,.3,.55] });
  sections.forEach(section => sectionObserver.observe(section));
} else if (sections[0]) activateSection(sections[0]);

const menuToggle = document.getElementById('mobileNavToggle');
const menuBackdrop = document.getElementById('mobileMenuBackdrop');
function setMenuOpen(open) {
  rail.classList.toggle('menu-open', open);
  document.body.classList.toggle('menu-open', open);
  menuBackdrop.classList.toggle('visible', open);
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}
menuToggle.addEventListener('click', () => setMenuOpen(!rail.classList.contains('menu-open')));
menuBackdrop.addEventListener('click', () => setMenuOpen(false));
document.getElementById('closeMobileNav')?.addEventListener('click', () => setMenuOpen(false));
navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

const backTop = document.getElementById('backTop');
const mobileBackTop = document.getElementById('mobileBackTop');
function updateBackTop() {
  const visible = window.scrollY > 400;
  backTop.classList.toggle('visible', visible);
  mobileBackTop.classList.toggle('visible', visible);
}
window.addEventListener('scroll', updateBackTop, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:reducedMotion ? 'auto' : 'smooth' }));
mobileBackTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:reducedMotion ? 'auto' : 'smooth' }));

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeGallery();
    setMenuOpen(false);
  }
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'ArrowRight') openGallery(galleryIndex + 1);
  if (event.key === 'ArrowLeft') openGallery(galleryIndex - 1);
});

/* ═══════════════════════════════════════════════════════════════
   VKAISS-STYLE EFFECTS — scroll progress, parallax, tilt,
   SVG draw, tab crossfade, marquee, background parallax
   ═══════════════════════════════════════════════════════════════ */

if (!reducedMotion) {
  /* ─── 1. SCROLL PROGRESS BAR ─── */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  /* ─── 2. HERO PARALLAX ELEMENTS ─── */
  const heroChip = document.querySelector('.hero-chip');
  const heroWafer = document.querySelector('.hero-wafer');
  const heroRibbon = document.querySelector('.hero-ribbon');
  const heroCard = document.querySelector('.hero-card');
  const heroSection = document.getElementById('top');
  const parallaxEnabled = window.matchMedia('(min-width: 851px) and (hover: hover)').matches;

  /* ─── 3. TIMELINE SVG DRAW ─── */
  const timeline = document.querySelector('.timeline');
  const milestoneCards = [...document.querySelectorAll('.milestone-card')];
  let timelineRevealed = false;

  /* ─── 4. SCROLL HANDLER (rAF-throttled) ─── */
  let scrollTicking = false;

  function onScrollEffects() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Scroll progress bar
    const scrollRange = docHeight - winHeight;
    const progress = scrollRange > 0 ? Math.max(0, Math.min(scrollY / scrollRange, 1)) : 0;
    progressBar.style.transform = `scaleX(${progress})`;

    // Hero parallax (only when hero is visible)
    if (parallaxEnabled && heroSection && scrollY < winHeight * 1.5) {
      const ratio = scrollY / winHeight;
      if (heroChip) heroChip.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (heroWafer) heroWafer.style.transform = `translateY(${scrollY * -0.1}px)`;
      if (heroRibbon) heroRibbon.style.transform = `scale(${1 + scrollY * 0.0003})`;
      if (heroCard) heroCard.style.opacity = Math.max(1 - ratio * 0.6, 0);
    }

    // Draw the connector from milestone 1 to 2, then 2 to 3.
    if (!timelineRevealed && timeline) {
      const rect = timeline.getBoundingClientRect();
      if (rect.top < winHeight * .82 && rect.bottom > 0) {
        timelineRevealed = true;
        timeline.classList.add('is-visible');
        milestoneCards.forEach(card => card.classList.add('pop-in'));
      }
    }

    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(onScrollEffects);
      scrollTicking = true;
    }
  }, { passive: true });

  // Initial call
  onScrollEffects();

  /* ─── 5. HERO CARD 3D TILT ON MOUSE ─── */
  if (heroCard) {
    heroCard.addEventListener('mousemove', e => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4; // max ±4 degrees
      const rotateY = ((x - centerX) / centerX) * 4;
      heroCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
  }

  /* ─── 7. REVEAL SCALE/LEFT/RIGHT ITEMS ─── */
  // Observe additional reveal types
  const extraRevealItems = document.querySelectorAll('.reveal-scale:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible)');
  if (revealObserver) {
    extraRevealItems.forEach(item => revealObserver.observe(item));
  }
}
