const fs = require('fs');

['www/free-mobile-packages.html', 'www/free-router-packages.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make the outer container a 2-column grid to split categories (Dialog, Airtel, etc)
    content = content.replace(/class=\"space-y-0\.5 text-left mt-1\" id=\"mobile-packages-content\"/g, 'class="grid grid-cols-2 gap-1.5 items-start mt-1 text-left" id="mobile-packages-content"');
    content = content.replace(/class=\"space-y-0\.5 text-left mt-1\" id=\"router-packages-content\"/g, 'class="grid grid-cols-2 gap-1.5 items-start mt-1 text-left" id="router-packages-content"');
    content = content.replace(/id=\"mobile-packages-content\" class=\"overflow-y-auto/g, 'id="mobile-packages-content" class="grid grid-cols-2 gap-1.5 items-start overflow-y-auto');
    content = content.replace(/id=\"router-packages-content\" class=\"overflow-y-auto/g, 'id="router-packages-content" class="grid grid-cols-2 gap-1.5 items-start overflow-y-auto');

    // Make the inner package list stack vertically inside each category
    content = content.replace(/grid grid-cols-2 gap-1 text-left/g, 'flex flex-col gap-1 text-left');

    fs.writeFileSync(file, content);
});
console.log('done_split_categories');
