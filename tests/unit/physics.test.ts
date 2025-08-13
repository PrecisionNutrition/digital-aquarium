import { describe, it, expect } from 'vitest';
import { updateFishPositions, spawnFish } from '@renderer/components/aquarium/physics';
import type { AquariumState } from '@shared/types';

describe('Physics', () => {
  describe('updateFishPositions', () => {
    it('should update fish positions based on velocity', () => {
      const fish = spawnFish(50, 50, 'test', 'activity-1');
      fish.velocity = { x: 10, y: 0 };

      const state: AquariumState = {
        fish: [fish],
        waterQuality: 0.8,
        temperature: 24,
        lightLevel: 0.7,
        workLifeBalance: 0.5
      };

      const updatedState = updateFishPositions(state, 1, 200, 200);

      expect(updatedState.fish[0].position.x).toBeGreaterThan(50);
      expect(updatedState.fish[0].position.y).toBe(50);
    });

    it('should bounce fish off boundaries', () => {
      const fish = spawnFish(190, 50, 'test', 'activity-1');
      fish.velocity = { x: 20, y: 0 };
      fish.size = 10;

      const state: AquariumState = {
        fish: [fish],
        waterQuality: 0.8,
        temperature: 24,
        lightLevel: 0.7,
        workLifeBalance: 0.5
      };

      const updatedState = updateFishPositions(state, 1, 200, 200);

      // Fish should have reversed direction
      expect(updatedState.fish[0].velocity.x).toBeLessThan(0);
    });

    it('should handle zero deltaTime', () => {
      const fish = spawnFish(50, 50, 'test', 'activity-1');
      const state: AquariumState = {
        fish: [fish],
        waterQuality: 0.8,
        temperature: 24,
        lightLevel: 0.7,
        workLifeBalance: 0.5
      };

      const updatedState = updateFishPositions(state, 0, 200, 200);

      expect(updatedState).toEqual(state);
    });
  });

  describe('spawnFish', () => {
    it('should create a fish with valid properties', () => {
      const fish = spawnFish(100, 100, 'goldfish', 'activity-123');

      expect(fish.id).toBeTruthy();
      expect(fish.position).toEqual({ x: 100, y: 100 });
      expect(fish.health).toBe(1);
      expect(fish.age).toBe(0);
      expect(fish.activityId).toBe('activity-123');
      expect(fish.size).toBeGreaterThanOrEqual(15);
      expect(fish.size).toBeLessThanOrEqual(25);
    });

    it('should create unique IDs for different fish', () => {
      const fish1 = spawnFish(50, 50, 'goldfish', 'activity-1');
      const fish2 = spawnFish(50, 50, 'goldfish', 'activity-1');

      expect(fish1.id).not.toBe(fish2.id);
    });
  });
});
