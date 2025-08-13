import { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import { AquariumCanvas } from './components/aquarium/AquariumCanvas';
import { StatsPanel } from './components/ui/StatsPanel';
import { ActivityFeed } from './components/ui/ActivityFeed';
import { useAquarium } from './hooks/useAquarium';
import type { SystemInfo } from '@shared/types';

function App() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const { aquariumState, activities } = useAquarium();

  useEffect(() => {
    // Get system info on mount
    window.electronAPI.getSystemInfo().then(setSystemInfo);
  }, []);

  return (
    <Box className="h-screen flex flex-col bg-gray-50">
      {/* Title bar for macOS */}
      {systemInfo?.platform === 'darwin' && <Box className="drag-region h-8 bg-transparent" />}

      {/* App Bar */}
      <AppBar position="static" elevation={0} className="bg-white border-b">
        <Toolbar>
          <Typography variant="h6" className="text-gray-800 font-semibold">
            Digital Aquarium 🐠
          </Typography>
          <Box className="flex-grow" />
          <Typography variant="body2" className="text-gray-600">
            Work-Life Balance: {Math.round(aquariumState.workLifeBalance * 100)}%
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" className="flex-grow py-4">
        <Box className="grid grid-cols-12 gap-4 h-full">
          {/* Aquarium */}
          <Box className="col-span-8">
            <Paper elevation={2} className="h-full p-4">
              <Typography variant="h6" className="mb-2">
                Your Digital Aquarium
              </Typography>
              <AquariumCanvas state={aquariumState} />
            </Paper>
          </Box>

          {/* Side Panel */}
          <Box className="col-span-4 flex flex-col gap-4">
            {/* Stats */}
            <Paper elevation={2} className="p-4">
              <Typography variant="h6" className="mb-2">
                Statistics
              </Typography>
              <StatsPanel metrics={aquariumState} />
            </Paper>

            {/* Activity Feed */}
            <Paper elevation={2} className="flex-grow p-4 overflow-hidden">
              <Typography variant="h6" className="mb-2">
                Recent Activities
              </Typography>
              <ActivityFeed activities={activities} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
