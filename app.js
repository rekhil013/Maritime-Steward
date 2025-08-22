// Maritime Steward - Ultra Premium Interactive Experience

class MaritimeSteward {
    constructor() {
        this.init();
        this.bindEvents();
        this.initScrollEffects();
        this.initServiceCards();
    }

    init() {
        // Set initial states
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navbar = document.querySelector('.navbar');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.consultationButtons = document.querySelectorAll('.consultation-btn, .tier .btn');
        this.learnMoreBtn = document.querySelector('.learn-more-btn');
        
        // Mobile navigation state
        this.isMobileNavOpen = false;
        
        // Scroll position tracking
        this.lastScrollTop = 0;
        
        // Service card details state
        this.expandedCard = null;
    }

    bindEvents() {
        // Mobile navigation toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileNav());
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Consultation button interactions
        this.consultationButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleConsultationClick(btn));
        });

        // Learn more button
        if (this.learnMoreBtn) {
            this.learnMoreBtn.addEventListener('click', () => this.scrollToServices());
        }

        // Window scroll events
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Window resize events
        window.addEventListener('resize', () => this.handleResize());

        // Service card interactions
        this.serviceCards.forEach((card, index) => {
            card.addEventListener('click', () => this.toggleServiceCard(card, index));
            card.addEventListener('mouseenter', () => this.highlightServiceCard(card));
            card.addEventListener('mouseleave', () => this.unhighlightServiceCard(card));
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMobileNav() {
        this.isMobileNavOpen = !this.isMobileNavOpen;
        
        if (this.isMobileNavOpen) {
            this.navMenu.style.display = 'flex';
            this.navMenu.style.flexDirection = 'column';
            this.navMenu.style.position = 'absolute';
            this.navMenu.style.top = '100%';
            this.navMenu.style.left = '0';
            this.navMenu.style.right = '0';
            this.navMenu.style.background = 'rgba(11, 20, 38, 0.98)';
            this.navMenu.style.backdropFilter = 'blur(20px)';
            this.navMenu.style.padding = '20px';
            this.navMenu.style.gap = '16px';
            this.navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            this.navToggle.classList.add('active');
        } else {
            this.navMenu.style.display = '';
            this.navMenu.style.flexDirection = '';
            this.navMenu.style.position = '';
            this.navMenu.style.top = '';
            this.navMenu.style.left = '';
            this.navMenu.style.right = '';
            this.navMenu.style.background = '';
            this.navMenu.style.backdropFilter = '';
            this.navMenu.style.padding = '';
            this.navMenu.style.gap = '';
            this.navMenu.style.borderTop = '';
            this.navToggle.classList.remove('active');
        }
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            this.smoothScrollTo(targetSection);
            
            // Close mobile nav if open
            if (this.isMobileNavOpen) {
                this.toggleMobileNav();
            }
        }
    }

    smoothScrollTo(element) {
        const navbarHeight = this.navbar.offsetHeight;
        const targetPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    scrollToServices() {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            this.smoothScrollTo(servicesSection);
        }
    }

    handleConsultationClick(button) {
        const buttonText = button.textContent.trim();
        
        // Add click effect
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Simulate consultation booking (in a real app, this would integrate with a booking system)
        this.showConsultationDialog(buttonText);
    }

    showConsultationDialog(consultationType) {
        // Clean up the consultation type to avoid duplication
        let dialogTitle = consultationType;
        if (consultationType.toLowerCase().includes('premium')) {
            dialogTitle = consultationType;
        } else {
            dialogTitle = `Premium ${consultationType}`;
        }
        
        // Create and show a premium consultation dialog
        const dialog = document.createElement('div');
        dialog.className = 'consultation-dialog';
        dialog.innerHTML = `
            <div class="dialog-overlay"></div>
            <div class="dialog-content">
                <div class="dialog-header">
                    <h3>${dialogTitle}</h3>
                    <button class="dialog-close">&times;</button>
                </div>
                <div class="dialog-body">
                    <p>Experience Maritime Steward's collaborative excellence with our team of maritime experts.</p>
                    <div class="consultation-features">
                        <div class="feature">
                            <strong>24-Hour Response Guarantee</strong>
                            <p>Immediate acknowledgment and priority handling</p>
                        </div>
                        <div class="feature">
                            <strong>Global Expertise</strong>
                            <p>Worldwide maritime knowledge and local presence</p>
                        </div>
                        <div class="feature">
                            <strong>Collaborative Approach</strong>
                            <p>Team-based solutions leveraging diverse expertise</p>
                        </div>
                    </div>
                    <div class="dialog-actions">
                        <button class="btn btn--primary schedule-btn">Schedule Consultation</button>
                        <button class="btn btn--outline cancel-btn">Learn More</button>
                    </div>
                </div>
            </div>
        `;

        // Add dialog styles
        const dialogStyles = `
            .consultation-dialog {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .dialog-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(11, 20, 38, 0.8);
                backdrop-filter: blur(10px);
            }
            
            .dialog-content {
                position: relative;
                background: var(--color-surface);
                border-radius: 12px;
                border: 1px solid var(--color-card-border);
                max-width: 500px;
                width: 100%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: dialogAppear 0.3s ease-out;
            }
            
            @keyframes dialogAppear {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            .dialog-header {
                padding: 24px 24px 16px;
                border-bottom: 1px solid var(--color-card-border);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .dialog-header h3 {
                margin: 0;
                color: var(--color-text);
                font-size: 20px;
            }
            
            .dialog-close {
                background: none;
                border: none;
                font-size: 24px;
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .dialog-close:hover {
                background: var(--color-secondary);
            }
            
            .dialog-body {
                padding: 24px;
            }
            
            .dialog-body > p {
                margin-bottom: 24px;
                color: var(--color-text-secondary);
                line-height: 1.5;
            }
            
            .consultation-features {
                margin-bottom: 24px;
            }
            
            .feature {
                margin-bottom: 16px;
                padding: 12px;
                background: var(--color-bg-1);
                border-radius: 8px;
            }
            
            .feature strong {
                color: var(--color-text);
                display: block;
                margin-bottom: 4px;
            }
            
            .feature p {
                margin: 0;
                font-size: 14px;
                color: var(--color-text-secondary);
            }
            
            .dialog-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }
        `;

        // Add styles to head
        const styleElement = document.createElement('style');
        styleElement.textContent = dialogStyles;
        document.head.appendChild(styleElement);

        document.body.appendChild(dialog);

        // Bind dialog events
        const closeBtn = dialog.querySelector('.dialog-close');
        const cancelBtn = dialog.querySelector('.cancel-btn');
        const scheduleBtn = dialog.querySelector('.schedule-btn');
        const overlay = dialog.querySelector('.dialog-overlay');

        const closeDialog = () => {
            dialog.remove();
            styleElement.remove();
        };

        closeBtn.addEventListener('click', closeDialog);
        cancelBtn.addEventListener('click', closeDialog);
        overlay.addEventListener('click', closeDialog);

        scheduleBtn.addEventListener('click', () => {
            // In a real application, this would integrate with a booking system
            alert('Thank you for your interest! Our team will contact you within 24 hours to schedule your premium consultation.');
            closeDialog();
        });

        // Close dialog on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeDialog();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background on scroll
        if (scrollTop > 100) {
            this.navbar.style.background = 'rgba(11, 20, 38, 0.98)';
            this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.navbar.style.background = 'rgba(11, 20, 38, 0.95)';
            this.navbar.style.boxShadow = '';
        }

        // Update active nav link
        this.updateActiveNavLink();

        this.lastScrollTop = scrollTop;
    }

    updateActiveNavLink() {
        const sections = ['home', 'philosophy', 'expertise', 'services', 'innovation', 'impact', 'contact'];
        const navbarHeight = this.navbar.offsetHeight;
        
        let activeSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight + 100) {
                    activeSection = sectionId;
                }
            }
        });
        
        // Update nav link styles
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleResize() {
        // Close mobile nav on desktop
        if (window.innerWidth > 768 && this.isMobileNavOpen) {
            this.toggleMobileNav();
        }
    }

    toggleServiceCard(card, index) {
        const details = card.querySelector('.service-details');
        
        if (this.expandedCard === index) {
            // Collapse current card
            details.style.maxHeight = '';
            details.style.opacity = '';
            details.style.marginTop = '';
            card.style.transform = '';
            this.expandedCard = null;
        } else {
            // Collapse previously expanded card
            if (this.expandedCard !== null) {
                const prevCard = this.serviceCards[this.expandedCard];
                const prevDetails = prevCard.querySelector('.service-details');
                prevDetails.style.maxHeight = '';
                prevDetails.style.opacity = '';
                prevDetails.style.marginTop = '';
                prevCard.style.transform = '';
            }
            
            // Expand new card
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.opacity = '1';
            details.style.marginTop = '16px';
            card.style.transform = 'translateY(-4px) scale(1.02)';
            this.expandedCard = index;
        }
    }

    highlightServiceCard(card) {
        if (this.expandedCard === null) {
            card.style.transform = 'translateY(-8px)';
        }
    }

    unhighlightServiceCard(card) {
        const index = Array.from(this.serviceCards).indexOf(card);
        if (this.expandedCard !== index) {
            card.style.transform = '';
        }
    }

    handleOutsideClick(e) {
        // Close mobile nav when clicking outside
        if (this.isMobileNavOpen && !this.navbar.contains(e.target)) {
            this.toggleMobileNav();
        }
    }

    initScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.service-card, .innovation-item, .stat, .tier, .pillar'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    initServiceCards() {
        // Initialize service card details as hidden
        this.serviceCards.forEach(card => {
            const details = card.querySelector('.service-details');
            details.style.maxHeight = '0';
            details.style.opacity = '0';
            details.style.overflow = 'hidden';
            details.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease';
        });
    }
}

// Initialize the Maritime Steward application
document.addEventListener('DOMContentLoaded', () => {
    new MaritimeSteward();
});

// Add CSS for active nav link
const navStyles = `
    .nav-link.active {
        color: var(--color-teal-300) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = navStyles;
document.head.appendChild(styleElement);