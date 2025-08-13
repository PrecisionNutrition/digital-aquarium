import type { AquariumState, Fish } from '@shared/types';

export function drawAquarium(
  ctx: CanvasRenderingContext2D,
  state: AquariumState,
  width: number,
  height: number
) {
  // Draw water effects
  drawWaterEffects(ctx, width, height, state.waterQuality);

  // Draw background elements (plants, decorations)
  drawBackgroundElements(ctx, width, height);

  // Draw fish
  state.fish.forEach(fish => {
    drawFish(ctx, fish);
  });

  // Draw bubbles
  drawBubbles(ctx, width, height);

  // Draw UI overlay
  drawHealthIndicator(ctx, state.workLifeBalance, width);
}

function drawWaterEffects(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  quality: number
) {
  // Create subtle water gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  const opacity = 0.1 + (1 - quality) * 0.3; // More murky when quality is low

  gradient.addColorStop(0, `rgba(135, 206, 235, ${opacity})`);
  gradient.addColorStop(1, `rgba(70, 130, 180, ${opacity})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawBackgroundElements(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Draw simple seaweed
  ctx.strokeStyle = '#2d5a2d';
  ctx.lineWidth = 3;

  for (let i = 0; i < 5; i++) {
    const x = (width / 6) * (i + 1);
    const baseY = height - 20;

    ctx.beginPath();
    ctx.moveTo(x, baseY);

    // Create wavy seaweed
    for (let y = baseY; y > height * 0.6; y -= 10) {
      const wave = Math.sin(y / 30 + i * 0.5) * 15;
      ctx.lineTo(x + wave, y);
    }

    ctx.stroke();
  }

  // Draw sand/gravel
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(0, height - 20, width, 20);
}

function drawFish(ctx: CanvasRenderingContext2D, fish: Fish) {
  ctx.save();

  // Translate to fish position
  ctx.translate(fish.position.x, fish.position.y);

  // Rotate based on velocity
  const angle = Math.atan2(fish.velocity.y, fish.velocity.x);
  ctx.rotate(angle);

  // Draw fish body
  ctx.fillStyle = fish.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, fish.size, fish.size * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw tail
  ctx.beginPath();
  ctx.moveTo(-fish.size, 0);
  ctx.lineTo(-fish.size * 1.5, -fish.size * 0.4);
  ctx.lineTo(-fish.size * 1.5, fish.size * 0.4);
  ctx.closePath();
  ctx.fill();

  // Draw eye
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(fish.size * 0.3, -fish.size * 0.2, fish.size * 0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(fish.size * 0.35, -fish.size * 0.2, fish.size * 0.08, 0, Math.PI * 2);
  ctx.fill();

  // Draw health indicator if low
  if (fish.health < 0.5) {
    ctx.strokeStyle = fish.health < 0.3 ? '#ff0000' : '#ffaa00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, fish.size + 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawBubbles(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

  // Draw some random bubbles
  const time = Date.now() / 1000;
  for (let i = 0; i < 10; i++) {
    const x = (width / 10) * i + Math.sin(time + i) * 20;
    const y = ((time * 30 + i * 100) % (height + 50)) - 50;
    const size = 3 + Math.sin(time + i) * 2;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHealthIndicator(
  ctx: CanvasRenderingContext2D,
  workLifeBalance: number,
  width: number
) {
  // Draw work-life balance indicator
  const barWidth = 200;
  const barHeight = 10;
  const x = width - barWidth - 20;
  const y = 20;

  // Background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(x, y, barWidth, barHeight);

  // Fill based on balance
  const hue = workLifeBalance * 120; // 0 = red, 120 = green
  ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
  ctx.fillRect(x, y, barWidth * workLifeBalance, barHeight);

  // Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.strokeRect(x, y, barWidth, barHeight);

  // Label
  ctx.fillStyle = 'white';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Work-Life Balance', x - 10, y + 8);
}
