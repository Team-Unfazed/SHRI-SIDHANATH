/** Muted loop playback for full-bleed background videos (hero, about). */
export function useBackgroundVideo(rootRef, videoRef, introDonePromise) {
  const video = videoRef.current;
  const root = rootRef.current;
  if (!video) return () => {};

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  let visible = true;

  const playVideo = () => {
    video.muted = true;
    const promise = video.play();
    if (promise !== undefined) promise.catch(() => {});
  };
  const syncPlayback = () => {
    if (visible && !document.hidden) playVideo();
    else video.pause();
  };

  playVideo();
  introDonePromise?.then?.(playVideo);

  const userEvents = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'];
  const onFirstUserInteraction = () => {
    playVideo();
    userEvents.forEach((evt) => window.removeEventListener(evt, onFirstUserInteraction, { passive: true }));
  };
  userEvents.forEach((evt) => window.addEventListener(evt, onFirstUserInteraction, { passive: true }));

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncPlayback();
  }, { threshold: 0.05 });
  if (root) observer.observe(root);

  document.addEventListener('visibilitychange', syncPlayback);
  const onEnded = () => { video.currentTime = 0; playVideo(); };
  video.addEventListener('ended', onEnded);

  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', syncPlayback);
    video.removeEventListener('ended', onEnded);
    userEvents.forEach((evt) => window.removeEventListener(evt, onFirstUserInteraction));
    video.pause();
  };
}
