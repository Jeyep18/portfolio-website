'use strict';

(() => {
  const experience = document.querySelector('#experience');
  const picker = experience.querySelector('.event-picker');
  const events = [...picker.querySelectorAll('button')];
  const stories = experience.querySelector('.event-stories');
  const gallery = experience.querySelector('.event-gallery');
  const photoPicker = gallery.querySelector('.photo-picker');
  const photo = gallery.querySelector('#event-photo');
  const placeholder = gallery.querySelector('.event-placeholder');
  const message = placeholder.querySelector('p');
  const status = gallery.querySelector('.photo-status');
  const motionEnabled = () => document.documentElement.dataset.motion === 'on';

  const photosByEvent = {
    'innolab-event': [
      { src: 'assets/events/innolab-team.jpg', alt: 'The InnoLab team posing with a certificate after the hackathon' },
      { src: 'assets/events/innolab-presentation.jpg', alt: 'The team presenting CherIt to the InnoLab audience' }
    ],
    'sparklab-event': [
      { src: 'assets/events/sparklab-workspace.jpg', alt: 'The SparkLab stage and a laptop showing a design prototype' },
      { src: 'assets/events/sparklab-banner.jpg', alt: 'The SparkLab Hackathon banner with the October 15–16, 2025 event dates' },
      { src: 'assets/events/sparklab-attendees.jpg', alt: 'Two SparkLab attendees giving a thumbs-up beside their laptops' }
    ],
    'byte-event': [],
    'pycon-event': []
  };
  let active = events[0];
  let activePhoto = 0;
  let frameAnimation;
  let storyAnimation;

  function photos() {
    return photosByEvent[active.getAttribute('aria-controls')];
  }

  function showPhoto(index, animate) {
    activePhoto = index;
    const images = photos();
    const entry = images[index];
    message.textContent = 'Event photos pending';
    placeholder.hidden = Boolean(entry);
    photo.hidden = !entry;
    if (entry) {
      photo.alt = entry.alt;
      photo.src = entry.src;
    } else {
      photo.removeAttribute('src');
      photo.alt = '';
    }
    status.textContent = entry ? 'Photo ' + (index + 1) + ' of ' + images.length : '';
    for (const button of photoPicker.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(Number(button.dataset.index) === index));
    }
    const target = entry ? photo : placeholder;
    const opacity = getComputedStyle(target).opacity;
    frameAnimation?.cancel();
    if (animate && motionEnabled() && typeof target.animate === 'function') {
      frameAnimation = target.animate([
        { opacity: Math.min(.42, Number(opacity)) }, { opacity: 1 }
      ], { duration: 210, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
  }

  function showEvent(button, animate) {
    const previous = document.getElementById(active.getAttribute('aria-controls'));
    if (previous.contains(document.activeElement)) button.focus({ preventScroll: true });
    active = button;
    const id = active.getAttribute('aria-controls');
    for (const option of events) {
      const selected = option === button;
      const story = document.getElementById(option.getAttribute('aria-controls'));
      option.setAttribute('aria-pressed', String(selected));
      story.setAttribute('aria-hidden', String(!selected));
      story.inert = !selected;
    }
    const images = photos();
    const controls = images.length > 1 ? images.map((image, index) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.dataset.index = String(index);
      option.setAttribute('aria-label', 'Photo ' + (index + 1) + ': ' + image.alt);
      option.setAttribute('aria-controls', 'event-frame');
      const thumbnail = new Image(48, 32);
      thumbnail.src = image.src;
      thumbnail.alt = '';
      option.append(thumbnail);
      return option;
    }) : [];
    photoPicker.replaceChildren(...controls);
    photoPicker.hidden = controls.length === 0;
    showPhoto(0, animate);
    storyAnimation?.cancel();
    const story = document.getElementById(id);
    if (animate && motionEnabled() && typeof story.animate === 'function') {
      storyAnimation = story.animate([
        { opacity: .52, transform: 'translateY(7px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
  }

  picker.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button && button !== active) showEvent(button, event.detail > 0);
  });
  picker.addEventListener('keydown', event => {
    const direction = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 }[event.key];
    if (!direction || !events.includes(event.target)) return;
    event.preventDefault();
    const next = events[(events.indexOf(event.target) + direction + events.length) % events.length];
    next.focus();
    showEvent(next, false);
  });
  photoPicker.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const index = Number(button.dataset.index);
    if (index !== activePhoto) showPhoto(index, event.detail > 0);
  });
  photo.addEventListener('error', () => {
    if (photo.hidden) return;
    photo.hidden = true;
    message.textContent = 'Photo unavailable';
    placeholder.hidden = false;
  });
  document.addEventListener('motionchange', () => {
    if (motionEnabled()) return;
    frameAnimation?.cancel();
    storyAnimation?.cancel();
  });

  stories.dataset.ready = '';
  showEvent(active, false);
  picker.hidden = false;
  gallery.hidden = false;
})();
