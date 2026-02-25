document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenuIcon.classList.remove('fa-xmark');
                mobileMenuIcon.classList.add('fa-bars');
            } else {
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-xmark');
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('glass', 'shadow-lg');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('glass', 'shadow-lg');
                navbar.classList.add('bg-transparent');
            }
        });
    }

    // Pricing Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                tabButtons.forEach(b => {
                    b.classList.remove('bg-vmax-cyan', 'text-vmax-dark', 'shadow-neon');
                    b.classList.add('text-gray-300');
                });
                tabContents.forEach(c => c.classList.add('hidden'));

                // Add active classes to clicked
                btn.classList.add('bg-vmax-cyan', 'text-vmax-dark', 'shadow-neon');
                btn.classList.remove('text-gray-300');

                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.remove('hidden');
            });
        });
    }

    // --- Live Chat UI ---
    // --- Support Overlay UI (Telegram, WhatsApp, Live Chat) ---
    const supportOverlayHTML = `
    <!-- Support Overlay -->
    <div id="support-overlay" class="fixed inset-0 z-[100] hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-vmax-dark/80 backdrop-blur-md" id="support-backdrop"></div>
        
        <!-- Content Area -->
        <div class="absolute bottom-24 left-4 right-4 max-w-sm mx-auto animate-float">
            <div class="glass-glow-purple p-6 rounded-[2.5rem] border border-vmax-purple/30 shadow-neon-purple text-center">
                <h3 class="text-2xl font-heading font-black mb-6 text-white uppercase tracking-wider">Contact <span class="text-gradient">Support</span></h3>
                
                <div class="grid grid-cols-2 gap-4">
                    <!-- Telegram -->
                    <a href="https://t.me/VMAXV2RAYZONE" target="_blank" class="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-vmax-cyan/40 hover:bg-white/10 transition-all group">
                        <div class="w-14 h-14 bg-[#0088cc] rounded-full flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                            <i class="fa-brands fa-telegram"></i>
                        </div>
                        <span class="text-xs font-bold text-gray-300">Telegram</span>
                    </a>

                    <!-- WhatsApp -->
                    <a href="https://wa.me/94703851990" target="_blank" class="flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-vmax-cyan/40 hover:bg-white/10 transition-all group">
                        <div class="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                            <i class="fa-brands fa-whatsapp"></i>
                        </div>
                        <span class="text-xs font-bold text-gray-300">WhatsApp</span>
                    </a>
                </div>

                <!-- Live Chat Toggle -->
                <button id="support-chat-trigger" class="w-full mt-4 flex items-center justify-center gap-3 p-4 rounded-3xl bg-gradient-to-r from-vmax-cyan to-vmax-blue text-vmax-dark font-black shadow-neon hover:shadow-lg transition-all active:scale-95">
                    <i class="fa-solid fa-comment-dots text-xl"></i>
                    Open Live Chat
                </button>

                <button id="close-support-overlay" class="mt-6 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                    <i class="fa-solid fa-xmark mr-2"></i>Close
                </button>
            </div>
        </div>
    </div>

    <!-- Chat Window -->
    <div id="chat-window" class="fixed bottom-24 left-4 right-4 lg:left-auto lg:right-10 w-[calc(100vw-2rem)] max-w-sm sm:w-80 glass-glow border border-vmax-cyan/30 rounded-2xl shadow-[0_0_30px_rgba(0,242,254,0.2)] z-[101] flex flex-col hidden overflow-hidden transition-all duration-300 transform origin-bottom">
        <!-- Chat Header -->
        <div class="bg-vmax-gray/90 backdrop-blur-md p-4 border-b border-white/10 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-vmax-cyan to-vmax-blue flex items-center justify-center text-vmax-dark font-bold relative">
                    <i class="fa-solid fa-headset"></i>
                    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-vmax-dark rounded-full"></span>
                </div>
                <div>
                    <h4 class="text-white font-bold text-sm">VMAX Support</h4>
                    <p class="text-vmax-cyan text-[10px] uppercase font-bold tracking-widest">Online</p>
                </div>
            </div>
            <button id="chat-close-btn" class="text-gray-400 hover:text-white transition-colors">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <!-- Chat Body -->
        <div id="chat-messages" class="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-vmax-dark/80 scrollbar-thin scrollbar-thumb-vmax-cyan scrollbar-track-transparent">
            <!-- Bot Message -->
            <div class="flex gap-2">
                <div class="w-8 h-8 rounded-full bg-vmax-gray flex items-center justify-center shrink-0 border border-white/5">
                    <i class="fa-solid fa-robot text-vmax-cyan text-xs"></i>
                </div>
                <div class="bg-vmax-gray/80 px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-gray-200 border border-white/5 max-w-[85%]">
                    Hello! 👋 Welcome to VMAX VPN. How can I help you today? Do you have questions about our packages or services?
                </div>
            </div>
        </div>

        <!-- Chat Input -->
        <div class="p-3 bg-vmax-gray/95 border-t border-white/10">
            <form id="chat-form" class="flex gap-2 relative">
                <input type="text" id="chat-input" class="w-full bg-vmax-dark border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-vmax-cyan focus:ring-1 focus:ring-vmax-cyan transition-all" placeholder="Type your message..." autocomplete="off">
                <button type="submit" class="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-vmax-cyan text-vmax-dark flex items-center justify-center hover:bg-vmax-blue transition-colors">
                    <i class="fa-solid fa-paper-plane text-sm"></i>
                </button>
            </form>
            <div class="text-center mt-3">
                <p class="text-[10px] text-gray-500">We typically reply in a few minutes.</p>
            </div>
        </div>
    </div>
    `;

    // Append UI to body
    document.body.insertAdjacentHTML('beforeend', supportOverlayHTML);

    // --- Mobile Bottom Navigation ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const bottomNavHTML = `
    <!-- Mobile Bottom Nav -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 glass backdrop-blur-xl border-t border-white/10 z-[90] pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div class="flex justify-around items-center px-2 py-3">
            <a href="index.html" class="flex flex-col items-center gap-1 ${currentPage === 'index.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-all w-[20%] active:scale-95">
                <i class="fa-solid fa-house text-xl mb-0.5"></i>
                <span class="text-[10px] font-bold tracking-tight">Home</span>
            </a>
            <a href="features.html" class="flex flex-col items-center gap-1 ${currentPage === 'features.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-all w-[20%] active:scale-95">
                <i class="fa-solid fa-gift text-xl mb-0.5"></i>
                <span class="text-[10px] font-bold tracking-tight">Free</span>
            </a>
            <a href="premium.html" class="flex flex-col items-center gap-1 ${currentPage === 'premium.html' ? 'text-vmax-purple' : 'text-gray-400 hover:text-white'} transition-all w-[20%] active:scale-95">
                <i class="fa-solid fa-crown text-xl mb-0.5"></i>
                <span class="text-[10px] font-bold tracking-tight">Premium</span>
            </a>
            <button id="nav-support-trigger" class="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-all w-[20%] active:scale-95">
                <i class="fa-solid fa-headset text-xl mb-0.5"></i>
                <span class="text-[10px] font-bold tracking-tight">Support</span>
            </button>
            <a href="login.html" class="flex flex-col items-center gap-1 ${currentPage === 'login.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-all w-[20%] active:scale-95" id="nav-account-link">
                <i class="fa-solid fa-user text-xl mb-0.5"></i>
                <span class="text-[10px] font-bold tracking-tight" id="nav-account-text">Account</span>
            </a>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

    const supportOverlay = document.getElementById('support-overlay');
    const navSupportTrigger = document.getElementById('nav-support-trigger');
    const closeSupportOverlay = document.getElementById('close-support-overlay');
    const supportBackdrop = document.getElementById('support-backdrop');
    const supportChatTrigger = document.getElementById('support-chat-trigger');

    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Support Overlay
    if (navSupportTrigger) {
        navSupportTrigger.addEventListener('click', () => {
            if (supportOverlay) supportOverlay.classList.remove('hidden');
        });
    }

    const closeOverlay = () => {
        if (supportOverlay) supportOverlay.classList.add('hidden');
    };

    if (closeSupportOverlay) closeSupportOverlay.addEventListener('click', closeOverlay);
    if (supportBackdrop) supportBackdrop.addEventListener('click', closeOverlay);

    // Support Chat Trigger
    if (supportChatTrigger) {
        supportChatTrigger.addEventListener('click', () => {
            closeOverlay();
            if (chatWindow) {
                chatWindow.classList.remove('hidden');
                if (chatInput) chatInput.focus();
            }
        });
    }

    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            if (chatWindow) chatWindow.classList.add('hidden');
        });
    }

    // Handle sending message
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!chatInput) return;
            const msgText = chatInput.value.trim();
            if (!msgText) return;

            // Escape HTML
            const safeMsg = msgText.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            // Display user message
            if (chatMessages) {
                const userMsgHTML = `
                    <div class="flex gap-2 justify-end mb-1">
                        <div class="bg-vmax-cyan text-vmax-dark px-4 py-2 rounded-2xl rounded-tr-sm text-sm font-medium border border-vmax-cyan/20 max-w-[85%] shadow-sm">
                            ${safeMsg}
                        </div>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', userMsgHTML);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                chatInput.value = '';

                // Bot reply
                setTimeout(() => {
                    const botMsgHTML = `
                        <div class="flex gap-2 mb-1">
                            <div class="w-8 h-8 rounded-full bg-vmax-gray flex items-center justify-center shrink-0 border border-white/5">
                                <i class="fa-solid fa-robot text-vmax-cyan text-xs"></i>
                            </div>
                            <div class="bg-vmax-gray/80 px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-gray-200 border border-white/5 max-w-[85%]">
                                Thanks for your message! Our team will get back to you here shortly. Stay connected!
                            </div>
                        </div>
                    `;
                    chatMessages.insertAdjacentHTML('beforeend', botMsgHTML);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1200);
            }
        });
    }

    // --- Global Auth State Handling for Navbar ---
    function initAuthHandling() {
        if (typeof auth !== 'undefined') {
            auth.onAuthStateChanged(async (user) => {
                const loginLinks = document.querySelectorAll('.nav-auth-link, a[href="login.html"]');

                if (user) {
                    // Logged in
                    let displayName = user.displayName;

                    // Fetch full name from Firestore
                    if (typeof db !== 'undefined') {
                        try {
                            const userDoc = await db.collection("users").doc(user.uid).get();
                            if (userDoc.exists && userDoc.data().fullName) {
                                displayName = userDoc.data().fullName;
                            }
                        } catch (e) {
                            console.error("Could not fetch user profile:", e);
                        }
                    }

                    if (!displayName) {
                        displayName = user.email ? user.email.split('@')[0] : "User";
                    }
                    const shortName = displayName.split(' ')[0];

                    loginLinks.forEach(link => {
                        // Initial state: Only Name/Icon
                        link.innerHTML = `<i class="fa-solid fa-user-circle mr-2"></i>${shortName}`;
                        link.href = "javascript:void(0)";
                        link.dataset.confirmLogout = "false";

                        link.onclick = (e) => {
                            e.preventDefault();
                            if (link.dataset.confirmLogout === "true") {
                                auth.signOut().then(() => { window.location.reload(); });
                            } else {
                                // Change to "Log Out" on first click
                                link.innerHTML = `<i class="fa-solid fa-right-from-bracket mr-2 text-rose-500"></i>Log Out`;
                                link.dataset.confirmLogout = "true";
                                // Reset back after 3 seconds
                                setTimeout(() => {
                                    if (link.dataset.confirmLogout === "true") {
                                        link.innerHTML = `<i class="fa-solid fa-user-circle mr-2"></i>${shortName}`;
                                        link.dataset.confirmLogout = "false";
                                    }
                                }, 3000);
                            }
                        };
                    });

                    // Update Bottom Nav Account text
                    const navAccountText = document.getElementById('nav-account-text');
                    const navAccountLink = document.getElementById('nav-account-link');
                    const navAccountIcon = navAccountLink ? navAccountLink.querySelector('i') : null;

                    if (navAccountText && navAccountLink) {
                        navAccountText.innerText = shortName;
                        if (navAccountIcon) navAccountIcon.className = 'fa-solid fa-user-check text-xl mb-0.5 text-vmax-cyan';
                        navAccountLink.dataset.confirmLogout = "false";

                        navAccountLink.onclick = (e) => {
                            e.preventDefault();
                            if (navAccountLink.dataset.confirmLogout === "true") {
                                auth.signOut().then(() => { window.location.reload(); });
                            } else {
                                navAccountText.innerText = 'Log Out';
                                navAccountText.classList.add('text-rose-500');
                                if (navAccountIcon) navAccountIcon.className = 'fa-solid fa-right-from-bracket text-xl mb-0.5 text-rose-500';
                                navAccountLink.dataset.confirmLogout = "true";

                                setTimeout(() => {
                                    if (navAccountLink.dataset.confirmLogout === "true") {
                                        navAccountText.innerText = shortName;
                                        navAccountText.classList.remove('text-rose-500');
                                        if (navAccountIcon) navAccountIcon.className = 'fa-solid fa-user-check text-xl mb-0.5 text-vmax-cyan';
                                        navAccountLink.dataset.confirmLogout = "false";
                                    }
                                }, 3000);
                            }
                        };
                    }
                } else {
                    // Logged out - restore Log In links
                    loginLinks.forEach(link => {
                        link.innerHTML = `<i class="fa-solid fa-user-circle mr-2 text-lg"></i>Log In`;
                        link.href = "login.html";
                        link.onclick = null;
                        delete link.dataset.confirmLogout;
                    });

                    const navAccountText = document.getElementById('nav-account-text');
                    const navAccountLink = document.getElementById('nav-account-link');
                    const navAccountIcon = navAccountLink ? navAccountLink.querySelector('i') : null;

                    if (navAccountText && navAccountLink) {
                        navAccountText.innerText = 'Account';
                        navAccountText.classList.remove('text-rose-500');
                        if (navAccountIcon) navAccountIcon.className = 'fa-solid fa-user text-xl mb-0.5';
                        navAccountLink.onclick = null;
                        delete navAccountLink.dataset.confirmLogout;
                    }
                }
            });
        } else {
            // Retry if auth is not yet available
            setTimeout(initAuthHandling, 200);
        }
    }

    initAuthHandling();

});
