import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsPanel } from '@renderer/components/ui/StatsPanel';
import type { AquariumState } from '@shared/types';

describe('StatsPanel', () => {
  const mockMetrics: AquariumState = {
    fish: [
      {
        id: '1',
        type: 'goldfish' as any,
        name: 'Test Fish',
        position: { x: 50, y: 50 },
        velocity: { x: 1, y: 1 },
        size: 20,
        color: '#ff0000',
        health: 1,
        age: 0,
        activityId: 'test'
      }
    ],
    waterQuality: 0.8,
    temperature: 24,
    lightLevel: 0.7,
    workLifeBalance: 0.6
  };

  it('should display all stat labels', () => {
    render(<StatsPanel metrics={mockMetrics} />);

    expect(screen.getByText('Fish Population')).toBeInTheDocument();
    expect(screen.getByText('Water Quality')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Light Level')).toBeInTheDocument();
  });

  it('should display correct values', () => {
    render(<StatsPanel metrics={mockMetrics} />);

    expect(screen.getByText('1')).toBeInTheDocument(); // Fish count
    expect(screen.getByText('80%')).toBeInTheDocument(); // Water quality
    expect(screen.getByText('24°C')).toBeInTheDocument(); // Temperature
    expect(screen.getByText('70%')).toBeInTheDocument(); // Light level
  });

  it('should display aquarium health status', () => {
    render(<StatsPanel metrics={mockMetrics} />);

    expect(screen.getByText('Aquarium Health')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument(); // 0.6 balance = Good
  });

  it('should show correct health status for different balance levels', () => {
    const { rerender } = render(<StatsPanel metrics={mockMetrics} />);
    
    // Test different balance levels
    const testCases = [
      { balance: 0.9, expected: 'Excellent' },
      { balance: 0.7, expected: 'Good' },
      { balance: 0.5, expected: 'Fair' },
      { balance: 0.3, expected: 'Poor' },
      { balance: 0.1, expected: 'Critical' }
    ];

    testCases.forEach(({ balance, expected }) => {
      rerender(<StatsPanel metrics={{ ...mockMetrics, workLifeBalance: balance }} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });
});
