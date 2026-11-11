export const siteUrl = 'https://portfolio-space-gallery.vercel.app/';
export const siteName = 'John Francis Espiritu';
export const pageMetadata = {
  'index.html': {
    title: 'John Francis Espiritu · Frontend Developer Portfolio',
    description: 'John Francis Espiritu is a Computer Science student focused on frontend development. Explore his web projects, game environments, skills, and experience.',
    path: ''
  },
  'archive.html': {
    title: 'Project Archive · John Francis Espiritu',
    description: 'Explore John Francis Espiritu’s web, game, and academic projects, with project status, team contributions, and development notes.',
    path: 'archive.html'
  },
  'cherit.html': {
    title: 'CherIt Case Study · John Francis Espiritu',
    description: 'A look at CherIt, a team hackathon prototype for a lesson-pack library, and John Francis Espiritu’s contributions to direction, feature design, QA, and presentation.',
    path: 'cherit.html'
  },
  '404.html': {
    title: 'Page Not Found · John Francis Espiritu',
    description: 'This page could not be found. Return to John Francis Espiritu’s portfolio or browse his projects.',
    path: '404.html'
  }
};
const attribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function applyMetadata(html, page, { preview = false } = {}) {
  const { title, description, path } = pageMetadata[page];
  const url = new URL(path, siteUrl).href;
  html = html.replace(/<title>.*?<\/title>/, `<title>${attribute(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${attribute(description)}">`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${preview || page === '404.html' ? 'noindex,nofollow' : 'index,follow'}">`)
    .replace(/<link rel="icon"[^>]*>/, '<link rel="icon" type="image/svg+xml" sizes="any" href="/assets/favicon.svg">');
  const tags = [
    `<meta name="application-name" content="${siteName}">`,
    '<meta name="theme-color" content="#11121c">',
    `<meta property="og:site_name" content="${siteName}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${attribute(title)}">`,
    `<meta property="og:description" content="${attribute(description)}">`,
    `<meta property="og:url" content="${url}">`,
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${attribute(title)}">`,
    `<meta name="twitter:description" content="${attribute(description)}">`
  ];
  if (page !== '404.html') tags.push(`<link rel="canonical" href="${url}">`);
  if (page === 'index.html') tags.push('<script type="application/ld+json">' + JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite', name: siteName, url: siteUrl,
    description, about: { '@type': 'Person', name: siteName, url: siteUrl }
  }) + '</script>');
  return html.replace('</head>', tags.join('\n') + '\n</head>');
}
