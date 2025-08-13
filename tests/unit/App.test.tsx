import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '@renderer/App';

// Mock the electron API
beforeEach(() => {
  window.electronAPI = {
    getSystemInfo: vi.fn().mockResolvedValue({
      platform: 'darwin',
      version: '1.0.0',
      isDarkMode: false
    }),
    getActivityData: vi.fn().mockResolvedValue({
      activities: [],
      workLifeBalance: 0.5
    }),
    onActivityUpdate: vi.fn().mockReturnValue(() => {}),
    onThemeChange: vi.fn().mockReturnValue(() => {})
  };
});

describe('App', () => {
  it('should render main components', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Digital Aquarium 🐠')).toBeInTheDocument();
      expect(screen.getByText('Your Digital Aquarium')).toBeInTheDocument();
      expect(screen.getByText('Statistics')).toBeInTheDocument();
      expect(screen.getByText('Recent Activities')).toBeInTheDocument();
    });
  });

  it('should display work-life balance percentage', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Work-Life Balance: 50%')).toBeInTheDocument();
    });
  });

  it('should call getSystemInfo on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(window.electronAPI.getSystemInfo).toHaveBeenCalled();
    });
  });

  it('should call getActivityData on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(window.electronAPI.getActivityData).toHaveBeenCalled();
    });
  });
});
