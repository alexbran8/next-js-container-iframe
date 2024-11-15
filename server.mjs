// server.mjs
import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

// Get the directory name in ES Modules
const __dirname = new URL('.', import.meta.url).pathname;

// Initialize Next.js app and Express
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare the app and handle server routes
app.prepare().then(() => {
  const server = express();

  // Serve container.html on the / route
  server.get('/', (req, res) => {
    // Send container.html for the / route
    res.sendFile(path.join(__dirname, 'container.html'));
  });

  server.use('/container.js', express.static(path.join(__dirname, 'container.js')));

  server.use(['/editor', '/_next', '*'], createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true,
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error: ' + err.message);
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying:', req.method, req.url, '→', proxyReq.path);
    },
    onProxyRes: function(proxyRes, req, res) {
        if (proxyRes.headers['content-type'] === 'text/plain; charset=utf-8' && 
            (req.url.endsWith('.js') || req.url.includes('webpack'))) {
            proxyRes.headers['content-type'] = 'application/javascript';
        }
    }
}));

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);  // Delegate handling to Next.js
  });

  // Start the Express server on port 3000
  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});
