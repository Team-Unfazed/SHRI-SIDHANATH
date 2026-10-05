/**
 * The handshake between the intro curtain and the hero entrance.
 *
 * Both mount at the same time, and React gives no ordering guarantee between
 * two siblings' effects, so the hero cannot simply ask the intro whether it has
 * finished. It awaits a promise instead.
 *
 * When the intro is skipped the promise is already resolved at module load —
 * before any component mounts — so the hero never waits on something that will
 * not arrive.
 */
/* Only the `?nomotion` QA hatch skips the intro. The OS reduced-motion flag
   does not: Windows reports it whenever "Animation effects" is off, which is
   common, and the intro is the brand entrance. It is short and can be left at
   any moment with a click or Enter / Space / Escape. */
const skip = () => {
  if (typeof window === 'undefined') return true;
  return new URLSearchParams(window.location.search).has('nomotion');
};

export const introSkipped = skip();

let settle;
export const introDone = new Promise((resolve) => {
  settle = resolve;
});

let settleComplete;
export const introComplete = new Promise((resolve) => {
  settleComplete = resolve;
});

if (introSkipped) {
  if (settle) settle();
  if (settleComplete) settleComplete();
}

/** Called by the 3D intro as its zoom-through exit begins */
export const finishIntro = () => {
  if (settle) {
    settle();
    settle = null;
  }
};

/** Called when the 3D intro curtain is fully gone and hero is completely open */
export const setIntroComplete = () => {
  if (settleComplete) {
    settleComplete();
    settleComplete = null;
  }
};
