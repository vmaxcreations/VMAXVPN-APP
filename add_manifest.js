const fs = require('fs');

const replacement = `<link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#050B14">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <script src="https://cdn.tailwindcss.com"></script>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('manifest.json')) {
        content = content.replace('<script src="https://cdn.tailwindcss.com"></script>', replacement);
        fs.writeFileSync(f, content);
        console.log('Updated ' + f);
    }
});
