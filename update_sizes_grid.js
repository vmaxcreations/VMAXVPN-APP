const fs = require('fs');

['www/free-mobile-packages.html', 'www/free-router-packages.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make the package lists display in a 2-column grid so they fit vertically 
    // They are currently in `div class="p-1.5 space-y-1.5 text-left"` 
    content = content.replace(/p-1\.5 space-y-1\.5/g, 'p-1.5 grid grid-cols-2 gap-1.5');

    // Reduce sizes again slightly since they will be cramped horizontally now
    content = content.replace(/text-xs md:text-sm font-bold tracking-wider/g, 'text-[10px] md:text-xs font-bold tracking-wider');
    content = content.replace(/text-\[11px\] mb-1\.5/g, 'text-[8.5px] md:text-[9.5px] mb-1 leading-tight');
    content = content.replace(/text-\[9px\] md:text-\[10px\]/g, 'text-[7px]');

    // Resize padding
    content = content.replace(/glass p-2 rounded-xl py-1\.5/g, 'glass p-1.5 rounded-lg flex flex-col justify-between');

    // Reduce gap from gap-1.5 to gap-1 in badges
    content = content.replace(/gap-1\.5/g, 'gap-1');

    fs.writeFileSync(file, content);
});
console.log('done_grid');
