(() => {
  'use strict';

  const intro = document.querySelector('.logo-intro');
  if (!intro) return;

  const status = intro.querySelector('.motion-note');
  const route = intro.querySelector('#paint-route');
  const revealStroke = intro.querySelector('.s-reveal-stroke');
  const sBuild = intro.querySelector('.s-build');
  const roller = intro.querySelector('.roller');
  const rollerPaint = intro.querySelector('.roller__paint');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const S_START = 1350;
  const S_DURATION = 1550;
  const TOTAL_DURATION = 3800;
  const ROLLER_LAG = 2.5;
  const IVORY = [246, 242, 234];
  const GOLD = [204, 134, 82];
  const ROUTE_SAMPLES = 220;
  let routeLength = 0;
  let routePoints = [];
  let fullRevealPath = '';
  let animationFrame = 0;
  let announceTimer = 0;

  const gentlyLinear = value =>
    value - Math.sin(value * Math.PI * 2) / (16 * Math.PI);

  const smoothstep = (start, end, value) => {
    const normalized = Math.min(1, Math.max(0, (value - start) / (end - start)));
    return normalized * normalized * (3 - 2 * normalized);
  };

  const mixColor = (from, to, amount) => {
    const channels = from.map((channel, index) =>
      Math.round(channel + (to[index] - channel) * amount)
    );
    return `rgb(${channels.join(', ')})`;
  };

  const prepareRoute = () => {
    routeLength = route.getTotalLength();
    routePoints = Array.from({ length: ROUTE_SAMPLES + 1 }, (_, index) => {
      const point = route.getPointAtLength(routeLength * index / ROUTE_SAMPLES);
      return [point.x, point.y];
    });
    fullRevealPath = routePoints
      .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
      .join('');
  };

  const revealRouteTo = distance => {
    if (distance <= 0) {
      revealStroke.setAttribute('d', '');
      sBuild.style.opacity = '0';
      return;
    }

    if (distance >= routeLength) {
      revealStroke.setAttribute('d', fullRevealPath);
      sBuild.style.opacity = '1';
      return;
    }

    const lastSample = Math.floor(distance / routeLength * ROUTE_SAMPLES);
    const passedPoints = routePoints.slice(0, lastSample + 1);
    const edge = route.getPointAtLength(distance);
    const pathData = passedPoints
      .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
      .concat(`L${edge.x.toFixed(2)} ${edge.y.toFixed(2)}`)
      .join('');

    revealStroke.setAttribute('d', pathData);
    sBuild.style.opacity = '1';
  };

  const setPaintProgress = progress => {
    const clamped = Math.min(1, Math.max(0, progress));
    const distance = clamped * routeLength;
    const settlingLag = ROLLER_LAG * (1 - smoothstep(.88, 1, clamped));
    const revealDistance = Math.max(0, distance - settlingLag);

    revealRouteTo(revealDistance);

    if (clamped <= 0 || clamped >= 1) {
      rollerPaint.style.fill = clamped >= 1
        ? mixColor(IVORY, GOLD, 1)
        : mixColor(IVORY, GOLD, 0);
      roller.style.opacity = '0';
      return;
    }

    const point = route.getPointAtLength(distance);
    const delta = Math.min(2.5, routeLength / 100);
    const before = route.getPointAtLength(Math.max(0, distance - delta));
    const after = route.getPointAtLength(Math.min(routeLength, distance + delta));
    const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    const goldAmount = smoothstep(.62, .70, clamped);

    roller.setAttribute(
      'transform',
      `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${(angle + 90).toFixed(2)})`
    );
    rollerPaint.style.fill = mixColor(IVORY, GOLD, goldAmount);
    roller.style.opacity = String(Math.min(1, clamped * 12, (1 - clamped) * 12));
  };

  const showReducedMotionFrame = () => {
    window.cancelAnimationFrame(animationFrame);
    window.clearTimeout(announceTimer);
    intro.classList.remove('is-running');
    intro.classList.add('is-complete');
    setPaintProgress(1);
    status.textContent = 'Логотип AVS показан без анимации.';
  };

  const playOnce = () => {
    prepareRoute();

    if (reducedMotion.matches) {
      showReducedMotionFrame();
      return;
    }

    setPaintProgress(0);
    intro.classList.remove('is-complete');
    intro.classList.add('is-running');
    status.textContent = 'Анимация логотипа запущена.';
    const startTime = performance.now();

    const tick = now => {
      const elapsed = now - startTime;

      if (elapsed < S_START) {
        setPaintProgress(0);
      } else if (elapsed < S_START + S_DURATION) {
        const rawProgress = (elapsed - S_START) / S_DURATION;
        setPaintProgress(gentlyLinear(rawProgress));
      } else {
        setPaintProgress(1);
      }

      if (elapsed < TOTAL_DURATION) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);
    announceTimer = window.setTimeout(() => {
      status.textContent = 'Анимация логотипа завершена.';
    }, TOTAL_DURATION);
  };

  const handleMotionPreference = () => {
    if (reducedMotion.matches) showReducedMotionFrame();
  };

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', handleMotionPreference);
  } else {
    reducedMotion.addListener(handleMotionPreference);
  }

  playOnce();
})();
