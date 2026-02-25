const fs = require('fs');

['www/free-mobile-packages.html', 'www/free-router-packages.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make bounding container scrollable but give more space

    // Increase package text size for readability
    content = content.replace(/text-\[8\.5px\] md:text-sm/g, 'text-xs md:text-sm');
    content = content.replace(/text-\[8\.5px\] mb-0\.5/g, 'text-[11px] mb-1.5');
    content = content.replace(/text-\[8\.5px\]/g, 'text-[10px]');

    // Increase paddings of individual items
    content = content.replace(/glass p-1 rounded-md py-0\.5/g, 'glass p-2 rounded-xl py-1.5');
    content = content.replace(/p-0\.5 space-y-0\.5/g, 'p-1.5 space-y-1.5');
    content = content.replace(/p-1 border-b/g, 'p-2 border-b');

    // Badges & spaces
    content = content.replace(/px-0\.5 py-\[1px\]/g, 'px-1.5 py-0.5');
    content = content.replace(/gap-0\.5/g, 'gap-2');
    content = content.replace(/gap-1 text-\[10px\]/g, 'gap-1.5 text-[9px] md:text-[10px]');
    content = content.replace(/gap-1 text-\[8\.5px\]/g, 'gap-1.5 text-[9px] md:text-[10px]');

    fs.writeFileSync(file, content);
});
console.log('done_enlarging');
