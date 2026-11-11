'use strict';

(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const query = new URLSearchParams(location.search).get('motion');
  const motionButton = document.querySelector('#motion-toggle');
  let motionOverride = query === 'on' || query === 'off' ? query : null;
  const motionEnabled = () => root.dataset.motion === 'on';

  const gallery = document.querySelector('#gallery');
  const panels = [...gallery.querySelectorAll('.project-panel')];
  const picker = gallery.querySelector('.project-picker');
  const selectors = [...picker.querySelectorAll('button')];
  const announcement = document.querySelector('#gallery-announcement');
  let active = location.hash === '#bagyong' ? 1 : 0;
  let panelAnimations = [];
  let touchStart;

  function clearPanelAnimations() {
    for (const animation of panelAnimations) animation.cancel();
    panelAnimations = [];
    for (const panel of panels) delete panel.dataset.exiting;
  }

  function showProject(index, animate, announce = true) {
    const previous = panels[active];
    const current = panels[index];
    const direction = Math.sign(index - active);
    clearPanelAnimations();
    if (direction && previous.contains(document.activeElement)) {
      selectors[index].focus({ preventScroll: true });
    }
    active = index;

    panels.forEach((panel, i) => {
      const selected = i === index;
      panel.inert = !selected;
      panel.setAttribute('aria-hidden', String(!selected));
      selectors[i].setAttribute('aria-pressed', String(selected));
    });

    if (direction && animate && motionEnabled() && typeof current.animate === 'function') {
      previous.dataset.exiting = '';
      const duration = 330;
      const easing = 'cubic-bezier(.22,1,.36,1)';
      const exit = previous.animate([
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(' + (-direction * 24) + 'px)' }
      ], { duration, easing, fill: 'both' });
      const enter = current.animate([
        { opacity: .65, transform: 'translateX(' + (direction * 24) + 'px)' },
        { opacity: 1, transform: 'translateX(0)' }
      ], { duration, easing });
      panelAnimations = [exit, enter];
      exit.finished.then(() => {
        if (panelAnimations.includes(exit)) clearPanelAnimations();
      }).catch(() => { /* A new selection superseded this transition. */ });
    }

    if (announce) announcement.textContent = 'Showing ' + current.querySelector('h3').textContent;
  }

  selectors.forEach((button, index) => {
    button.addEventListener('click', event => {
      if (index !== active) showProject(index, event.detail > 0);
    });
  });

  const panelsArea = gallery.querySelector('.gallery-panels');
  panelsArea.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch' || !event.isPrimary || event.target.closest('a, button')) return;
    touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  panelsArea.addEventListener('pointerup', event => {
    if (touchStart?.id !== event.pointerId) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = undefined;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const next = active - Math.sign(dx);
    if (next >= 0 && next < panels.length) showProject(next, true);
  });
  panelsArea.addEventListener('pointercancel', () => { touchStart = undefined; });

  gallery.dataset.ready = '';
  showProject(active, false, false);
  picker.hidden = false;

  const dialog = document.querySelector('#quick-look');
  const surface = dialog.querySelector('.quick-surface');
  const quickTitle = dialog.querySelector('#quick-title');
  const closeButton = dialog.querySelector('#quick-close');
  const quickImage = dialog.querySelector('#quick-image');
  const quickStory = dialog.querySelector('#quick-story');
  const caption = dialog.querySelector('#image-caption');
  const imageButtons = [...dialog.querySelectorAll('.image-picker button')];
  const inspections = {
    cherit: {
      labels: ['Catalogue', 'Search filters'],
      captions: ['Actual catalogue with fictional sample data.', 'The Class & subject filters in the search dialog.'],
      image: 'assets/cherit-search.jpg',
      alt: 'CherIt’s search dialog with Class & subject filters expanded.'
    },
    bagyong: {
      labels: ['Normal', 'Storm-damaged'],
      captions: ['The household before the storm.', 'The same room with altered lighting, props, and storm damage.'],
      image: 'assets/bagyong-storm.webp',
      alt: 'The same Bagyong Bahay household after the storm, with a damaged interior and scattered furniture.'
    }
  };

  let inspection;
  let opener;
  let poster;
  let phase = 'closed';
  let screen = 0;
  let savedScroll;
  let savedOverflow;
  let transfer;
  let transition = [];
  let screenAnimation;

  function showImage(index) {
    screen = index;
    quickImage.src = index ? inspection.image : poster.src;
    quickImage.alt = index ? inspection.alt : poster.alt;
    caption.textContent = inspection.captions[index];
    imageButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  }

  function clearTransfer() {
    for (const animation of transition) animation.cancel();
    transition = [];
    transfer?.remove();
    transfer = undefined;
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
    dialog.close();
    root.style.overflow = savedOverflow;
    window.scrollTo({ top: savedScroll, behavior: 'instant' });
    opener.focus({ preventScroll: true });
    document.dispatchEvent(new Event('inspectionchange'));
  }

  function canMove(rect) {
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
  }

  function animateInspection(from, to, opening) {
    const opacity = getComputedStyle(surface).opacity;
    clearTransfer();
    const overlay = document.createElement('div');
    overlay.className = 'transfer';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.width = to.width + 'px';
    overlay.style.height = to.height + 'px';
    const image = new Image();
    image.src = poster.src;
    image.alt = '';
    overlay.append(image);
    const easing = 'cubic-bezier(.22,1,.36,1)';
    if (!opening && screen) {
      const detail = new Image();
      detail.src = quickImage.src;
      detail.alt = '';
      overlay.append(detail);
      detail.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing, fill: 'both' });
    }

    const position = rect => 'translate3d(' + rect.left + 'px,' + rect.top + 'px,0) scale('
      + rect.width / to.width + ',' + rect.height / to.height + ')';
    dialog.append(overlay);
    transfer = overlay;
    quickImage.style.visibility = 'hidden';
    const move = overlay.animate([
      { transform: position(from) }, { transform: position(to) }
    ], { duration: opening ? 430 : 355, easing, fill: 'both' });
    const fade = surface.animate(opening
      ? [{ opacity: 0 }, { opacity: 1 }]
      : [{ opacity }, { opacity: 0 }],
    { duration: opening ? 290 : 220, easing, fill: 'both' });
    transition = [move, fade];
    move.finished.then(() => {
      if (transition.includes(move)) (opening ? finishOpen : finishClose)();
    }).catch(() => { /* The transition was interrupted. */ });
  }

  function openInspection(event) {
    if (phase !== 'closed') return;
    opener = event.currentTarget;
    const project = opener.closest('.project-panel');
    poster = project.querySelector('.project-image');
    inspection = inspections[project.id];
    const source = poster.getBoundingClientRect();
    const animate = event.detail > 0 && motionEnabled() && typeof quickImage.animate === 'function' && canMove(source);

    savedScroll = scrollY;
    savedOverflow = root.style.overflow;
    dialog.dataset.project = project.id;
    quickTitle.textContent = project.querySelector('h3').textContent;
    quickStory.replaceChildren(document.getElementById(project.id + '-story').content.cloneNode(true));
    imageButtons.forEach((button, i) => { button.textContent = inspection.labels[i]; });
    showImage(0);
    phase = animate ? 'opening' : 'open';
    dialog.dataset.phase = phase;
    root.style.overflow = 'hidden';
    dialog.showModal();
    surface.scrollTop = 0;
    closeButton.focus({ preventScroll: true });
    document.dispatchEvent(new Event('inspectionchange'));
    if (animate) animateInspection(source, quickImage.getBoundingClientRect(), true);
  }

  function closeInspection(animate) {
    if (phase === 'closed') return;
    if (phase === 'closing' || !animate || !motionEnabled() || typeof quickImage.animate !== 'function') {
      finishClose();
      return;
    }
    const from = (transfer || quickImage).getBoundingClientRect();
    const to = poster.getBoundingClientRect();
    if (!canMove(from) || !canMove(to)) {
      finishClose();
      return;
    }
    phase = 'closing';
    dialog.dataset.phase = phase;
    animateInspection(from, to, false);
  }

  if (typeof dialog.showModal === 'function') {
    for (const button of gallery.querySelectorAll('.quick-open')) {
      button.hidden = false;
      button.addEventListener('click', openInspection);
    }
    closeButton.addEventListener('click', event => closeInspection(event.detail > 0));
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      closeInspection(false);
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeInspection(event.detail > 0);
    });
    imageButtons.forEach((button, index) => {
      button.addEventListener('click', event => {
        if (phase === 'opening') finishOpen();
        if (phase !== 'open' || screen === index) return;
        showImage(index);
        screenAnimation?.cancel();
        if (motionEnabled() && event.detail > 0 && typeof quickImage.animate === 'function') {
          screenAnimation = quickImage.animate([{ opacity: .55 }, { opacity: 1 }], {
            duration: 150,
            easing: 'ease-out'
          });
        }
      });
    });
  }

  function applyMotion() {
    const enabled = motionOverride ? motionOverride === 'on' : !preference.matches;
    root.dataset.motion = enabled ? 'on' : 'off';
    motionButton.textContent = enabled ? 'Pause motion' : 'Enable motion';
    if (!enabled) {
      clearPanelAnimations();
      screenAnimation?.cancel();
      if (phase === 'opening') finishOpen();
      if (phase === 'closing') finishClose();
    }
    document.dispatchEvent(new Event('motionchange'));
  }

  addEventListener('resize', () => {
    if (phase === 'opening') finishOpen();
    if (phase === 'closing') finishClose();
  });
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    motionOverride = motionEnabled() ? 'off' : 'on';
    applyMotion();
  });
  preference.addEventListener('change', applyMotion);
  applyMotion();
})();
