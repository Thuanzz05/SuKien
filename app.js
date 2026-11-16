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
const activitiesEnglish = [
  {
    label: 'CONNECT · EXPERIENCE · TRADE',
    title: 'Tech Hub',
    description: 'A space to introduce and showcase green technology solutions and connect them with real-world needs.',
    details: ['Showcasing technology products and solutions', 'Connecting providers with partners', 'Supporting technology transactions and transfer'],
    alt: 'Technology and innovation'
  },
  {
    label: 'RESEARCH · INCUBATION · TRANSFER',
    title: 'Innovation Hub',
    description: 'Connecting science and technology, innovation, and startup initiatives.',
    details: ['Supporting science and technology activities', 'Connecting the startup ecosystem', 'Advancing technology transfer'],
    alt: 'Knowledge sharing and innovation support'
  },
  {
    label: 'ESG · SUSTAINABLE DEVELOPMENT · GREEN FINANCE',
    title: 'ESG & Green Finance',
    description: 'Building bridges for green finance transactions and initiatives that advance sustainable development.',
    details: ['Connecting partners and resources', 'Advancing ESG initiatives', 'Supporting sustainable growth'],
    alt: 'Experts and businesses discussing sustainable development'
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
const galleryEnglish = [
  { title: 'Networking forum', category: 'FORUM' },
  { title: 'Innovation community', category: 'COMMUNITY' },
  { title: 'Building a roadmap together', category: 'COLLABORATION' },
  { title: 'In discussion with experts', category: 'CONNECTION' },
  { title: 'Working toward a shared goal', category: 'PARTNERSHIP' },
  { title: 'Knowledge sharing', category: 'LEARNING' },
  { title: 'Green technology', category: 'TECHNOLOGY' },
  { title: 'ESG solutions', category: 'SUSTAINABILITY' },
  { title: 'Industrial innovation', category: 'INDUSTRY' },
  { title: 'A greener future', category: 'GREEN TECHNOLOGY' }
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const galleryCards = document.getElementById('galleryCards');
const viewGallery = document.getElementById('viewGallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentLanguage = 'vi';
let activeActivityIndex = 0;
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

function galleryText(item, key) {
  const english = galleryEnglish[gallery.indexOf(item)];
  return currentLanguage === 'en' ? english[key] : item[key];
}

function renderGallery() {
  const visible = galleryExpanded ? gallery : gallery.slice(0, 3);
  galleryCards.replaceChildren(...visible.map((item, index) => {
    const title = galleryText(item, 'title');
    const card = document.createElement('button');
    card.className = 'highlight-card reveal-item' + (index === 1 ? ' center' : '');
    card.type = 'button';
    card.dataset.galleryIndex = String(index);
    card.setAttribute('aria-label', (currentLanguage === 'en' ? 'View image: ' : 'Xem ảnh: ') + title);
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = title;
    image.loading = 'lazy';
    card.append(image);
    if (index === 1) {
      const play = document.createElement('span');
      play.className = 'highlight-play';
      play.setAttribute('aria-hidden', 'true');
      play.textContent = '↗';
      card.append(play);
    }
    const caption = document.createElement('span');
    caption.textContent = title;
    card.append(caption);
    return card;
  }));
  viewGallery.textContent = currentLanguage === 'en'
    ? (galleryExpanded ? 'Show less' : 'View all (' + gallery.length + ')')
    : (galleryExpanded ? 'Thu gọn' : 'Xem tất cả (' + gallery.length + ')');
  viewGallery.setAttribute('aria-expanded', String(galleryExpanded));
  watchRevealItems(galleryCards);
}

function updateGalleryImage() {
  const item = gallery[galleryIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = galleryText(item, 'title');
  lightboxCaption.textContent = galleryText(item, 'category') + ' · ' + galleryText(item, 'title') + ' · ' + (galleryIndex + 1) + '/' + gallery.length;
}

function openGallery(index) {
  if (!lightbox.classList.contains('open')) lastFocused = document.activeElement;
  galleryIndex = (index + gallery.length) % gallery.length;
  updateGalleryImage();
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

function setActivityContent(item) {
  const english = activitiesEnglish[activities.indexOf(item)];
  const content = currentLanguage === 'en' ? english : item;
  document.querySelector('.program-label').textContent = content.label;
  document.getElementById('programTitle').textContent = content.title;
  document.getElementById('programDescription').textContent = content.description;
  document.getElementById('programDetails').replaceChildren(...content.details.map(detail => {
    const listItem = document.createElement('li');
    listItem.textContent = detail;
    return listItem;
  }));
  const image = document.getElementById('programImage');
  image.src = item.image;
  image.alt = content.alt;
}

const programTabs = document.querySelector('.program-tabs');
const programPanel = document.querySelector('.program-panel');
const programImage = document.querySelector('.program-image');
let programSwitchTimeout;

programTabs.addEventListener('click', event => {
  const button = event.target.closest('button[data-activity]');
  if (!button) return;
  const activityIndex = Number(button.dataset.activity);
  const item = activities[activityIndex];
  if (!item) return;
  activeActivityIndex = activityIndex;

  programTabs.querySelectorAll('button').forEach(tab => {
    const selected = tab === button;
    tab.classList.toggle('selected', selected);
    tab.setAttribute('aria-selected', String(selected));
  });

  const updateContent = () => setActivityContent(item);

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
  document.getElementById('mobileNavCount').textContent = (currentLanguage === 'en' ? 'SECTION' : 'MỤC') + ' · ' + index + '/' + sections.length;
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


const englishText = {
  'Mục lục': 'Contents', 'Giới thiệu': 'Introduction', 'Tổng quan': 'Overview',
  'Mạng lưới': 'Network', 'Hoạt động': 'Activities', 'Lịch 04/12': 'Dec 4 Program',
  'Ba trụ cột': 'Three Pillars', 'Đối tác': 'Partners', 'Hình ảnh': 'Gallery',
  'GTISD · CAFE CÔNG NGHỆ XANH': 'GTISD · GREEN TECHNOLOGY CAFÉ',
  'TUẦN LỄ KHAI TRƯƠNG': 'GRAND OPENING WEEK', '01/12 – 06/12/2026': 'December 1–6, 2026',
  '08:30 – 17:00 mỗi ngày': '08:30–17:00 daily', 'Đổi mới sáng tạo.': 'Innovation.',
  'Phát triển bền vững.': 'Sustainable development.',
  'Kết nối hợp tác vì sự phát triển bền vững.': 'Connecting for sustainable development.',
  '40 P. Ngô Quyền, Cửa Nam, Hà Nội': '40 Ngo Quyen St., Cua Nam Ward, Hanoi',
  'Khám phá GTISD Hub': 'Explore GTISD Hub',
  'Không gian kết nối đa ngành, đa bên.': 'A cross-sector, multi-stakeholder space for connection.',
  'HÀ NỘI · VIỆT NAM': 'HANOI · VIETNAM', 'VỀ CHÚNG TÔI': 'ABOUT US',
  'Trung tâm Giao dịch Công nghệ Xanh, Đổi mới Sáng tạo và Phát triển Bền vững (GTISD Hub) là mô hình tổ chức uy tín, đóng vai trò kết nối đa ngành, đa bên trong hệ sinh thái phát triển bền vững. GTISD quy tụ chuyên gia, tổ chức, doanh nghiệp và nhà đầu tư, đồng hành cùng các sáng kiến công nghệ xanh và đổi mới sáng tạo.': 'The Green Technology, Innovation and Sustainable Development Hub (GTISD Hub) is a trusted organization connecting sectors and stakeholders across the sustainable development ecosystem. It brings together experts, organizations, businesses, and investors to support green technology and innovation initiatives.',
  'Trọng tâm': 'Focus', 'Công nghệ xanh': 'Green technology', 'Kết nối': 'Connection',
  'Đa ngành · Đa bên': 'Cross-sector · Multi-stakeholder', 'Định hướng': 'Vision',
  'Phát triển bền vững': 'Sustainable development', 'Địa điểm': 'Location', 'Hà Nội, Việt Nam': 'Hanoi, Vietnam',
  'Mạng lưới đa ngành, đa bên': 'A Cross-Sector, Multi-Stakeholder Network',
  'Kết nối các thành phần cùng tham gia vào hệ sinh thái phát triển bền vững.': 'Connecting people and organizations across the sustainable development ecosystem.',
  'Chuyên gia & nhà nghiên cứu': 'Experts & Researchers',
  'Đóng góp tri thức, kinh nghiệm và giải pháp cho các sáng kiến đổi mới.': 'Contributing knowledge, experience, and solutions to innovation initiatives.',
  'Tổ chức & doanh nghiệp': 'Organizations & Businesses',
  'Kết nối nhu cầu, công nghệ và cơ hội hợp tác trong các ngành.': 'Connecting needs, technologies, and opportunities for cross-industry collaboration.',
  'Nhà đầu tư & đối tác': 'Investors & Partners',
  'Liên kết nguồn lực và các bên liên quan để thúc đẩy phát triển bền vững.': 'Bringing resources and stakeholders together to advance sustainable development.',
  'CHƯƠNG TRÌNH HOẠT ĐỘNG': 'OUR PROGRAMS',
  'Công nghệ và sáng kiến vào thực tiễn': 'Turning Technology and Ideas into Action',
  'ESG & tài chính xanh': 'ESG & Green Finance', 'THỨ SÁU · 04/12/2026': 'FRIDAY · DECEMBER 4, 2026',
  'Chương trình 04/12': 'December 4 Program', 'CHƯƠNG TRÌNH DỰ KIẾN · 08:30–11:00': 'PROVISIONAL PROGRAM · 08:30–11:00',
  'Khai trương & kết nối hệ sinh thái xanh': 'Opening & Connecting the Green Ecosystem',
  'Ra mắt GTISD Hub, chia sẻ tầm nhìn phát triển, kết nối đối tác và khởi động Cộng đồng Tiêu dùng Xanh.': 'Launching GTISD Hub, sharing its development vision, connecting partners, and launching the Green Consumer Community.',
  'GTISD Hub · 40 P. Ngô Quyền, Cửa Nam, Hà Nội': 'GTISD Hub · 40 Ngo Quyen St., Cua Nam Ward, Hanoi',
  'Đón khách, ký sổ vàng, gắn thẻ lên Cây kết nối và trà chào.': 'Guest reception, signing the golden book, adding a tag to the Connection Tree, and welcome tea.',
  'Khai hương và giới thiệu GTISD Hub, dịch vụ xúc tiến, cộng đồng và kế hoạch 2027.': 'Opening ceremony and introduction to GTISD Hub, its promotion services, community, and 2027 plan.',
  'Chia sẻ từ đại diện cơ quan quản lý, ngoại giao hoặc hiệp hội.': 'Remarks from representatives of government agencies, diplomatic missions, or associations.',
  'Ký kết tham gia Cộng đồng Tiêu dùng Xanh.': 'Signing ceremony for joining the Green Consumer Community.',
  'Nghi thức rót trà kết nối, tuyên bố khai trương và chụp ảnh tập thể.': 'Connection tea ceremony, official opening announcement, and group photo.',
  'Tham quan các không gian tại Hub.': 'Tour of the Hub spaces.',
  'Trà đàm, kết nối khách mời và giới thiệu thành viên sáng lập.': 'Networking tea and introductions to the founding members.',
  'ĐỊNH HƯỚNG PHÁT TRIỂN': 'OUR DEVELOPMENT PILLARS', 'Ba trụ cột tạo tác động': 'Three Pillars for Impact',
  'Điểm đến công nghệ xanh': 'A Destination for Green Technology',
  'Xây dựng điểm đến công nghệ xanh, đổi mới sáng tạo và phát triển bền vững.': 'Building a destination for green technology, innovation, and sustainable development.',
  'Hệ sinh thái khởi nghiệp': 'A Startup Ecosystem',
  'Thúc đẩy hệ sinh thái khởi nghiệp quốc gia; hỗ trợ chuyển đổi xanh, chuyển đổi số và tăng trưởng bền vững.': 'Advancing the national startup ecosystem and supporting the green and digital transitions and sustainable growth.',
  'Đồng hành cùng Net Zero': 'Advancing Net Zero', 'Đồng hành cùng mục tiêu Net Zero quốc gia.': 'Supporting the national Net Zero goal.',
  'Mạng lưới tổ chức': 'Our Partner Network', 'ĐỐI TÁC & TỔ CHỨC KẾT NỐI': 'PARTNERS & CONNECTED ORGANIZATIONS',
  'Bộ Công Thương': 'Ministry of Industry and Trade', 'Bộ Tài nguyên & Môi trường': 'Ministry of Natural Resources and Environment',
  'Bộ Khoa học & Công nghệ': 'Ministry of Science and Technology', 'Bộ Tài chính': 'Ministry of Finance', 'Liên Hợp Quốc': 'United Nations',
  'Hình ảnh kết nối': 'A Look Inside the Hub', 'Xem tất cả (10)': 'View all (10)',
  'TRUNG TÂM GIAO DỊCH CÔNG NGHỆ XANH, ĐỔI MỚI SÁNG TẠO & PHÁT TRIỂN BỀN VỮNG': 'GREEN TECHNOLOGY, INNOVATION & SUSTAINABLE DEVELOPMENT HUB',
  'Liên hệ & đặt lịch hẹn ↗': 'Contact & Book an Appointment ↗', 'Trang GTISD chính thức ↗': 'Official GTISD website ↗'
};

const sectionEnglish = {
  'Giới thiệu': 'Introduction', 'Tổng quan': 'Overview', 'Mạng lưới': 'Network',
  'Hoạt động': 'Activities', 'Chương trình 04/12': 'Dec 4 Program', 'Ba trụ cột': 'Three Pillars',
  'Đối tác': 'Partners', 'Hình ảnh': 'Gallery'
};
const ariaEnglish = {
  'Điều hướng các section': 'Section navigation', 'GTISD Hub, đầu trang': 'GTISD Hub, home',
  'Đóng điều hướng': 'Close navigation', 'Ngôn ngữ': 'Language', 'Lên đầu trang': 'Back to top',
  'Cuộn xuống': 'Scroll down', 'Tìm hiểu về GTISD Hub': 'Learn about GTISD Hub',
  'Các hoạt động của GTISD Hub': 'GTISD Hub activities', 'Lịch trình dự kiến ngày 04/12': 'Provisional schedule for December 4',
  'Logo các tổ chức': 'Partner organization logos', 'Hình ảnh hoạt động GTISD': 'GTISD activity gallery',
  'Đóng': 'Close', 'Ảnh trước': 'Previous image', 'Ảnh tiếp theo': 'Next image'
};
const altEnglish = {
  'Cộng đồng cùng hướng tới đổi mới và phát triển bền vững': 'A community working toward innovation and sustainable development',
  'Chuyên gia và nhà nghiên cứu trao đổi': 'Experts and researchers in discussion',
  'Đại diện tổ chức cùng làm việc': 'Organization representatives working together',
  'Đối tác hợp tác': 'Collaborating partners', 'Công nghệ và đổi mới sáng tạo': 'Technology and innovation',
  'Diễn đàn kết nối tại hội trường': 'A networking forum in the conference hall',
  'Bộ Công Thương': 'Ministry of Industry and Trade', 'Bộ Tài nguyên và Môi trường': 'Ministry of Natural Resources and Environment',
  'Bộ Khoa học và Công nghệ': 'Ministry of Science and Technology', 'Bộ Tài chính': 'Ministry of Finance', 'Liên Hợp Quốc': 'United Nations'
};

const cachedTextNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (node.nodeValue.trim()) cachedTextNodes.push({ node, original: node.nodeValue });
}
const cachedAttributes = [...document.querySelectorAll('[aria-label], img[alt]')].map(element => ({
  element, aria: element.getAttribute('aria-label'), alt: element.getAttribute('alt')
}));

function setLanguage(language) {
  currentLanguage = language === 'en' ? 'en' : 'vi';
  document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === 'en' ? 'GTISD Hub — Green Technology, Innovation & Sustainable Development' : 'GTISD Hub — Green Tech, Innovation & Sustainable Development';
  document.querySelector('meta[name="description"]').content = currentLanguage === 'en'
    ? 'GTISD Hub connects green technology, innovation, and sustainable development.'
    : 'GTISD Hub kết nối công nghệ xanh, đổi mới sáng tạo và phát triển bền vững.';
  cachedTextNodes.forEach(({ node, original }) => {
    const translated = currentLanguage === 'en' ? englishText[original.trim()] : null;
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    node.nodeValue = translated ? leading + translated + trailing : original;
  });
  cachedAttributes.forEach(({ element, aria, alt }) => {
    if (aria) element.setAttribute('aria-label', currentLanguage === 'en' ? (ariaEnglish[aria] || aria) : aria);
    if (alt) element.setAttribute('alt', currentLanguage === 'en' ? (altEnglish[alt] || alt) : alt);
  });
  document.querySelectorAll('[data-language]').forEach(button => {
    const selected = button.dataset.language === currentLanguage;
    button.classList.toggle('selected', selected);
    if (selected) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  sections.forEach(section => {
    if (!('labelVi' in section.dataset)) section.dataset.labelVi = section.dataset.label || '';
    section.dataset.label = currentLanguage === 'en' ? (sectionEnglish[section.dataset.labelVi] || section.dataset.labelVi) : section.dataset.labelVi;
  });
  const activeLink = navLinks.find(link => link.classList.contains('active'));
  const activeSection = sections.find(section => section.id === activeLink?.dataset.sectionLink) || sections[0];
  if (activeSection) activateSection(activeSection);
  if (activities[activeActivityIndex]) setActivityContent(activities[activeActivityIndex]);
  renderGallery();
  if (lightbox.classList.contains('open')) updateGalleryImage();
}

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
