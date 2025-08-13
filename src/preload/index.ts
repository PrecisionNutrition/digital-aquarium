import { contextBridge, ipcRenderer } from 'electron';

// Define the API that will be exposed to the renderer
const electronAPI = {
  // System info
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // Activity monitoring
  getActivityData: () => ipcRenderer.invoke('get-activity-data'),
  onActivityUpdate: (callback: (data: any) => void) => {
    const subscription = (_event: any, data: any) => callback(data);
    ipcRenderer.on('activity-update', subscription);
    
    // Return cleanup function
    return () => {
      ipcRenderer.removeListener('activity-update', subscription);
    };
  },
  
  // Theme
  onThemeChange: (callback: (isDark: boolean) => void) => {
    const subscription = (_event: any, isDark: boolean) => callback(isDark);
    ipcRenderer.on('theme-changed', subscription);
    
    return () => {
      ipcRenderer.removeListener('theme-changed', subscription);
    };
  }
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type definitions for TypeScript
export type ElectronAPI = typeof electronAPI;
