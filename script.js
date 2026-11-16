'use strict';

// Still previews work without JS. Touch and keyboard users can also play clips.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');

document.querySelectorAll('[data-video]').forEach((article) => {
  const video = article.querySelector('video');
  const title = article.querySelector('.papertitle').textContent;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'video-toggle';
  article.querySelector('.paper-media').append(button);
  let pinned = false;
  let revision = 0;

  function update(playing) {
    article.classList.toggle('playing', playing);
    button.textContent = playing ? 'Pause preview' : 'Play preview';
    button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} preview: ${title}`);
    button.setAttribute('aria-pressed', String(playing));
  }
  function stop() {
    revision += 1;
    pinned = false;
    video.pause();
    update(false);
  }
  async function play() {
    const requestedRevision = ++revision;
    try {
      await video.play();
      if (requestedRevision === revision) update(true);
    } catch {
      if (requestedRevision === revision) stop();
    }
  }
  button.addEventListener('click', () => {
    if (!video.paused) stop();
    else { pinned = true; play(); }
  });
  article.addEventListener('pointerenter', () => {
    if (hoverPointer.matches && !reducedMotion.matches) play();
  });
  article.addEventListener('pointerleave', () => { if (!pinned) stop(); });
  video.addEventListener('error', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) stop(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); }).observe(article);
  }
  update(false);
});
