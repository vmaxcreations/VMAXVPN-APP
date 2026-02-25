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
    const chatWidgetHTML = `
    <!-- Floating Action Buttons -->
    <div class="fixed bottom-24 right-4 lg:bottom-10 lg:right-10 z-[100] flex items-center gap-3 md:gap-4 flex-col lg:flex-row">
        <!-- Telegram Button -->
        <a href="https://t.me/VMAXV2RAYZONE" target="_blank" class="w-12 h-12 bg-[#0088cc] rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-300" title="Contact on Telegram">
            <i class="fa-brands fa-telegram"></i>
        </a>

        <!-- WhatsApp Button -->
        <a href="https://wa.me/94703851990" target="_blank" class="w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-300" title="Contact on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        <!-- Floating Chat Button -->
        <button id="chat-toggle-btn" class="w-14 h-14 bg-gradient-to-r from-vmax-cyan to-vmax-blue rounded-full shadow-neon flex items-center justify-center text-vmax-dark text-2xl hover:scale-110 transition-transform duration-300" title="Open Live Chat">
            <i class="fa-solid fa-comment-dots"></i>
        </button>
    </div>

    <!-- Chat Window -->
    <div id="chat-window" class="fixed bottom-40 right-4 lg:bottom-28 lg:right-10 w-[calc(100vw-2rem)] max-w-sm sm:w-80 glass-glow border border-vmax-cyan/30 rounded-2xl shadow-[0_0_30px_rgba(0,242,254,0.2)] z-[100] flex flex-col hidden overflow-hidden transition-all duration-300 transform origin-bottom-right">
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
    document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

    // --- Mobile Bottom Navigation ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const bottomNavHTML = `
    <!-- Mobile Bottom Nav -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 glass backdrop-blur-xl border-t border-white/10 z-[90] pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div class="flex justify-around items-center px-2 py-3">
            <a href="index.html" class="flex flex-col items-center gap-1 ${currentPage === 'index.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-colors w-[20%]">
                <i class="fa-solid fa-house text-xl mb-1"></i>
                <span class="text-[10px] font-medium tracking-wide">Home</span>
            </a>
            <a href="pricing.html" class="flex flex-col items-center gap-1 ${currentPage === 'pricing.html' || currentPage === 'features.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-colors w-[20%]">
                <i class="fa-solid fa-crown text-xl mb-1"></i>
                <span class="text-[10px] font-medium tracking-wide">Packages</span>
            </a>
            <!-- Connect Button (Center Floating) -->
            <a href="pricing.html" class="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-vmax-cyan to-vmax-blue text-vmax-dark shadow-neon transform -translate-y-6 border-4 border-vmax-dark relative w-[20%] active:scale-95 transition-transform">
                <i class="fa-solid fa-power-off text-2xl font-black"></i>
            </a>
            <a href="contact.html" class="flex flex-col items-center gap-1 ${currentPage === 'contact.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-colors w-[20%]">
                <i class="fa-solid fa-headset text-xl mb-1"></i>
                <span class="text-[10px] font-medium tracking-wide">Support</span>
            </a>
            <a href="login.html" class="flex flex-col items-center gap-1 ${currentPage === 'login.html' ? 'text-vmax-cyan' : 'text-gray-400 hover:text-white'} transition-colors w-[20%]" id="nav-account-link">
                <i class="fa-solid fa-user text-xl mb-1"></i>
                <span class="text-[10px] font-medium tracking-wide" id="nav-account-text">Account</span>
            </a>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat visibility
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    chatCloseBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // Handle sending message
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msgText = chatInput.value.trim();
        if (!msgText) return;

        // Escape HTML
        const safeMsg = msgText.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // Display user message
        const userMsgHTML = `
            <div class="flex gap-2 justify-end mb-1">
                <div class="bg-gradient-to-r from-vmax-cyan/20 to-vmax-blue/20 px-4 py-2 rounded-2xl rounded-tr-sm text-sm text-white border border-vmax-cyan/30 max-w-[85%]">
                    ${safeMsg}
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', userMsgHTML);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Display Agent typing indicator (optional delay)
        setTimeout(() => {
            const botReplyHTML = `
                <div class="flex gap-2 animate-pulse-glow">
                    <div class="w-8 h-8 rounded-full bg-vmax-gray flex items-center justify-center shrink-0 border border-white/5">
                        <i class="fa-solid fa-user-tie text-vmax-cyan text-xs"></i>
                    </div>
                    <div class="bg-vmax-cyan/10 px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-white border border-vmax-cyan/20 max-w-[85%]">
                        Thank you for your message! One of our agents will review your request and reply to you here shortly. If you need immediate assistance, feel free to use the WhatsApp or Telegram buttons!
                    </div>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', botReplyHTML);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1200);
    });

    // --- Global Auth State Handling for Navbar ---
    // Wait a brief moment to ensure firebase-config.js has initialized 'auth' if it exists on the page
    setTimeout(() => {
        if (typeof auth !== 'undefined') {
            auth.onAuthStateChanged(async (user) => {
                const loginLinks = document.querySelectorAll('a[href="login.html"]');

                if (user) {
                    // Logged in
                    let displayName = user.displayName;

                    // Fetch full name from Firestore if db is initialized
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
                        if (user.email) {
                            displayName = user.email.split('@')[0];
                        } else if (user.phoneNumber) {
                            displayName = user.phoneNumber;
                        } else {
                            displayName = "User";
                        }
                    }
                    const shortName = displayName.split(' ')[0]; // first part of name

                    loginLinks.forEach(link => {
                        // Keep the original styles but change text and behavior
                        link.innerHTML = `<i class="fa-solid fa-user-check"></i> ${shortName} (Log Out)`;
                        link.href = "#"; // Remove login.html link

                        // Overwrite click event to trigger logout
                        link.onclick = (e) => {
                            e.preventDefault();
                            auth.signOut().then(() => {
                                window.location.reload();
                            });
                        };
                    });
                    // Also update Bottom Nav Account text if on mobile
                    const navAccountText = document.getElementById('nav-account-text');
                    const navAccountLink = document.getElementById('nav-account-link');
                    if (navAccountText && navAccountLink) {
                        navAccountText.innerText = 'Log Out';
                        navAccountLink.classList.add('text-rose-400');
                        navAccountLink.onclick = (e) => {
                            e.preventDefault();
                            auth.signOut().then(() => {
                                window.location.reload();
                            });
                        };
                    }

                } else {
                    // Logged out
                    loginLinks.forEach(link => {
                        link.innerHTML = `Log In`;
                        link.href = "login.html";
                        link.onclick = null; // restore normal link behavior
                    });
                }
            });
        }
    }, 100);

});
