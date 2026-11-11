'use strict';

(() => {
  const list = document.querySelector('.archive-list');
  const dialog = document.querySelector('#archive-dialog');
  const title = dialog.querySelector('h2');
  const close = dialog.querySelector('button');
  const content = dialog.querySelector('.archive-dialog-content');
  const root = document.documentElement;
  let trigger;
  let pageScroll;
  let pageOverflow;

  if (typeof dialog.showModal !== 'function') return;
  list.dataset.ready = '';
  for (const item of list.querySelectorAll('.archive-item')) {
    item.open = false;
    const summary = item.querySelector('summary');
    summary.setAttribute('aria-haspopup', 'dialog');
    summary.setAttribute('aria-controls', dialog.id);
    summary.addEventListener('click', event => {
      event.preventDefault();
      trigger = summary;
      pageScroll = scrollY;
      pageOverflow = root.style.overflow;
      title.textContent = summary.querySelector('.archive-title').textContent;
      content.replaceChildren(
        summary.querySelector('.archive-meta').cloneNode(true),
        item.querySelector('.archive-details').cloneNode(true)
      );
      root.style.overflow = 'hidden';
      dialog.showModal();
      close.focus({ preventScroll: true });
    });
  }

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    root.style.overflow = pageOverflow;
    window.scrollTo({ top: pageScroll, behavior: 'instant' });
    trigger.focus({ preventScroll: true });
  });
})();
