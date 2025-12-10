# Server Configuration Guide - Sitemap Content-Type Fix

## Overview
This guide explains how to properly configure your server to serve `sitemap.xml` with the correct `application/xml` Content-Type header. Without proper configuration, Google Search Console may report: "Your Sitemap appears to be an HTML page."

## Quick Summary

| Hosting Platform | Configuration File | Status |
|---|---|---|
| Apache (shared hosting) | `/public/.htaccess` | ✅ Ready |
| IIS (Windows) | `/public/web.config` | ✅ Ready |
| Netlify | `/netlify.toml` | ✅ Ready |
| Vercel | `/vercel.json` | ✅ Ready |
| Express.js (Node.js) | `server-config-express.js` | ✅ Ready |
| Other platforms | See platform-specific guide | 📖 Custom |

---

## Platform-Specific Setup

### 1. Apache (Shared Hosting)

**File:** `/public/.htaccess`

**Setup:**
1. The `.htaccess` file is automatically included in your build
2. When deployed to Apache hosting, it will be copied to your public directory
3. Ensure `.htaccess` files are allowed (contact hosting provider if disabled)

**Verification:**
```bash
# Check headers with curl
curl -I https://aax.kevalontechnology.in/sitemap.xml
# Should return: Content-Type: application/xml; charset=UTF-8
```

**Troubleshooting:**
- If `.htaccess` is not working, enable it in Apache configuration:
  ```apache
  <Directory /var/www/html>
    AllowOverride All
  </Directory>
  ```

---

### 2. IIS (Windows Server)

**File:** `/public/web.config`

**Setup:**
1. The `web.config` file is automatically included in your build
2. When deployed to IIS, it will be in your application root
3. IIS will automatically apply the settings

**Verification:**
1. Open IIS Manager
2. Navigate to your site
3. Check MIME Types - should show `.xml` as `application/xml`
4. Test with: `https://aax.kevalontechnology.in/sitemap.xml`

**Troubleshooting:**
- If headers aren't applied, ensure `StaticFile` module is enabled in IIS
- Restart IIS application pool after deploying

---

### 3. Netlify

**File:** `/netlify.toml`

**Setup:**
1. Commit the `netlify.toml` file to your repository
2. Connect your GitHub repo to Netlify
3. Netlify automatically detects and applies settings
4. No additional configuration needed

**Verification:**
- Deploy to Netlify
- Check `https://your-netlify-site.netlify.app/sitemap.xml` headers
- Should show `Content-Type: application/xml; charset=utf-8`

**Testing:**
```bash
curl -I https://your-site.netlify.app/sitemap.xml
```

---

### 4. Vercel

**File:** `/vercel.json`

**Setup:**
1. Commit the `vercel.json` file to your repository
2. Connect your GitHub repo to Vercel
3. Vercel automatically detects and applies settings
4. No additional configuration needed

**Verification:**
- Deploy to Vercel
- Check `https://your-vercel-site.vercel.app/sitemap.xml` headers
- Should show `Content-Type: application/xml; charset=utf-8`

**Testing:**
```bash
curl -I https://your-site.vercel.app/sitemap.xml
```

---

### 5. Express.js (Node.js Custom Server)

**File:** `server-config-express.js`

**Setup:**

1. Install required dependencies:
   ```bash
   npm install express compression
   ```

2. Create your server file (e.g., `server.js`):
   ```javascript
   require('dotenv').config();
   const express = require('express');
   const path = require('path');
   const compression = require('compression');

   const app = express();

   // Apply security headers middleware
   app.use((req, res, next) => {
     res.setHeader('X-Content-Type-Options', 'nosniff');
     res.setHeader('X-Frame-Options', 'SAMEORIGIN');
     res.setHeader('X-XSS-Protection', '1; mode=block');
     res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
     next();
   });

   // Enable compression
   app.use(compression());

   // Serve static files
   const buildPath = path.join(__dirname, 'build');
   app.use(express.static(buildPath, {
     maxAge: '1d',
     setHeaders: (res, filePath) => {
       if (filePath.endsWith('sitemap.xml')) {
         res.setHeader('Content-Type', 'application/xml; charset=utf-8');
         res.setHeader('Cache-Control', 'public, max-age=1800');
       }
       if (filePath.endsWith('robots.txt')) {
         res.setHeader('Content-Type', 'text/plain; charset=utf-8');
         res.setHeader('Cache-Control', 'public, max-age=3600');
       }
     }
   }));

   // React Router fallback
   app.get('*', (req, res) => {
     res.sendFile(path.join(buildPath, 'index.html'));
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "build": "react-scripts build",
       "dev": "react-scripts start"
     }
   }
   ```

4. Deploy and test

---

### 6. Other Platforms

#### cPanel Hosting
1. Use SSH to access your hosting
2. The `.htaccess` file should work automatically
3. If not, check via cPanel file manager that `.htaccess` is deployed

#### DigitalOcean, AWS, Heroku
- Follow Express.js setup above
- Or use a reverse proxy (Nginx) configuration

#### Nginx (Reverse Proxy)
```nginx
server {
    listen 80;
    server_name aax.kevalontechnology.in;

    # Sitemap configuration
    location /sitemap.xml {
        proxy_pass http://your-app:3000;
        add_header Content-Type "application/xml; charset=utf-8";
        proxy_cache_valid 200 30m;
    }

    # Robots.txt configuration
    location /robots.txt {
        proxy_pass http://your-app:3000;
        add_header Content-Type "text/plain; charset=utf-8";
        proxy_cache_valid 200 1h;
    }

    # All other requests
    location / {
        proxy_pass http://your-app:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Verification Steps

After deploying your configuration:

### 1. Check Headers
```bash
# Using curl
curl -I https://aax.kevalontechnology.in/sitemap.xml

# Expected output should include:
# Content-Type: application/xml; charset=utf-8
```

### 2. Check in Browser
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Visit `https://aax.kevalontechnology.in/sitemap.xml`
4. Click on the request
5. Go to Headers tab
6. Look for `Content-Type: application/xml`

### 3. Submit to Google Search Console
1. Go to Google Search Console
2. Select your property
3. Go to Sitemaps
4. Submit or re-submit: `https://aax.kevalontechnology.in/sitemap.xml`
5. Wait a few minutes for processing

### 4. Online Tools
- Use https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Upload or enter URL to validate

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|---|---|---|
| "HTML page" error | Wrong Content-Type header | Deploy correct config file |
| .htaccess not working | Module not enabled | Contact host / enable mod_rewrite |
| Sitemap not found | React Router catching it | Ensure exclusion rules in config |
| Cache not updating | Old cache | Manually clear or wait 30 mins |
| 404 errors on routes | Missing React Router fallback | Add index.html rewrite rule |

---

## Files Summary

```
aaxierodesign/
├── public/
│   ├── .htaccess          ← Apache configuration
│   ├── web.config         ← IIS configuration
│   ├── sitemap.xml        ← Your sitemap
│   └── robots.txt         ← Your robots.txt
├── netlify.toml           ← Netlify configuration
├── vercel.json            ← Vercel configuration
└── server-config-express.js ← Express.js reference
```

---

## Support

If you're still experiencing issues:

1. **Check deployment logs** - Most platforms show detailed logs
2. **Test with different tools** - Use multiple methods to verify
3. **Contact your hosting provider** - They can check server configuration
4. **Submit to Google** - Google will show specific error details

Remember: Google Search Console error messages are usually accurate and helpful!
