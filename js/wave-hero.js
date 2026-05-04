// wave-hero.js — glowy waves canvas background (ported from React component)
// Colors mapped to site palette: deep-teal / cool-steel / ash-grey / soft-linen

(function () {
  'use strict';

  var BACKGROUND_TOP    = '#1e2927';
  var BACKGROUND_BOTTOM = '#152220';

  var WAVES = [
    { offset: 0,                amplitude: 70, frequency: 0.003,  color: 'rgba(95,116,112,0.8)',   opacity: 0.45 },
    { offset: Math.PI / 2,      amplitude: 90, frequency: 0.0026, color: 'rgba(136,150,150,0.7)',  opacity: 0.35 },
    { offset: Math.PI,          amplitude: 60, frequency: 0.0034, color: 'rgba(184,189,181,0.65)', opacity: 0.30 },
    { offset: Math.PI * 1.5,    amplitude: 80, frequency: 0.0022, color: 'rgba(210,212,200,0.25)', opacity: 0.25 },
    { offset: Math.PI * 2,      amplitude: 55, frequency: 0.004,  color: 'rgba(224,226,219,0.2)',  opacity: 0.20 },
  ];

  function init() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var animationId;
    var time = 0;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var mouseInfluence  = prefersReducedMotion ? 10  : 70;
    var influenceRadius = prefersReducedMotion ? 160 : 320;
    var smoothing       = prefersReducedMotion ? 0.04 : 0.1;

    var mouse       = { x: 0, y: 0 };
    var targetMouse = { x: 0, y: 0 };

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = canvas.parentElement
        ? canvas.parentElement.offsetHeight
        : window.innerHeight;
      mouse.x = targetMouse.x = canvas.width  / 2;
      mouse.y = targetMouse.y = canvas.height / 2;
    }

    function drawWave(wave) {
      ctx.save();
      ctx.beginPath();

      for (var x = 0; x <= canvas.width; x += 4) {
        var dx = x - mouse.x;
        var dy = canvas.height / 2 - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var influence = Math.max(0, 1 - dist / influenceRadius);
        var mouseEffect = influence * mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        var y = canvas.height / 2
          + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45)
          + mouseEffect;

        if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      }

      ctx.lineWidth   = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur  = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    }

    function animate() {
      time += 1;

      mouse.x += (targetMouse.x - mouse.x) * smoothing;
      mouse.y += (targetMouse.y - mouse.y) * smoothing;

      var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, BACKGROUND_TOP);
      grad.addColorStop(1, BACKGROUND_BOTTOM);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;

      for (var i = 0; i < WAVES.length; i++) {
        drawWave(WAVES[i]);
      }

      animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', function () {
      targetMouse.x = canvas.width  / 2;
      targetMouse.y = canvas.height / 2;
    });

    resize();
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
