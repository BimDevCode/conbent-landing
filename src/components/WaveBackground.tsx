import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CanvasWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let count = 0;
    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2);

    // particle grid config
    const separationBase = 60; // px between points in CSS pixels

    type Particle = { x: number; y: number; z: number; baseX: number; baseZ: number; size: number };
    let particles: Particle[] = [];
    let amountX = 0;
    let amountY = 0;
    let separation = separationBase;

    // mouse position in canvas CSS-pixel space, relative to grid center
    let mouseX = Number.POSITIVE_INFINITY;
    let mouseY = Number.POSITIVE_INFINITY;

    const resize = () => {
      const { clientWidth, clientHeight } = wrapper;
      const width = Math.max(1, clientWidth);
      const height = Math.max(1, clientHeight);

      canvas.width = Math.floor(width * deviceRatio);
      canvas.height = Math.floor(height * deviceRatio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

      // recompute grid based on size
      separation = Math.max(20, Math.min(70, Math.floor(Math.min(width, height) / 14)));
      amountX = Math.ceil(width / separation) + 2;
      amountY = Math.ceil(height / separation) + 2;

      const startX = -((amountX - 1) * separation) / 2;
      const startY = -((amountY - 1) * separation) / 2;

      particles = [];
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          const px = startX + ix * separation;
          const py = startY + iy * separation;
          particles.push({ x: px, y: py, z: 0, baseX: px, baseZ: py, size: 2 });
        }
      }
    };

    const draw = () => {
      const { width, height } = canvas;
      // clear with slight alpha for soft trails
      ctx.clearRect(0, 0, width, height);

      // translate to center for grid coords
      ctx.save();
      ctx.translate((width / deviceRatio) / 2, (height / deviceRatio) / 2);

      const colorPrimary = 'rgba(15, 139, 253, 0.85)';
      const colorSecondary = 'rgba(0, 212, 255, 0.6)';

      // proximity constants
      const influenceRadius = separation * 3; // CSS pixels
      const sigma2 = (influenceRadius * 0.75) * (influenceRadius * 0.75);
      const maxBoost = 3; // extra radius at cursor center

      let i = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          const p = particles[i++];
          // wave motion similar to provided code
          const yOffset = Math.sin((ix + count) * 0.3) * 6 + Math.sin((iy + count) * 0.5) * 6;
          const scale = (Math.sin((ix + count) * 0.3) + 1) * 0.7 + (Math.sin((iy + count) * 0.5) + 1) * 0.7;
          let size = 1 + scale;

          // increase radius near mouse
          const dx = p.x - mouseX;
          const dy = (p.y + yOffset) - mouseY;
          const d2 = dx * dx + dy * dy;
          const influence = Math.exp(-d2 / Math.max(1, sigma2));
          size += influence * maxBoost;

          // choose gradient-ish color by alternating
          ctx.fillStyle = (ix + iy) % 2 === 0 ? colorPrimary : colorSecondary;

          ctx.beginPath();
          ctx.arc(p.x, p.y + yOffset, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      count += 0.08;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    // Resize observer to track hero size
    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(wrapper);

    // track mouse movement globally (canvas has pointer-events: none)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // when window loses focus, fade effect by moving mouse far away
    const handleMouseLeave = () => {
      mouseX = Number.POSITIVE_INFINITY;
      mouseY = Number.POSITIVE_INFINITY;
    };
    window.addEventListener('blur', handleMouseLeave);

    resize();
    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove as EventListener);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, []);

  return (
    <CanvasWrapper ref={wrapperRef}>
      <Canvas ref={canvasRef} />
    </CanvasWrapper>
  );
};

export default WaveBackground;


