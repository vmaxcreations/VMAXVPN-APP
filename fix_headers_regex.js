const fs = require('fs');

const adminFiles = [
    'www/admin.html',
    'www/admin-packages.html',
    'www/admin-paid-users.html'
];

adminFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Regex to match the messy header structure created by previous scripts
    const headerRegex = /<header class=\"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-10\">\s+<div class=\"flex items-center w-full sm:w-auto\">\s+<button onclick=\"toggleSidebar\(\)\" class=\"lg:hidden w-10 h-10 rounded-xl bg-vmax-gray border border-white\/10 flex items-center justify-center text-vmax-cyan mr-4 shrink-0\">\s+<i class=\"fa-solid fa-bars-staggered\"><\/i>\s+<\/button>\s+<div>\s+<h1 class=\"([^\"]+)\">([^<]+)<\/h1>\s+<\/div>\s+<\/div>\s+<p class=\"text-gray-400 text-sm sm:hidden mt-2\">([^<]+)<\/p>\s+<\/div>/;

    const match = content.match(headerRegex);
    if (match) {
        const titleClasses = match[1];
        const titleText = match[2];
        const subtitleText = match[3];

        const newHeader = `<header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-10">
            <div class="flex flex-col w-full sm:w-auto">
                <div class="flex items-center">
                    <button onclick="toggleSidebar()" class="lg:hidden w-10 h-10 rounded-xl bg-vmax-gray border border-white/10 flex items-center justify-center text-vmax-cyan mr-4 shrink-0">
                        <i class="fa-solid fa-bars-staggered"></i>
                    </button>
                    <h1 class="${titleClasses}">${titleText}</h1>
                </div>
                <p class="text-gray-400 text-sm mt-1 hidden sm:block">${subtitleText}</p>
            </div>`;

        content = content.replace(headerRegex, newHeader);
        fs.writeFileSync(file, content);
        console.log(`Fixed header in ${file}`);
    } else {
        console.log(`Could not find header pattern in ${file}`);
    }
});
