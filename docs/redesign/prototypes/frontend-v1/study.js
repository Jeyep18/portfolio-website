'use strict';

const root = document.documentElement;
const params = new URLSearchParams(location.search);
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const motionToggle = document.getElementById('motion-toggle');
const preview = document.getElementById('project-preview');
const art = document.getElementById('preview-art');
const poster = document.getElementById('project-poster');
const dialog = document.getElementById('quick-look');
const surface = dialog.querySelector('.quick-surface');
const openButton = document.getElementById('quick-open');
const closeButton = document.getElementById('quick-close');
const quickImage = document.getElementById('quick-image');
const screenCaption = document.getElementById('screen-caption');
const screenButtons = [...dialog.querySelectorAll('[data-screen]')];
const screens = {
  browse: { src: 'assets/cherit-home.jpg', alt: 'CherIt’s catalogue with school-level filters and fictional lesson packs.', caption: 'Actual catalogue interface, captured locally using fictional sample content.' },
  search: { src: 'assets/cherit-search.jpg', alt: 'CherIt’s Find a lesson dialog, with the Class and subject filter group expanded.', caption: 'The focused search dialog keeps class, subject, curriculum, and other filters within reach.' },
};

let phase = 'closed';
let selectedScreen = 'browse';
let motionOverride = ['on', 'off'].includes(params.get('motion')) ? params.get('motion') : null;
let motionOn = false;
let stageVisible = false;
let introVisible = true;
let frame = 0;
let desiredX = 0, desiredY = 0, stageX = 0, stageY = 0;
let returnFocus, returnScroll, previousOverflow;
let transferImage, transferAnimation, surfaceAnimation, screenAnimation;
let transitionId = 0;

function stopStage(reset = true) {
  cancelAnimationFrame(frame);
  frame = 0;
  if (reset) {
    desiredX = desiredY = stageX = stageY = 0;
    art.style.removeProperty('transform');
  }
}

function updateAmbient() {
  root.dataset.ambient = motionOn && introVisible && !document.hidden && phase === 'closed' ? 'on' : 'off';
}

function updateStage() {
  frame = 0;
  if (!motionOn || !stageVisible || phase !== 'closed' || document.hidden) return;
  const progress = Math.min(1, Math.max(0, (innerHeight * .94 - preview.getBoundingClientRect().top) / (innerHeight * .62)));
  stageX += (desiredX - stageX) * .23;
  stageY += (desiredY - stageY) * .23;
  const shift = (1 - progress) * 22;
  const scale = .96 + progress * .04;
  art.style.transform = `translate3d(${stageX.toFixed(2)}px,${(stageY + shift).toFixed(2)}px,0) scale(${scale.toFixed(4)})`;
  if (Math.abs(desiredX - stageX) + Math.abs(desiredY - stageY) > .1) requestStage();
}

function requestStage() {
  if (!frame && motionOn && stageVisible && phase === 'closed' && !document.hidden) frame = requestAnimationFrame(updateStage);
}

function clearTransfer() {
  transitionId += 1;
  transferAnimation?.cancel();
  surfaceAnimation?.cancel();
  transferImage?.remove();
  transferImage = transferAnimation = surfaceAnimation = undefined;
  quickImage.style.removeProperty('visibility');
}

function finishOpen() {
  clearTransfer();
  phase = 'open';
  dialog.dataset.phase = phase;
}

function finishClose() {
  clearTransfer();
  screenAnimation?.cancel();
  phase = 'closed';
  delete dialog.dataset.phase;
  if (dialog.open) dialog.close();
  showScreen('browse');
  root.style.overflow = previousOverflow;
  window.scrollTo({ top: returnScroll, behavior: 'instant' });
  returnFocus?.focus({ preventScroll: true });
  updateAmbient();
  requestStage();
}

function applyMotionPreference() {
  motionOn = motionOverride ? motionOverride === 'on' : !prefersReduced.matches;
  root.dataset.motion = motionOn ? 'on' : 'off';
  motionToggle.firstChild.textContent = motionOn ? 'Pause motion ' : 'Enable motion ';
  motionToggle.lastElementChild.textContent = motionOn ? 'Ⅱ' : '▷';
  if (!motionOn) {
    stopStage();
    screenAnimation?.cancel();
    if (phase === 'opening') finishOpen();
    if (phase === 'closing') finishClose();
  } else {
    requestStage();
  }
  updateAmbient();
}

function animateTransfer(from, to, opening) {
  const surfaceOpacity = getComputedStyle(surface).opacity;
  clearTransfer();
  const id = transitionId;
  const duration = opening ? 410 : 350;
  const easing = opening ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.65,0,.35,1)';
  // Move a presentation-only copy. The document and dialog layouts stay fixed.
  const image = document.createElement('div');
  image.className = 'transition-image';
  image.setAttribute('aria-hidden', 'true');
  image.style.width = `${to.width}px`;
  image.style.height = `${to.height}px`;
  const browse = document.createElement('img');
  browse.src = poster.src;
  browse.alt = '';
  image.append(browse);
  if (!opening && selectedScreen === 'search') {
    const search = document.createElement('img');
    search.src = quickImage.src;
    search.alt = '';
    image.append(search);
    search.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing, fill: 'forwards' });
  }
  const position = rect => `translate3d(${rect.left}px,${rect.top}px,0) scale(${rect.width / to.width},${rect.height / to.height})`;
  quickImage.style.visibility = 'hidden';
  dialog.append(image);
  transferImage = image;
  transferAnimation = image.animate([{ transform: position(from) }, { transform: position(to) }], { duration, easing, fill: 'both' });
  surfaceAnimation = surface.animate(opening ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: surfaceOpacity }, { opacity: 0 }], { duration: opening ? 280 : 220, easing, fill: 'both' });
  transferAnimation.finished.then(() => {
    if (id === transitionId) (opening ? finishOpen : finishClose)();
  }).catch(() => { /* A newer transition or motion preference replaced this one. */ });
}

function hasVisibleImage(rect) {
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
}

function openQuickLook(event) {
  if (phase !== 'closed') return;
  returnScroll = scrollY;
  returnFocus = openButton;
  previousOverflow = root.style.overflow;
  const from = poster.getBoundingClientRect();
  const animate = motionOn && event.detail > 0 && typeof quickImage.animate === 'function' && hasVisibleImage(from);
  stopStage(false);
  phase = animate ? 'opening' : 'open';
  dialog.dataset.phase = phase;
  root.style.overflow = 'hidden';
  dialog.showModal();
  surface.scrollTop = 0;
  closeButton.focus({ preventScroll: true });
  updateAmbient();
  if (animate) animateTransfer(from, quickImage.getBoundingClientRect(), true);
}

function closeQuickLook(animate) {
  if (phase === 'closed') return;
  if (phase === 'closing' || !animate || !motionOn || typeof quickImage.animate !== 'function') return finishClose();
  const from = (transferImage ?? quickImage).getBoundingClientRect();
  const to = poster.getBoundingClientRect();
  if (!hasVisibleImage(from) || !hasVisibleImage(to)) return finishClose();
  phase = 'closing';
  dialog.dataset.phase = phase;
  animateTransfer(from, to, false);
}

function showScreen(name) {
  const next = screens[name];
  selectedScreen = name;
  for (const item of screenButtons) item.setAttribute('aria-pressed', String(item.dataset.screen === name));
  quickImage.src = next.src;
  quickImage.alt = next.alt;
  screenCaption.textContent = next.caption;
}

function chooseScreen(button, animate) {
  const name = button.dataset.screen;
  if (phase === 'opening') finishOpen();
  if (phase !== 'open' || selectedScreen === name) return;
  showScreen(name);
  screenAnimation?.cancel();
  if (motionOn && animate && typeof quickImage.animate === 'function') {
    screenAnimation = quickImage.animate([{ opacity: .55 }, { opacity: 1 }], { duration: 160, easing: 'ease-out' });
  }
}

motionToggle.hidden = false;
motionToggle.addEventListener('click', () => {
  motionOverride = motionOn ? 'off' : 'on';
  delete root.dataset.intro;
  applyMotionPreference();
});
prefersReduced.addEventListener('change', applyMotionPreference);
applyMotionPreference();
if (motionOn && !location.hash) {
  try {
    if (!sessionStorage.getItem('frontend-study-intro')) {
      root.dataset.intro = 'play';
      sessionStorage.setItem('frontend-study-intro', '1');
    }
  } catch { /* The content is readable with storage disabled. */ }
}

if ('IntersectionObserver' in window) {
  const stageObserver = new IntersectionObserver(([entry]) => {
    stageVisible = entry.isIntersecting;
    if (stageVisible) requestStage();
    else stopStage(phase === 'closed');
  });
  stageObserver.observe(preview);
  new IntersectionObserver(([entry]) => {
    introVisible = entry.isIntersecting;
    updateAmbient();
  }).observe(document.querySelector('.intro'));
}
window.addEventListener('scroll', requestStage, { passive: true });
window.addEventListener('resize', () => {
  if (phase === 'opening') finishOpen();
  if (phase === 'closing') finishClose();
  requestStage();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopStage(false);
  else requestStage();
  updateAmbient();
});
preview.addEventListener('pointermove', event => {
  if (!motionOn || !finePointer.matches || event.pointerType !== 'mouse' || phase !== 'closed') return;
  const rect = preview.getBoundingClientRect();
  desiredX = ((event.clientX - rect.left) / rect.width - .5) * 16;
  desiredY = ((event.clientY - rect.top) / rect.height - .5) * 12;
  requestStage();
});
preview.addEventListener('pointerleave', () => {
  desiredX = desiredY = 0;
  requestStage();
});

if (typeof dialog.showModal === 'function') {
  openButton.hidden = false;
  document.querySelector('.case-fallback').hidden = true;
  openButton.addEventListener('click', openQuickLook);
  closeButton.addEventListener('click', event => closeQuickLook(event.detail > 0));
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeQuickLook(false); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeQuickLook(event.detail > 0);
  });
  for (const button of screenButtons) button.addEventListener('click', event => chooseScreen(button, event.detail > 0));
  const searchImage = new Image();
  searchImage.src = screens.search.src;
}
