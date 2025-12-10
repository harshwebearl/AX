// Express.js Configuration for serving React app with proper sitemap headers
// Add this to your Express server file (e.g., server.js or index.js)

const express = require('express');
const path = require('path');
const app = express();

// Trust proxy (important for security headers)
app.set('trust proxy', 1);

// Security Headers Middleware
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Prevent XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Control referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Enable compression
const compression = require('compression');
app.use(compression());

// Serve static files from the build directory
const buildPath = path.join(__dirname, '../build');
app.use(express.static(buildPath, {
  maxAge: '1d',
  etag: false,
  // Custom MIME types
  setHeaders: (res, filePath) => {
    // Sitemap XML
    if (filePath.endsWith('sitemap.xml')) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=1800'); // 30 minutes
    }
    
    // Robots.txt
    if (filePath.endsWith('robots.txt')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    }
    
    // Manifest JSON
    if (filePath.endsWith('manifest.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    }
    
    // Static assets (JS, CSS, images)
    if (/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    }
    
    // HTML files
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API routes (if any) - add your API routes here
// app.use('/api', apiRoutes);

// React Router - Serve index.html for all non-file routes
// This must come after all other route handlers
app.get('*', (req, res) => {
  // Don't rewrite sitemap, robots, or manifest
  if (req.path === '/sitemap.xml' || 
      req.path === '/robots.txt' || 
      req.path === '/manifest.json' ||
      req.path.startsWith('/api/')) {
    res.status(404).send('Not Found');
    return;
  }
  
  // Serve index.html for React Router
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
