import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Log startup environment
console.log(`[Garden Expo Africa] Initializing server on Node ${process.version}`);
console.log(`[Garden Expo Africa] Serving static files from: ${distPath}`);

// API / Healthcheck routes for Hostinger / uptime monitors
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'Garden Expo Africa Maroc',
    nodeVersion: process.version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Serve compiled static files from dist directory
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1d', etag: true }));
} else {
  console.warn(`[Garden Expo Africa] WARNING: 'dist' folder not found at ${distPath}. Run 'npm run build' first.`);
}

// Fallback to public directory if any raw assets are requested directly
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// Single Page Application (SPA) routing: redirect all navigation routes to index.html
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Garden Expo Africa - Déploiement en cours</title>
        <style>
          body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0c0a09; color: #fff; text-align: center; }
          .card { padding: 2rem; border-radius: 1rem; border: 1px solid #292524; background: #1c1917; max-width: 500px; }
          h1 { color: #10b981; font-size: 1.5rem; margin-bottom: 0.5rem; }
          p { color: #a8a29e; font-size: 0.9rem; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Garden Expo Africa Maroc</h1>
          <p>Le serveur Node.js est actif, mais les fichiers compilés (dist) ne sont pas encore prêts.<br>Veuillez exécuter <code>npm run build</code> sur Hostinger.</p>
        </div>
      </body>
      </html>
    `);
  }
});

// Start listening
const server = app.listen(PORT, HOST, () => {
  console.log(`[Garden Expo Africa] Server running successfully at http://${HOST}:${PORT}`);
});

// Graceful shutdown handling for Hostinger process management
const handleShutdown = (signal) => {
  console.log(`[Garden Expo Africa] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[Garden Expo Africa] HTTP server closed.');
    process.exit(0);
  });
  // Force exit after 5 seconds if connections linger
  setTimeout(() => {
    console.error('[Garden Expo Africa] Forcefully terminating server.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;
