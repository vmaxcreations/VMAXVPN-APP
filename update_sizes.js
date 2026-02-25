const fs = require('fs');

['www/free-mobile-packages.html', 'www/free-router-packages.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove navbar (everything from <nav id="navbar" to </nav>)
    content = content.replace(/<nav id="navbar"[\s\S]*?<\/nav>/, '<!-- Navbar Removed -->');

    // 2. Remove footer (everything from <footer to </footer>)
    content = content.replace(/<footer[\s\S]*?<\/footer>/, '<!-- Footer Removed -->');

    // Container Padding
    content = content.replace(/pt-24 pb-12/g, 'pt-4 pb-2');
    content = content.replace(/glass p-6 md:p-8/g, 'glass p-3 rounded-[1.5rem]');

    // Header section
    content = content.replace(/mb-8/g, 'mb-2');
    content = content.replace(/<div class="w-10 h-10"><\/div>/g, '<div class="w-8 h-8"></div>');
    content = content.replace(/<a href="features.html" class="w-10 h-10/g, '<a href="features.html" class="w-8 h-8 rounded-full border border-white/10 shadow-md');
    content = content.replace(/text-xl md:text-2xl/g, 'text-base md:text-lg');
    content = content.replace(/text-\[10px\] mb-1/g, 'text-[8px] mb-0');

    // Spaces between lists
    content = content.replace(/space-y-4/g, 'space-y-2');
    content = content.replace(/space-y-6/g, 'space-y-2 text-left');
    content = content.replace(/space-y-3/g, 'space-y-1 text-left');

    // Sub-headers (Dialog Mobile SIM, etc)
    content = content.replace(/w-10 h-10 rounded-full/g, 'w-6 h-6 rounded-full text-[10px]');
    content = content.replace(/text-xl font-bold tracking-wider/g, 'text-xs md:text-sm font-bold tracking-wider');
    content = content.replace(/p-4 space-y-/g, 'p-2 space-y-');
    content = content.replace(/p-4 border-b/g, 'p-2 border-b');
    content = content.replace(/gap-3/g, 'gap-2');

    // Package list items
    content = content.replace(/glass p-3 rounded-xl/g, 'glass p-1.5 rounded-lg py-1 shadow-sm');
    content = content.replace(/font-bold text-white mb-2 flex items-center gap-2/g, 'font-bold text-white text-[11px] mb-1 flex items-center gap-1.5');
    content = content.replace(/text-xs/g, 'text-[9px]'); // affects <div class="flex flex-wrap gap-2 text-xs">
    content = content.replace(/gap-2 text-\[9px\]/g, 'gap-1 text-[9px]');
    content = content.replace(/px-2 py-1/g, 'px-1.5 py-0.5 whitespace-nowrap leading-none');

    content = content.replace(/mb-2/g, 'mb-0');
    content = content.replace(/mt-2/g, 'mt-1');
    content = content.replace(/mt-8/g, 'mt-2 md:mt-0');

    fs.writeFileSync(file, content);
});
console.log('update-sizes done');
