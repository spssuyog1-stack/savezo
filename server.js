const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

// SEO files
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').sendFile(path.join(publicDir, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://savezo-production.up.railway.app/</loc></url>
  <url><loc>https://savezo-production.up.railway.app/about.html</loc></url>
  <url><loc>https://savezo-production.up.railway.app/contact.html</loc></url>
  <url><loc>https://savezo-production.up.railway.app/privacy.html</loc></url>
  <url><loc>https://savezo-production.up.railway.app/terms.html</loc></url>
  <url><loc>https://savezo-production.up.railway.app/disclaimer.html</loc></url>
</urlset>`;

  res.set('Content-Type', 'text/xml; charset=utf-8');
  res.status(200).send(xml);
});

// Main site
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SAVEZO running on port ${PORT}`);
});
