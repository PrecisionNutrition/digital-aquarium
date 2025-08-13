import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDev } from './utils/environment';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Handle creating/removing shortcuts on Windows when installing/uninstalling
// Note: electron-squirrel-startup is only needed for Windows installers

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  // Create the browser window with security best practices
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    icon: path.join(__dirname, '../../public/icon.png')
  });

  // Load the app
  if (isDev()) {
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Security: Prevent new window creation
app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });
});

// App event handlers
app.whenReady().then(async () => {
  // Set up IPC handlers before creating window
  setupIpcHandlers();

  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
function setupIpcHandlers() {
  // System info handler
  ipcMain.handle('get-system-info', () => {
    return {
      platform: process.platform,
      version: app.getVersion(),
      isDarkMode: nativeTheme.shouldUseDarkColors
    };
  });

  // Activity monitoring handlers will be added here
  ipcMain.handle('get-activity-data', async () => {
    // TODO: Implement activity monitoring
    return {
      activities: [],
      workLifeBalance: 0.5
    };
  });
}

// Error handling
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  // In production, we would send this to a crash reporter
  // For now, we fail hard as per requirements
  throw error;
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Fail hard on unhandled promise rejections
  throw new Error(`Unhandled Rejection: ${reason}`);
});
