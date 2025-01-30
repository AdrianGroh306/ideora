import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true, // Läuft ohne GUI, für Debugging auf false setzen
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:5173', // Dein Vite Dev-Server
    trace: 'on', // Tracing für Debugging aktivieren
  },
});