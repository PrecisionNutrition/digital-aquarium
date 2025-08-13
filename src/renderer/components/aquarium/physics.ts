import type { AquariumState, Fish } from '@shared/types';

export function updateFishPositions(
  state: AquariumState,
  deltaTime: number,
  width: number,
  height: number
): AquariumState {
  // Don't update if no time has passed
  if (deltaTime <= 0 || deltaTime > 1) return state;

  const updatedFish = state.fish.map(fish => {
    // Update position based on velocity
    let newX = fish.position.x + fish.velocity.x * deltaTime;
    let newY = fish.position.y + fish.velocity.y * deltaTime;
    let newVelX = fish.velocity.x;
    let newVelY = fish.velocity.y;

    // Boundary collision detection
    const margin = fish.size;

    if (newX < margin || newX > width - margin) {
      newVelX = -newVelX; // Reverse horizontal direction
      newX = Math.max(margin, Math.min(width - margin, newX));
    }

    if (newY < margin || newY > height - margin - 20) {
      // Account for sand
      newVelY = -newVelY; // Reverse vertical direction
      newY = Math.max(margin, Math.min(height - margin - 20, newY));
    }

    // Add some random movement for more natural behavior
    const randomFactor = 0.5;
    newVelX += (Math.random() - 0.5) * randomFactor;
    newVelY += (Math.random() - 0.5) * randomFactor;

    // Limit maximum velocity
    const maxSpeed = 50;
    const speed = Math.sqrt(newVelX * newVelX + newVelY * newVelY);
    if (speed > maxSpeed) {
      newVelX = (newVelX / speed) * maxSpeed;
      newVelY = (newVelY / speed) * maxSpeed;
    }

    // Update fish age
    const newAge = fish.age + deltaTime;

    return {
      ...fish,
      position: { x: newX, y: newY },
      velocity: { x: newVelX, y: newVelY },
      age: newAge
    };
  });

  return {
    ...state,
    fish: updatedFish
  };
}

// Helper function to spawn a new fish
export function spawnFish(x: number, y: number, type: string, activityId: string): Fish {
  const fishColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
  const randomColor = fishColors[Math.floor(Math.random() * fishColors.length)];

  return {
    id: `fish-${Date.now()}-${Math.random()}`,
    type: type as Fish['type'],
    name: `Fish from ${type}`,
    position: { x, y },
    velocity: {
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40
    },
    size: 15 + Math.random() * 10,
    color: randomColor,
    health: 1,
    age: 0,
    activityId
  };
}
