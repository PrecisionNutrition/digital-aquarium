import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActivityFeed } from '@renderer/components/ui/ActivityFeed';
import { ActivityCategory } from '@shared/types';
import type { Activity } from '@shared/types';

describe('ActivityFeed', () => {
  const mockActivities: Activity[] = [
    {
      id: '1',
      name: 'Visual Studio Code',
      category: ActivityCategory.WORK,
      duration: 3600,
      timestamp: new Date('2024-01-01T10:00:00')
    },
    {
      id: '2',
      name: 'Slack',
      category: ActivityCategory.COMMUNICATION,
      duration: 300,
      timestamp: new Date('2024-01-01T11:00:00')
    }
  ];

  it('should display empty state when no activities', () => {
    render(<ActivityFeed activities={[]} />);
    
    expect(screen.getByText('No activities recorded yet')).toBeInTheDocument();
  });

  it('should display activities', () => {
    render(<ActivityFeed activities={mockActivities} />);
    
    expect(screen.getByText('Visual Studio Code')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
  });

  it('should display activity durations', () => {
    render(<ActivityFeed activities={mockActivities} />);
    
    expect(screen.getByText('1h 0m')).toBeInTheDocument(); // 3600 seconds
    expect(screen.getByText('5m')).toBeInTheDocument(); // 300 seconds
  });

  it('should display activity categories', () => {
    render(<ActivityFeed activities={mockActivities} />);
    
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Communication')).toBeInTheDocument();
  });

  it('should format short durations correctly', () => {
    const shortActivity: Activity = {
      id: '3',
      name: 'Quick Task',
      category: ActivityCategory.OTHER,
      duration: 45,
      timestamp: new Date()
    };
    
    render(<ActivityFeed activities={[shortActivity]} />);
    
    expect(screen.getByText('45s')).toBeInTheDocument();
  });

  it('should show only recent activities in reverse order', () => {
    const manyActivities = Array.from({ length: 15 }, (_, i) => ({
      id: `${i}`,
      name: `Activity ${i}`,
      category: ActivityCategory.OTHER,
      duration: 100,
      timestamp: new Date()
    }));
    
    render(<ActivityFeed activities={manyActivities} />);
    
    // Should show only last 10 activities
    expect(screen.queryByText('Activity 0')).not.toBeInTheDocument();
    expect(screen.queryByText('Activity 4')).not.toBeInTheDocument();
    expect(screen.getByText('Activity 5')).toBeInTheDocument();
    expect(screen.getByText('Activity 14')).toBeInTheDocument();
  });
});
