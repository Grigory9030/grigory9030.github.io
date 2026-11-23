'use strict';

// Spring integration and presets adapted from https://designbookmark.com/motion
window.PortfolioMotion = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let request = 0;
  let previous = 0;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const spring = (value, stiffness, damping, precision = .001) =>
    ({value, target:value, velocity:0, stiffness, damping, precision});

  function snap(state, value = state.target) {
    state.value = state.target = value;
    state.velocity = 0;
  }

  function step(state, seconds) {
    if (!seconds || (Math.abs(state.target - state.value) < state.precision &&
        Math.abs(state.velocity) < state.precision * 20)) {
      snap(state);
      return false;
    }
    const dt = seconds / 4;
    for (let i = 0; i < 4; i++) {
      state.velocity += (-state.stiffness * (state.value - state.target) - state.damping * state.velocity) * dt;
      state.value += state.velocity * dt;
    }
    return true;
  }

  function tick(now) {
    const seconds = clamp((now - previous) / 1000, .001, 1 / 30);
    previous = now;
    for (const draw of active) {
      if (!draw(seconds)) active.delete(draw);
    }
    request = active.size ? requestAnimationFrame(tick) : 0;
  }

  function run(draw) {
    if (reduced.matches) {
      active.delete(draw);
      draw(0);
      return;
    }
    active.add(draw);
    if (!request) {
      previous = performance.now();
      request = requestAnimationFrame(tick);
    }
  }

  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    cancelAnimationFrame(request);
    request = 0;
    for (const draw of active) draw(0);
    active.clear();
  });

  // Sample the same spring for CSS transitions whose endpoints are known.
  function easing(stiffness, damping, duration) {
    const state = spring(0, stiffness, damping);
    state.target = 1;
    const segments = Math.ceil(duration / 16);
    const values = [0];
    for (let i = 1; i < segments; i++) {
      step(state, duration / segments / 1000);
      values.push(state.value.toFixed(4));
    }
    return 'linear(' + [...values, 1].join(', ') + ')';
  }

  return {reduced, clamp, spring, snap, step, run, easing};
})();
