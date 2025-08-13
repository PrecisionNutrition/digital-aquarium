// Activity types
export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  duration: number; // in seconds
  timestamp: Date;
  appIcon?: string;
}

export enum ActivityCategory {
  WORK = 'work',
  COMMUNICATION = 'communication',
  ENTERTAINMENT = 'entertainment',
  PRODUCTIVITY = 'productivity',
  LEARNING = 'learning',
  OTHER = 'other'
}

// Fish types
export interface Fish {
  id: string;
  type: FishType;
  name: string;
  position: Position2D;
  velocity: Velocity2D;
  size: number;
  color: string;
  health: number; // 0-1
  age: number; // in seconds
  activityId: string;
}

export enum FishType {
  GOLDFISH = 'goldfish',
  ANGELFISH = 'angelfish',
  CLOWNFISH = 'clownfish',
  BETTA = 'betta',
  TETRA = 'tetra',
  GUPPY = 'guppy'
}

// Aquarium types
export interface AquariumState {
  fish: Fish[];
  waterQuality: number; // 0-1
  temperature: number; // celsius
  lightLevel: number; // 0-1
  workLifeBalance: number; // 0-1
}

// Geometry types
export interface Position2D {
  x: number;
  y: number;
}

export interface Velocity2D {
  x: number;
  y: number;
}

// System types
export interface SystemInfo {
  platform: NodeJS.Platform;
  version: string;
  isDarkMode: boolean;
}

// Work-life balance metrics
export interface WorkLifeMetrics {
  workHours: number;
  breakTime: number;
  productiveTime: number;
  distractionTime: number;
  score: number; // 0-1
}
