const fs = require('fs');
const path = require('path');

const adminFiles = [
    'www/admin.html',
    'www/admin-packages.html',
    'www/admin-paid-users.html'
];

adminFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Fix incorrect links (admin-features.html -> admin-packages.html)
    content = content.replace(/admin-features\.html/g, 'admin-packages.html');

    // 2. Adjust Body Class for Mobile
    content = content.replace(/class=\"bg-vmax-dark text-white font-sans overflow-x-hidden antialiased selection:bg-vmax-cyan selection:text-vmax-dark flex h-screen\"/g,
        'class="bg-vmax-dark text-white font-sans overflow-x-hidden antialiased selection:bg-vmax-cyan selection:text-vmax-dark flex h-screen flex-col lg:flex-row"');

    // 3. Update Sidebar to be responsive and hidden by default on mobile
    content = content.replace(/<aside\s+class=\"w-64 bg-vmax-gray\/50 border-r border-white\/10 h-full flex flex-col relative z-40 backdrop-blur-md pt-8 pl-8 pb-8 pr-4 m-6 rounded-2xl glass-glow\"/g,
        '<aside id="sidebar" class="fixed inset-y-0 left-0 w-64 bg-vmax-gray/90 border-r border-white/10 h-[calc(100vh-2rem)] flex flex-col z-[150] backdrop-blur-xl pt-8 pl-8 pb-8 pr-4 m-4 rounded-2xl glass-glow transform -translate-x-full lg:translate-x-0 lg:static lg:h-full lg:m-6 transition-transform duration-300 ease-in-out"');

    // 4. Add Mobile Overlay for sidebar
    if (!content.includes('id="sidebar-overlay"')) {
        content = content.replace('<!-- Fixed Decorative Border -->',
            '<!-- Mobile Sidebar Overlay -->\n    <div id="sidebar-overlay" onclick="toggleSidebar()" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] opacity-0 pointer-events-none transition-opacity duration-300"></div>\n\n    <!-- Fixed Decorative Border -->');
    }

    // 5. Update Main Content Padding
    content = content.replace(/<main class=\"flex-grow h-full overflow-y-auto pt-10 pb-10 pr-10 pl-4 relative z-40\">/g,
        '<main class="flex-grow h-full overflow-y-auto pt-6 lg:pt-10 pb-10 px-4 lg:pr-10 lg:pl-4 relative z-40">');

    // 6. Update Header to include Mobile Menu Button
    content = content.replace(/<header class=\"flex justify-between items-center mb-10\">/g,
        '<header class="flex justify-between items-center mb-6 lg:mb-10">\n            <button onclick="toggleSidebar()" class="lg:hidden w-10 h-10 rounded-xl bg-vmax-gray border border-white/10 flex items-center justify-center text-vmax-cyan mr-3">\n                <i class="fa-solid fa-bars-staggered"></i>\n            </button>');

    // 7. Adjust Decorative Border for Mobile
    content = content.replace(/class=\"fixed inset-4 pointer-events-none z-\[100\] rounded-\[2rem\] border-2 border-vmax-cyan/g,
        'class="fixed inset-2 lg:inset-4 pointer-events-none z-[100] rounded-[1.5rem] lg:rounded-[2rem] border-2 border-vmax-cyan');

    // 8. Add toggleSidebar function to script
    if (!content.includes('function toggleSidebar')) {
        const toggleScript = `
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('opacity-0', 'pointer-events-none');
            }
        }`;

        if (content.includes('</script>')) {
            // Find the last script tag if multiple
            const parts = content.split('</script>');
            parts[parts.length - 2] += toggleScript;
            content = parts.join('</script>');
        }
    }

    fs.writeFileSync(file, content);
});
console.log('done_mobile_admin');
