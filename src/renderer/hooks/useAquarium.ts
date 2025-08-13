import { useState, useEffect } from 'react';
import type { AquariumState, Activity } from '@shared/types';

const DEFAULT_AQUARIUM_STATE: AquariumState = {
  fish: [],
  waterQuality: 0.8,
  temperature: 24,
  lightLevel: 0.7,
  workLifeBalance: 0.5
};

export function useAquarium() {
  const [aquariumState, setAquariumState] = useState<AquariumState>(DEFAULT_AQUARIUM_STATE);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Initial load of activity data
    loadActivityData();

    // Subscribe to activity updates
    const unsubscribe = window.electronAPI.onActivityUpdate((data) => {
      if (data.activities) {
        setActivities(data.activities);
      }
      if (data.workLifeBalance !== undefined) {
        setAquariumState(prev => ({
          ...prev,
          workLifeBalance: data.workLifeBalance
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loadActivityData = async () => {
    try {
      const data = await window.electronAPI.getActivityData();
      if (data.activities) {
        setActivities(data.activities);
      }
      if (data.workLifeBalance !== undefined) {
        setAquariumState(prev => ({
          ...prev,
          workLifeBalance: data.workLifeBalance
        }));
      }
    } catch (error) {
      console.error('Failed to load activity data:', error);
      throw error; // Fail hard as per requirements
    }
  };

  return {
    aquariumState,
    activities,
    refreshData: loadActivityData
  };
}
