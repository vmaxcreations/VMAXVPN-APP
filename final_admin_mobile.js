const fs = require('fs');

const adminFiles = [
    'www/admin.html',
    'www/admin-packages.html',
    'www/admin-paid-users.html'
];

adminFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make sidebar scrollable
    content = content.replace(/id=\"sidebar\" class=\"([^"]+)\"/g, 'id="sidebar" class="$1 overflow-y-auto"');

    // Remove the fixed decorative border on very small screens or make it less intrusive
    content = content.replace(/class=\"fixed inset-2 lg:inset-4/g, 'class="fixed inset-[6px] lg:inset-4');

    fs.writeFileSync(file, content);
});
console.log('done_final_mobile_tweaks');
