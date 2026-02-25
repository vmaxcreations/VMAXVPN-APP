const fs = require('fs');

const adminFiles = [
    'www/admin.html',
    'www/admin-packages.html',
    'www/admin-paid-users.html'
];

adminFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make Header responsive (stack on small mobile)
    content = content.replace(/<header class=\"flex justify-between items-center mb-6 lg:mb-10\">/g,
        '<header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-10">');

    // Ensure the hamburger button stays at the top absolute or flexed correctly
    // Actually, let's wrap the hamburger and the title together for mobile
    if (content.includes('font-heading font-bold mb-1">')) {
        content = content.replace(/<button onclick=\"toggleSidebar\(\)\" class=\"lg:hidden w-10 h-10 rounded-xl bg-vmax-gray border border-white\/10 flex items-center justify-center text-vmax-cyan mr-3\">\s+<i class=\"fa-solid fa-bars-staggered\"><\/i>\s+<\/button>\s+<div>/g,
            '<div class="flex items-center w-full sm:w-auto">\n                <button onclick="toggleSidebar()" class="lg:hidden w-10 h-10 rounded-xl bg-vmax-gray border border-white/10 flex items-center justify-center text-vmax-cyan mr-4 shrink-0">\n                    <i class="fa-solid fa-bars-staggered"></i>\n                </button>\n                <div>');
        // Close the new div
        content = content.replace(/<\/h1>\s+<p class=\"text-gray-400 text-sm\">/g, '</h1>\n                </div>\n            </div>\n            <p class="text-gray-400 text-sm sm:hidden mt-2">');
    }

    // Fix tables font size for mobile
    content = content.replace(/<table class=\"w-full text-left border-collapse\">/g, '<table class="w-full text-left border-collapse min-w-[600px]">');

    fs.writeFileSync(file, content);
});
console.log('done_refining_mobile_admin');
