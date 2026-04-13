/**
 * CFM Technologie - Site JavaScript
 * Author: Hermes Agent | Powered by Claude
 * Version: 1.0.0
 * Date: 2024
 */

(function() {
    'use strict';

    // ========================================
    // INITIALIZATION
    // ========================================
    
    document.addEventListener('DOMContentLoaded', function() {
        initLoadingScreen();
        initNavigation();
        initSmoothScroll();
        initScrollAnimations();
        initChatbot();
        initContactForm();
        initCounters();
        initNavbarScroll();
    });

    // ========================================
    // LOADING SCREEN
    // ========================================
    
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        if (!loadingScreen) return;
        
        // Hide loading screen after content is loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 800);
        });
    }

    // ========================================
    // NAVIGATION
    // ========================================
    
    function initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
        
        // Active state on scroll
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        
        if (!navbar) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('navMenu');
                    const hamburger = document.getElementById('hamburger');
                    if (navMenu && hamburger) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        if (!animatedElements.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(function() {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ========================================
    // COUNTERS / STATS ANIMATION
    // ========================================
    
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number, .zone-stat .number');
        
        if (!statNumbers.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasK = text.toLowerCase().includes('k');
        const target = parseInt(text.replace(/\D/g, ''));
        
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            current = Math.floor(easeOutQuart * target);
            
            let displayValue = current.toLocaleString();
            if (hasK) displayValue += 'K';
            if (hasPlus) displayValue += '+';
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text;
            }
        }
        
        requestAnimationFrame(update);
    }

    // ========================================
    // CHATBOT
    // ========================================
    
    function initChatbot() {
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotContainer = document.getElementById('chatbotContainer');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatbotInput = document.getElementById('chatbotInput');
        const chatbotSend = document.getElementById('chatbotSend');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const notificationBadge = document.getElementById('notificationBadge');
        
        if (!chatbotToggle || !chatbotContainer) return;
        
        // Toggle chatbot
        chatbotToggle.addEventListener('click', function() {
            const isActive = chatbotContainer.classList.toggle('active');
            
            if (isActive && notificationBadge) {
                notificationBadge.style.display = 'none';
            }
        });
        
        // Close chatbot
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function() {
                chatbotContainer.classList.remove('active');
            });
        }
        
        // Send message
        function sendMessage(message) {
            if (!message.trim()) return;
            
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            if (chatbotInput) {
                chatbotInput.value = '';
            }
            
            // Show typing indicator
            setTimeout(function() {
                showTypingIndicator();
            }, 300);
            
            // Get bot response
            setTimeout(function() {
                removeTypingIndicator();
                const response = generateResponse(message.toLowerCase());
                addMessage(response, 'bot', true);
            }, 1000);
        }
        
        // Handle submit
        if (chatbotSend && chatbotInput) {
            chatbotSend.addEventListener('click', function() {
                sendMessage(chatbotInput.value);
            });
            
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage(chatbotInput.value);
                }
            });
        }
        
        // Quick replies
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', function() {
                const reply = this.getAttribute('data-reply');
                const replyText = this.textContent;
                
                sendMessage(replyText);
                
                // Remove quick replies after first use
                const quickReplies = document.querySelector('.quick-replies');
                if (quickReplies) {
                    quickReplies.style.display = 'none';
                }
            });
        });
        
        function addMessage(message, sender, isHTML = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (isHTML) {
                contentDiv.innerHTML = message;
            } else {
                contentDiv.innerHTML = `<p>${message}</p>`;
            }
            
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
            
            chatbotMessages.appendChild(messageDiv);
            scrollToBottom();
        }
        
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.id = 'typingIndicator';
            
            typingDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p><i class="fas fa-circle" style="font-size: 8px; animation: bounce 1.4s ease-in-out infinite both;"></i>
                    <i class="fas fa-circle" style="font-size: 8px; animation: bounce 1.4s ease-in-out infinite both; animation-delay: 0.2s;"></i>
                    <i class="fas fa-circle" style="font-size: 8px; animation: bounce 1.4s ease-in-out infinite both; animation-delay: 0.4s;"></i></p>
                </div>
            `;
            
            chatbotMessages.appendChild(typingDiv);
            scrollToBottom();
        }
        
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
        
        function scrollToBottom() {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
 function generateResponse(message) {
 const responses = {
 'devis': `✅ <strong>Demande de devis</strong><br><br>Pour recevoir votre devis gratuit, merci de préciser :<br>• Type de pièce/outillage<br>• Quantité souhaitée<br>• Matériau (si connu)<br>• Plans/dessins disponibles<br><br>Vous pouvez aussi remplir le <a href="#contact">formulaire de contact</a><br>Appelez directement :<br>📞 <a href="tel:+212522674628">0522 67 46 28</a> (Standard)<br>📞 <a href="tel:+212665407110">0665 40 71 10</a> (Mohamed) or <a href="tel:+212667773949">0667 77 39 49</a> (Hamid)`,

 'services': `⚙️ <strong>Nos Services</strong><br><br>1. <strong>Conception d'outillage</strong><br>Moules, matrices, gabarits<br><br>2. <strong>Fabrication mécanique</strong><br>Usinage CNC 3 axes, tournage, fraisage<br><br>3. <strong>Sous-traitance industrielle</strong><br>Production en série<br><br><a href="#services">Voir tous nos services</a>`,

 'equipements': `🔧 <strong>Notre Parc Machines</strong><br><br><strong>CNC:</strong><br>• HURON 1050×560×560<br>• AKEIRA SEKI 1100×560×560<br>• CINCINNATI 500×500×500<br>• MIKRON FW20 500×350×300<br>• Découpe fil 450×350<br><br><strong>Bureau d'étude:</strong><br>• SOLIDWORKS (licence)<br>• MASTERCAM (licence)<br><br><a href="#equipements">Voir tous nos équipements</a>`,

 'machines': `🔧 <strong>Notre Parc Machines</strong><br><br><strong>CNC:</strong><br>• HURON 1050×560×560<br>• AKEIRA SEKI 1100×560×560<br>• CINCINNATI 500×500×500<br>• MIKRON FW20 500×350×300<br>• Découpe fil 450×350<br><br><strong>Bureau d'étude:</strong><br>• SOLIDWORKS (licence)<br>• MASTERCAM (licence)<br><br><a href="#equipements">Voir tous nos équipements</a>`,

 'references': `🏆 <strong>Nos Références</strong><br><br>• Groupe SAFRAN<br>• RATP DEV Casablanca<br>• AKZO NOBEL<br>• DEGREMONT (LYDEC)<br>• ACAM STELIA<br>• ANIMAC (HONEYWELL)<br>• SAM Aéronautique<br>• SOTHEMA, MAPHAR<br>• AFRILUB / SALUB (AKWA)<br>• Et bien d'autres...<br><br><a href="#references">Voir toutes nos références</a>`,

 'contact': `📞 <strong>Contactez-nous</strong><br><br><strong>Standard :</strong> <a href="tel:+212522674628">+212 522 67 46 28</a><br><strong>Fax :</strong> +212 522 66 16 22<br><strong>Email :</strong> <a href="mailto:houdaigui@gmail.com">houdaigui@gmail.com</a><br><br><strong>Site Aïn Sebâa :</strong><br>KM 11.5, Bd Chefchaouni, ZI Béausite<br><br><strong>Site Moulay Rachid :</strong><br>32 Av Mohamed Erradi, ZI Moulay Rachid<br><br><strong>Contacts directs :</strong><br>👔 Mohamed EL HOUDAIGUI : <a href="tel:+212665407110">0665 40 71 10</a><br>🔧 Hamid EL MAHDI : <a href="tel:+212667773949">0667 77 39 49</a><br><br><a href="#contact">Envoyer un message →</a>`,

 'telephone': `📞 <strong>Nos Téléphones</strong><br><br><strong>Standard :</strong> <a href="tel:+212522674628">+212 522 67 46 28</a><br><strong>Fax :</strong> +212 522 66 16 22<br><br><strong>Mohamed EL HOUDAIGUI</strong> (Gérant)<br>📱 <a href="tel:+212665407110">+212 665 40 71 10</a><br><strong>Hamid EL MAHDI</strong> (Responsable Technique)<br>📱 <a href="tel:+212667773949">+212 667 77 39 49</a>`,

 'horaires': `🕐 <strong>Nos Horaires</strong><br><br><strong>Lundi - Vendredi :</strong> 8h00 - 18h00<br><strong>Samedi :</strong> 8h00 - 12h00<br><strong>Dimanche :</strong> Fermé<br><br>Zone Industrielle Aïn Sebâa & Moulay Rachid, Casablanca`,

 'adresse': `📍 <strong>Nos Sites</strong><br><br><strong>Site Aïn Sebâa :</strong><br>KM 11.5, Boulevard Chefchaouni<br>Zone Industrielle Béausite<br>Casablanca 20100<br><br><strong>Site Moulay Rachid :</strong><br>32 Avenue Mohamed Erradi<br>Zone Industrielle Moulay Rachid<br>Casablanca 20250`,

 'bonjour': `👋 Bonjour ! Je suis l'assistant virtuel de <strong>CFM Technologie</strong>.<br><br>Comment puis-je vous aider aujourd'hui ?`,

 'merci': `🙏 Je vous en prie !<br><br>N'hésitez pas si vous avez d'autres questions ou si vous souhaitez un devis personnalisé.`,

 'ville': `📍 Nous sommes situés à <strong>Casablanca</strong>, avec deux sites industriels :<br><br>1. <strong>Zone Industrielle Béausite</strong> (Aïn Sebâa)<br>2. <strong>Zone Industrielle Moulay Rachid</strong>`,

 'experience': `🏆 <strong>Notre Expérience</strong><br><br>Depuis <strong>2008</strong>, CFM Technologie met son expertise au service de l'industrie marocaine.<br><br>• 17 ans d'expérience<br>• 10-12 collaborateurs qualifiés<br>• 2 sites industriels<br>• Bureau d'étude SOLIDWORKS<br>• Machines CNC performantes`,

 'secteurs': `🏭 <strong>Secteurs desservis</strong><br><br>• Aéronautique (SAFRAN, ACAM, SAM...)<br>• Automobile<br>• Agroalimentaire<br>• Pharmaceutique (SOTHEMA, MAPHAR)<br>• Pétrochimie (AKZO NOBEL, AFRILUB...)<br>• Électrique<br>• Plastique`,

 'solidworks': `💻 <strong>Bureau d'Étude</strong><br><br>Nous utilisons <strong>SOLIDWORKS</strong> sous licence officielle pour la conception 3D de vos outillages et pièces mécaniques.<br><br>De plus, <strong>MASTERCAM</strong> pour la programmation de nos machines CNC.`,

 'cnc': `🔧 <strong>Machines CNC</strong><br><br>• HURON : 1050×560×560 mm<br>• AKEIRA SEKI : 1100×560×560 mm<br>• CINCINNATI : 500×500×500 mm<br>• MIKRON FW20 : 500×350×300 mm<br>• Découpe à fil : 450×350 mm (épaisseur 0,2mm)<br><br><a href="#equipements">Voir tous nos équipements</a>`
 };
            
            // Check for keywords
            for (let key in responses) {
                if (message.includes(key)) {
                    return responses[key];
                }
            }
            
            // Default response
            return `💬 Merci pour votre message !<br><br>Je suis là pour répondre à vos questions sur :<br>• Nos services de mécanique de précision<br>• Demande de devis<br>• Nos coordonnées<br>• Notre zone industrielle<br><br><strong>Parlez-moi de votre projet !</strong>`;
        }
    }

    // ========================================
    // CONTACT FORM
    // ========================================
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['nom', 'email', 'telephone', 'message'];
            let isValid = true;
            let firstInvalid = null;
            
            requiredFields.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    if (!firstInvalid) firstInvalid = input;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                showNotification('Veuillez remplir tous les champs obligatoires', 'error');
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const emailInput = form.querySelector('[name="email"]');
                emailInput.style.borderColor = '#ef4444';
                showNotification('Veuillez entrer une adresse email valide', 'error');
                emailInput.focus();
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate form submission (to be replaced with actual API call)
            setTimeout(function() {
                showNotification('Merci ! Votre message a été envoyé avec succès. Nous vous contacterons sous 24h.', 'success');
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Clear error states on input
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 0.75rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: auto;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(function() {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Add intersection observer polyfill support
    if (!window.IntersectionObserver) {
        window.IntersectionObserver = function(callback) {
            this.observe = function() {};
            this.unobserve = function() {};
        };
        
        // Trigger all animations immediately
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
    }
    
    // Add CSS animations keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

})();
