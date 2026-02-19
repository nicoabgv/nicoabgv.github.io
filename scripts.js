const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

const LANGUAGE_STORAGE_KEY = 'preferredLanguage';
const SUPPORTED_LANGUAGES = ['es', 'en'];
const LANGUAGE_FILES = {
    es: 'locales/es.json',
    en: 'locales/en.json',
};
const CV_FILES = {
    es: 'assets/cv_es.pdf',
    en: 'assets/cv_en.pdf',
};

const translationBindings = {
    common: [
        { selector: '[data-mobile-toggle] .sr-only', key: 'nav.openMenu' },
        { selector: '[data-nav] a[href="#hero"]', attribute: 'aria-label', key: 'nav.brandAria' },
        { selector: '[data-modal-close]', attribute: 'aria-label', key: 'modals.closeAria' },
    ],
    index: [],
    projects: [
        { selector: '[data-nav] a[href="index.html#hero"]', attribute: 'aria-label', key: 'nav.brandAria' },
    ],
};

const translationCache = {};

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    const pageKey = document.body?.dataset.page || 'index';
    const languageToggles = document.querySelectorAll('[data-language-toggle]');
    const cvLinks = document.querySelectorAll('[data-cv-link]');

    const getNestedValue = (object, path) =>
        path.split('.').reduce((accumulator, key) => {
            if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, key)) {
                return accumulator[key];
            }
            return null;
        }, object);

    const missingTranslations = new Set();

    const applyBindings = (groupData, bindings) => {
        if (!groupData || !bindings) return;
        bindings.forEach((binding) => {
            const elements = document.querySelectorAll(binding.selector);
            if (!elements.length) return;
            if (binding.attributes) {
                Object.entries(binding.attributes).forEach(([attribute, keyPath]) => {
                    const value = getNestedValue(groupData, keyPath);
                    if (value == null) {
                        missingTranslations.add(keyPath);
                        return;
                    }
                    elements.forEach((element) => {
                        element.setAttribute(attribute, value);
                    });
                });
                return;
            }
            if (binding.attribute) {
                const value = getNestedValue(groupData, binding.key);
                if (value == null) {
                    missingTranslations.add(binding.key);
                    return;
                }
                elements.forEach((element) => {
                    element.setAttribute(binding.attribute, value);
                });
                return;
            }
            if (!binding.key) return;
            const value = getNestedValue(groupData, binding.key);
            if (value == null) {
                missingTranslations.add(binding.key);
                return;
            }
            elements.forEach((element) => {
                if (binding.type === 'html') {
                    element.innerHTML = value;
                } else if (binding.type === 'text') {
                    element.textContent = value;
                } else {
                    element.textContent = value;
                }
            });
        });
    };

    const setMetaContent = (selector, value) => {
        if (!value) return;
        const meta = document.querySelector(selector);
        if (meta) {
            meta.setAttribute('content', value);
        }
    };

    const updateDocumentLanguage = (langData, lang) => {
        document.documentElement.lang = lang;
        const commonMeta = langData?.common?.meta;
        if (commonMeta?.ogLocale) {
            setMetaContent('meta[property="og:locale"]', commonMeta.ogLocale);
        }
        const pageData = langData?.[pageKey];
        const meta = pageData?.meta;
        if (!meta) return;
        if (meta.title) {
            document.title = meta.title;
        }
        setMetaContent('meta[name="description"]', meta.description);
        setMetaContent('meta[property="og:title"]', meta.ogTitle);
        setMetaContent('meta[property="og:description"]', meta.ogDescription);
        setMetaContent('meta[name="twitter:title"]', meta.twitterTitle);
        setMetaContent('meta[name="twitter:description"]', meta.twitterDescription);
    };

    const updateLanguageControls = (langData, lang) => {
        const ariaLabel = getNestedValue(langData.common, 'language.toggleAria');
        const mobileLabel = getNestedValue(langData.common, 'language.toggleLabel');
        const desktopLabel = getNestedValue(langData.common, 'language.desktopLabel');
        languageToggles.forEach((toggle) => {
            if (ariaLabel) {
                toggle.setAttribute('aria-label', ariaLabel);
            }
            const desktopSpan = toggle.querySelector('[data-language-label]');
            if (desktopSpan && desktopLabel) {
                desktopSpan.textContent = desktopLabel;
            } else if (!desktopSpan && mobileLabel) {
                toggle.textContent = mobileLabel;
            }
            toggle.setAttribute('data-current-language', lang);
        });
    };

    const updateCvLinks = (lang) => {
        const href = CV_FILES[lang] || CV_FILES.es;
        cvLinks.forEach((link) => {
            link.setAttribute('href', href);
        });
    };

    const loadLanguageData = async (lang) => {
        if (translationCache[lang]) {
            return translationCache[lang];
        }
        const file = LANGUAGE_FILES[lang] || LANGUAGE_FILES.es;
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Unable to load translations for ${lang}`);
        }
        const data = await response.json();
        translationCache[lang] = data;
        return data;
    };

    const detectLanguage = () => {
        try {
            const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
            if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
                return stored;
            }
        } catch (error) {
        }
        const navigatorLanguages = Array.isArray(navigator.languages)
            ? navigator.languages
            : [navigator.language];
        const preferred = navigatorLanguages.find((item) => typeof item === 'string' && item.toLowerCase().startsWith('es'));
        return preferred ? 'es' : 'en';
    };

    const applyTranslations = (langData, lang) => {
        missingTranslations.clear();

        // 1. Aplicar bindings estáticos existentes
        applyBindings(langData?.common, translationBindings.common);
        applyBindings(langData?.[pageKey], translationBindings[pageKey]);

        // 2. Descubrimiento automático de elementos con data-i18n
        const allData = { ...langData?.common, ...langData?.[pageKey], ...langData };

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(langData, key);
            if (value != null) {
                el.textContent = value;
            } else {
                missingTranslations.add(key);
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const value = getNestedValue(langData, key);
            if (value != null) {
                el.innerHTML = value;
            } else {
                missingTranslations.add(key);
            }
        });

        // 3. Descubrimiento automático de atributos con data-i18n-attr-*
        document.querySelectorAll('*').forEach(el => {
            if (!el.attributes) return;
            for (let i = 0; i < el.attributes.length; i++) {
                const attr = el.attributes[i];
                if (attr.name.startsWith('data-i18n-attr-')) {
                    const targetAttr = attr.name.slice(15);
                    const key = attr.value;
                    const value = getNestedValue(langData, key);
                    if (value != null) {
                        el.setAttribute(targetAttr, value);
                    } else {
                        missingTranslations.add(key);
                    }
                }
            }
        });

        if (missingTranslations.size) {
            console.warn('Missing translations for keys:', Array.from(missingTranslations));
        }
        updateLanguageControls(langData, lang);
        updateCvLinks(lang);
        updateDocumentLanguage(langData, lang);
    };

    let currentLanguage = detectLanguage();

    const setLanguage = async (lang) => {
        const normalized = SUPPORTED_LANGUAGES.includes(lang) ? lang : 'es';
        const data = await loadLanguageData(normalized);
        applyTranslations(data, normalized);
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
        } catch (error) {
        }
        currentLanguage = normalized;
    };

    const initI18n = async () => {
        try {
            await setLanguage(currentLanguage);
        } catch (error) {
            console.error(error);
        }
        languageToggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const nextLanguage = currentLanguage === 'es' ? 'en' : 'es';
                setLanguage(nextLanguage).catch((error) => console.error(error));
            });
        });
    };

    initI18n().catch((error) => console.error(error));

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
