const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    const nav = document.querySelector('[data-nav]');
    const updateNav = () => {
        if (!nav) return;
        if (window.scrollY > 16) {
            nav.classList.add('bg-white/90', 'shadow-lg');
        } else {
            nav.classList.remove('bg-white/90', 'shadow-lg');
        }
    };
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', String(!expanded));
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !reduceMotion) {
        gsap.registerPlugin(ScrollTrigger);

        const parallaxLayer = document.querySelector('[data-parallax]');
        if (parallaxLayer) {
            const triggerEl = document.querySelector('#hero') || document.body;
            gsap.to(parallaxLayer, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'top top',
                    scrub: true,
                },
            });
        }

        gsap.utils.toArray('[data-animate]').forEach((element) => {
            gsap.fromTo(
                element,
                { autoAlpha: 0, y: 40 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        });
    }

    const modals = document.querySelectorAll('[data-modal]');
    let activeModal = null;
    let lastFocusedElement = null;

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
        activeModal = modal;

        const focusable = modal.querySelectorAll(focusableSelector);
        const firstFocusable = focusable[0];
        if (firstFocusable) {
            firstFocusable.focus();
        }
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
        activeModal = null;
    };

    const trapFocus = (event) => {
        if (!activeModal || event.key !== 'Tab') return;
        const focusable = activeModal.querySelectorAll(focusableSelector);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            const modalId = trigger.getAttribute('data-modal-target');
            if (modalId) {
                event.preventDefault();
                openModal(modalId);
            }
        });
    });

    modals.forEach((modal) => {
        const overlay = modal.querySelector('[data-modal-overlay]');
        const closeButtons = modal.querySelectorAll('[data-modal-close]');

        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        if (overlay) {
            overlay.addEventListener('click', () => closeModal(modal));
        }

        closeButtons.forEach((button) => {
            button.addEventListener('click', () => closeModal(modal));
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeModal) {
            closeModal(activeModal);
        }
        trapFocus(event);
    });
});
