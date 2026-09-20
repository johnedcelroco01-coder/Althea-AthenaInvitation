// 7th Birthday Invitation — script.js
// Handles: floating decorations in the hero/final sections, falling
// confetti in the final section, and the gift pop-up dialog.

(function () {
  const SYMBOLS = {
    hearts: 'i-heart',
    stars: 'i-star',
    bows: 'i-bow',
    sparkles: 'i-sparkle',
    balloons: 'i-balloon',
  };
  const COLORS = ['#ff4fa3', '#ffb3dd', '#c8a2e8', '#ffe27a', '#ffffff'];

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // --- Floating hearts/stars/bows/balloons that rise up the hero/final --- //
  document.querySelectorAll('[data-floaters]').forEach((host) => {
    const kinds = host.dataset.floaters.split(/\s+/).filter(Boolean);
    const count = parseInt(host.dataset.count, 10) || 20;

    for (let i = 0; i < count; i++) {
      const kind = pick(kinds);
      const symbolId = SYMBOLS[kind] || 'i-heart';
      const size = rand(14, 34);
      const isBalloon = kind === 'balloons';

      const el = document.createElement('span');
      el.className = 'floater';
      el.style.setProperty('--x', rand(0, 100) + '%');
      el.style.setProperty('--c', pick(COLORS));
      el.style.setProperty('--size', size + 'px');
      if (isBalloon) el.style.setProperty('--h', size * 1.6 + 'px');
      el.style.setProperty('--dur', rand(9, 18) + 's');
      el.style.setProperty('--delay', rand(0, 14) + 's');
      el.style.setProperty('--drift', rand(-60, 60) + 'px');
      el.style.setProperty('--spin', rand(-40, 40) + 'deg');

      el.innerHTML = `<svg viewBox="0 0 ${isBalloon ? '48 80' : '64 64'}"><use href="#${symbolId}"/></svg>`;
      host.appendChild(el);
    }
  });

  // --- Falling confetti rain (final section) --- //
  document.querySelectorAll('[data-rain]').forEach((host) => {
    const count = parseInt(host.dataset.rain, 10) || 30;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('i');
      const wide = Math.random() > 0.5;
      piece.style.setProperty('--x', rand(0, 100) + '%');
      piece.style.setProperty('--w', (wide ? rand(6, 10) : rand(3, 5)) + 'px');
      piece.style.setProperty('--h', (wide ? rand(3, 5) : rand(8, 14)) + 'px');
      piece.style.setProperty('--c', pick(COLORS));
      piece.style.setProperty('--r', Math.random() > 0.5 ? '50%' : '2px');
      piece.style.setProperty('--dur', rand(5, 10) + 's');
      piece.style.setProperty('--delay', rand(0, 8) + 's');
      piece.style.setProperty('--sway', rand(-40, 40) + 'px');
      host.appendChild(piece);
    }
  });

  // --- "Open invitation" button: a little confetti burst on click --- //
  const openBtn = document.getElementById('openBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => burstConfetti(openBtn));
  }

  function burstConfetti(originEl) {
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 24; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      const angle = rand(0, Math.PI * 2);
      const distance = rand(60, 160);
      piece.style.left = originX + 'px';
      piece.style.top = originY + 'px';
      piece.style.setProperty('--w', rand(5, 9) + 'px');
      piece.style.setProperty('--h', rand(8, 14) + 'px');
      piece.style.setProperty('--c', pick(COLORS));
      piece.style.setProperty('--r', Math.random() > 0.5 ? '50%' : '2px');
      piece.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      piece.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
      piece.style.setProperty('--rot', rand(90, 360) + 'deg');
      piece.style.setProperty('--dur', rand(0.7, 1.1) + 's');
      document.body.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  }

  // --- Gift pop-up: opened by clicking a "7 Gifts" link, if present --- //
  const giftPopup = document.getElementById('giftPopup');
  const giftMessage = document.getElementById('giftMessage');
  const giftClose = document.getElementById('giftClose');
  const GIFT_MESSAGES = [
    'A little surprise, just for you!',
    'Thank you for celebrating with us!',
    'You make our birthday brighter!',
  ];

  document.querySelectorAll('a[href="#gifts"], .gift').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!giftPopup) return;
      e.preventDefault();
      if (giftMessage) giftMessage.textContent = pick(GIFT_MESSAGES);
      if (typeof giftPopup.showModal === 'function') giftPopup.showModal();
    });
  });

  if (giftClose && giftPopup) {
    giftClose.addEventListener('click', () => giftPopup.close());
  }
})();