import { Box, Typography, Chip, List, ListItem, ListItemText } from '@mui/material';
import type { Activity, ActivityCategory } from '@shared/types';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  // Show only the most recent activities
  const recentActivities = activities.slice(-10).reverse();

  if (recentActivities.length === 0) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography variant="body2" className="text-gray-500">
          No activities recorded yet
        </Typography>
      </Box>
    );
  }

  return (
    <List className="overflow-y-auto max-h-96">
      {recentActivities.map(activity => (
        <ListItem key={activity.id} className="px-0">
          <ListItemText
            primary={
              <Box className="flex items-center justify-between">
                <Typography variant="body2" className="font-medium">
                  {activity.name}
                </Typography>
                <Chip label={formatDuration(activity.duration)} size="small" variant="outlined" />
              </Box>
            }
            secondary={
              <Box component="span" className="flex items-center gap-2 mt-1">
                <Chip
                  label={formatCategory(activity.category)}
                  size="small"
                  color={getCategoryColor(activity.category)}
                  className="h-5"
                />
                <Typography component="span" variant="caption" className="text-gray-500">
                  {formatTime(activity.timestamp)}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

function formatCategory(category: ActivityCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatTime(timestamp: Date): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function getCategoryColor(
  category: ActivityCategory
): 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' {
  switch (category) {
    case 'work':
      return 'primary';
    case 'communication':
      return 'info';
    case 'entertainment':
      return 'secondary';
    case 'productivity':
      return 'success';
    case 'learning':
      return 'warning';
    default:
      return 'primary';
  }
}
