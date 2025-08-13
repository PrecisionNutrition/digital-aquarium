import { Box, Typography, LinearProgress } from '@mui/material';
import type { AquariumState } from '@shared/types';

interface StatsPanelProps {
  metrics: AquariumState;
}

export function StatsPanel({ metrics }: StatsPanelProps) {
  const stats = [
    {
      label: 'Fish Population',
      value: metrics.fish.length,
      max: 50,
      color: 'primary' as const
    },
    {
      label: 'Water Quality',
      value: metrics.waterQuality * 100,
      max: 100,
      color: 'info' as const,
      unit: '%'
    },
    {
      label: 'Temperature',
      value: metrics.temperature,
      max: 30,
      color: 'warning' as const,
      unit: '°C'
    },
    {
      label: 'Light Level',
      value: metrics.lightLevel * 100,
      max: 100,
      color: 'success' as const,
      unit: '%'
    }
  ];

  return (
    <Box className="space-y-3">
      {stats.map(stat => (
        <Box key={stat.label}>
          <Box className="flex justify-between mb-1">
            <Typography variant="body2" className="text-gray-600">
              {stat.label}
            </Typography>
            <Typography variant="body2" className="font-medium">
              {Math.round(stat.value)}
              {stat.unit || ''}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(stat.value / stat.max) * 100}
            color={stat.color}
            className="h-2 rounded"
          />
        </Box>
      ))}

      <Box className="pt-3 mt-3 border-t">
        <Typography variant="body2" className="text-gray-600 mb-1">
          Aquarium Health
        </Typography>
        <Box className="flex items-center gap-2">
          <Box
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: getHealthColor(metrics.workLifeBalance)
            }}
          />
          <Typography variant="body1" className="font-medium">
            {getHealthStatus(metrics.workLifeBalance)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function getHealthColor(balance: number): string {
  if (balance >= 0.8) return '#4caf50';
  if (balance >= 0.6) return '#8bc34a';
  if (balance >= 0.4) return '#ffeb3b';
  if (balance >= 0.2) return '#ff9800';
  return '#f44336';
}

function getHealthStatus(balance: number): string {
  if (balance >= 0.8) return 'Excellent';
  if (balance >= 0.6) return 'Good';
  if (balance >= 0.4) return 'Fair';
  if (balance >= 0.2) return 'Poor';
  return 'Critical';
}
