/**
 * Sitemap Generator for Static Files
 * Run this to generate sitemap.xml in public folder
 * 
 * Usage: node src/utils/generateSitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://aax.kevalontechnology.in';
const PAGES = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/about', changefreq: 'monthly', priority: '0.9' },
  { url: '/projects', changefreq: 'weekly', priority: '0.9' },
  { url: '/gallery', changefreq: 'weekly', priority: '0.8' },
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';
  
  PAGES.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log('✅ Sitemap generated at:', sitemapPath);
};

generateSitemap();

module.exports = { generateSitemap };
