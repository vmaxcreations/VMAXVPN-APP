const fs = require('fs');

['www/free-mobile-packages.html', 'www/free-router-packages.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Change outer container to CSS columns
    content = content.replace(/id=\"mobile-packages-content\" class=\"overflow-y-auto max-h-\[80dvh\] flex-1 pb-10 scrollbar-hide\"/g, 'id="mobile-packages-content" class="columns-2 gap-2 overflow-y-auto max-h-[80dvh] flex-1 pb-10 scrollbar-hide"');
    content = content.replace(/id=\"router-packages-content\" class=\"overflow-y-auto max-h-\[80dvh\] flex-1 pb-10 scrollbar-hide\"/g, 'id="router-packages-content" class="columns-2 gap-2 overflow-y-auto max-h-[80dvh] flex-1 pb-10 scrollbar-hide"');

    // 2. Add break-inside-avoid to the category wrappers
    content = content.replace(/class=\"bg-vmax-dark\/60 rounded-2xl border border-white\/5 overflow-hidden\"/g, 'class="bg-vmax-dark/60 rounded-2xl border border-white/5 overflow-hidden break-inside-avoid mb-2"');

    // 3. Revert inner grids to full width single column per container, since the container is already half the screen now
    content = content.replace(/p-1\.5 grid grid-cols-2 gap-1 text-left/g, 'p-1.5 flex flex-col gap-1 text-left');

    fs.writeFileSync(file, content);
});
console.log('done_columns');
