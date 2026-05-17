/* =========================================
   麺処 かしわ庵 — script.js
   ========================================= */

'use strict';

// ============ ハンバーガーメニュー ============
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  // モバイルナビのリンクをクリックしたら閉じる
  mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-label', 'メニューを開く');
    });
  });
}

// ============ ヘッダー スクロール影 ============
const siteHeader = document.querySelector('.site-header');

function handleHeaderScroll() {
  if (window.scrollY > 10) {
    siteHeader?.classList.add('scrolled');
  } else {
    siteHeader?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll();

// ============ スクロールトップボタン ============
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleScrollTop, { passive: true });
handleScrollTop();

// ============ フェードインアニメーション ============
const fadeEls = document.querySelectorAll(
  '.rec-card, .feature-card, .gallery-item, .access-item, .info-row'
);

// IntersectionObserverで要素を監視
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ============ 営業時間ステータス ============
function checkOpenStatus() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.getElementById('statusText');

  if (!statusDot || !statusText) return;

  const now = new Date();
  const day = now.getDay(); // 0=日, 1=月, ..., 2=火, ..., 6=土
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeNum = hour * 100 + minute;

  // 火曜日（定休日）
  if (day === 2) {
    statusDot.classList.remove('open', 'break');
    statusDot.classList.add('closed');
    statusText.textContent = '本日は定休日です';
    return;
  }

  // ランチ：11:00〜15:00
  const isLunch = timeNum >= 1100 && timeNum < 1500;
  // ディナー：18:00〜21:00
  const isDinner = timeNum >= 1800 && timeNum < 2100;
  // ランチ前
  const isBeforeLunch = timeNum < 1100;
  // 休憩中
  const isBreak = timeNum >= 1500 && timeNum < 1800;
  // 閉店後
  const isAfterDinner = timeNum >= 2100;

  if (isLunch || isDinner) {
    statusDot.classList.remove('closed', 'break');
    statusDot.classList.add('open');
    statusText.textContent = isLunch ? '営業中（ランチ）' : '営業中（ディナー）';
  } else if (isBreak) {
    statusDot.classList.remove('open', 'closed');
    statusDot.classList.add('break');
    statusText.textContent = '準備中（18:00〜）';
  } else if (isBeforeLunch) {
    statusDot.classList.remove('open', 'break');
    statusDot.classList.add('closed');
    statusText.textContent = '準備中（11:00〜）';
  } else {
    statusDot.classList.remove('open', 'break');
    statusDot.classList.add('closed');
    statusText.textContent = '本日の営業は終了しました';
  }
}

checkOpenStatus();
// 1分ごとに更新
setInterval(checkOpenStatus, 60000);

// ============ スムーズスクロール（href="#..."） ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerH = siteHeader ? siteHeader.offsetHeight : 64;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH - 8;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

// ============ ギャラリー：タップで拡大プレビュー ============
const galleryItems = document.querySelectorAll('.gallery-item');

// シンプルなオーバーレイを作成
const overlay = document.createElement('div');
overlay.style.cssText = `
  position: fixed; inset: 0; z-index: 999;
  background: rgba(0,0,0,0.88);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
  cursor: zoom-out; padding: 20px;
`;

const overlayImg = document.createElement('img');
overlayImg.style.cssText = `
  max-width: 92vw; max-height: 85vh;
  object-fit: contain; border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  transform: scale(0.92); transition: transform 0.3s ease;
`;

overlay.appendChild(overlayImg);
document.body.appendChild(overlay);

function openOverlay(src, alt) {
  overlayImg.src = src;
  overlayImg.alt = alt || '';
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';
  overlayImg.style.transform = 'scale(1)';
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  overlayImg.style.transform = 'scale(0.92)';
  document.body.style.overflow = '';
}

galleryItems.forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  item.style.cursor = 'zoom-in';
  item.addEventListener('click', () => {
    if (!item.classList.contains('no-img') && img.complete && img.naturalWidth > 0) {
      openOverlay(img.src, img.alt);
    }
  });
});

overlay.addEventListener('click', closeOverlay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});
