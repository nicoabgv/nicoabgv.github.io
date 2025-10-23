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
        { selector: '[data-nav] a[href="#about"]', key: 'nav.about' },
        { selector: '[data-nav] a[href="#skills"]', key: 'nav.skills' },
        { selector: '[data-nav] a[href="#projects"]', key: 'nav.projects' },
        { selector: '[data-nav] a[href="#contact"]', key: 'nav.contact' },
        { selector: '[data-locale-element="nav.cv"]', key: 'nav.cv' },
        { selector: '[data-mobile-toggle] .sr-only', key: 'nav.openMenu' },
        { selector: '[data-mobile-toggle]', attribute: 'aria-label', key: 'nav.openMenu' },
        { selector: '[data-nav] a[href="#hero"]', attribute: 'aria-label', key: 'nav.brandAria' },
        { selector: '[data-modal-close]', attribute: 'aria-label', key: 'modals.closeAria' },
        { selector: 'footer p', key: 'footer.copyright', type: 'html' },
        { selector: 'footer a[href="projects.html"]', key: 'footer.caseStudies' },
        { selector: 'footer a[href="https://github.com/nicoabgv"]', key: 'footer.github' },
        { selector: 'footer a[href^="mailto:"]', key: 'footer.contact' },
        { selector: 'strong[data-i18n="stack.fastapi"]', key: 'stack.fastapi' },
        { selector: 'strong[data-i18n="stack.spotifyapi"]', key: 'stack.spotifyapi' },
        { selector: 'strong[data-i18n="stack.oauth"]', key: 'stack.oauth' },
        { selector: 'strong[data-i18n="stack.saas"]', key: 'stack.saas' },
        { selector: 'strong[data-i18n="stack.flaskcelery"]', key: 'stack.flaskcelery' },
    ],
    index: [
        { selector: '#hero p.inline-flex', key: 'hero.taglineHtml', type: 'html' },
        { selector: '#hero h1', key: 'hero.title' },
        { selector: '#hero p.max-w-2xl', key: 'hero.description' },
        { selector: '[data-locale-element="hero.primaryCta"]', key: 'hero.primaryCta' },
        { selector: '[data-locale-element="hero.secondaryCta"]', key: 'hero.secondaryCta' },
        { selector: '#hero .relative p.text-sm.font-medium', key: 'hero.summaryLabel' },
        { selector: '#hero .relative p.text-xl', key: 'hero.summaryTitle' },
        { selector: '#hero .relative ul li:nth-child(1)', key: 'hero.summaryItems.first', type: 'html' },
        { selector: '#hero .relative ul li:nth-child(2)', key: 'hero.summaryItems.second', type: 'html' },
        { selector: '#hero .relative ul li:nth-child(3)', key: 'hero.summaryItems.third', type: 'html' },
        { selector: '[data-live-projects-label]', key: 'hero.live.label' },
        { selector: '[data-live-project-link="mesasya"]', key: 'hero.live.links.mesasya', type: 'html' },
        { selector: '[data-live-project-link="beatlist"]', key: 'hero.live.links.beatlist', type: 'html' },
        { selector: '#about [data-animate]:first-of-type p.text-xs', key: 'about.label' },
        { selector: '#about [data-animate]:first-of-type h2', key: 'about.title' },
        { selector: '#about [data-animate]:first-of-type p:nth-of-type(2)', key: 'about.paragraph1' },
        { selector: '#about [data-animate]:first-of-type p:nth-of-type(3)', key: 'about.paragraph2' },
        { selector: '#about h3.text-sm.font-semibold.uppercase', key: 'about.cardTitle' },
        { selector: '#about dl div:nth-child(1) dt', key: 'about.details.locationLabel' },
        { selector: '#about dl div:nth-child(1) dd', key: 'about.details.locationValue', type: 'html' },
        { selector: '#about dl div:nth-child(2) dt', key: 'about.details.emailLabel' },
        { selector: '#about dl div:nth-child(2) dd', key: 'about.details.emailValue', type: 'html' },
        { selector: '#about dl div:nth-child(3) dt', key: 'about.details.linkedinLabel' },
        { selector: '#about dl div:nth-child(3) dd', key: 'about.details.linkedinValue', type: 'html' },
        { selector: '#about dl div:nth-child(4) dt', key: 'about.details.experienceLabel' },
        { selector: '#about dl div:nth-child(4) dd', key: 'about.details.experienceValue' },
        { selector: '#about .border-dashed p.text-sm.font-semibold', key: 'about.collaborationLabel' },
        { selector: '#about .border-dashed p.mt-3', key: 'about.collaborationText' },
        { selector: '#skills p.text-xs.font-semibold', key: 'skills.label' },
        { selector: '#skills h2', key: 'skills.title' },
        { selector: '#skills article:nth-of-type(1) h3', key: 'skills.cards.backend.title' },
        { selector: '#skills article:nth-of-type(1) p.text-sm', key: 'skills.cards.backend.description' },
        { selector: '#skills article:nth-of-type(1) .flex.flex-wrap span:nth-child(1)', key: 'skills.cards.backend.tags.0' },
        { selector: '#skills article:nth-of-type(1) .flex.flex-wrap span:nth-child(2)', key: 'skills.cards.backend.tags.1' },
        { selector: '#skills article:nth-of-type(1) .flex.flex-wrap span:nth-child(3)', key: 'skills.cards.backend.tags.2' },
        { selector: '#skills article:nth-of-type(1) .flex.flex-wrap span:nth-child(4)', key: 'skills.cards.backend.tags.3' },
        { selector: '#skills article:nth-of-type(2) h3', key: 'skills.cards.frontend.title' },
        { selector: '#skills article:nth-of-type(2) p.text-sm', key: 'skills.cards.frontend.description' },
        { selector: '#skills article:nth-of-type(2) .flex.flex-wrap span:nth-child(1)', key: 'skills.cards.frontend.tags.0' },
        { selector: '#skills article:nth-of-type(2) .flex.flex-wrap span:nth-child(2)', key: 'skills.cards.frontend.tags.1' },
        { selector: '#skills article:nth-of-type(2) .flex.flex-wrap span:nth-child(3)', key: 'skills.cards.frontend.tags.2' },
        { selector: '#skills article:nth-of-type(3) h3', key: 'skills.cards.devops.title' },
        { selector: '#skills article:nth-of-type(3) p.text-sm', key: 'skills.cards.devops.description' },
        { selector: '#skills article:nth-of-type(3) .flex.flex-wrap span:nth-child(1)', key: 'skills.cards.devops.tags.0' },
        { selector: '#skills article:nth-of-type(3) .flex.flex-wrap span:nth-child(2)', key: 'skills.cards.devops.tags.1' },
        { selector: '#skills article:nth-of-type(3) .flex.flex-wrap span:nth-child(3)', key: 'skills.cards.devops.tags.2' },
        { selector: '#skills article:nth-of-type(3) .flex.flex-wrap span:nth-child(4)', key: 'skills.cards.devops.tags.3' },
        { selector: '#skills article:nth-of-type(4) h3', key: 'skills.cards.security.title' },
        { selector: '#skills article:nth-of-type(4) p.text-sm', key: 'skills.cards.security.description' },
        { selector: '#skills article:nth-of-type(4) .flex.flex-wrap span:nth-child(1)', key: 'skills.cards.security.tags.0' },
        { selector: '#skills article:nth-of-type(4) .flex.flex-wrap span:nth-child(2)', key: 'skills.cards.security.tags.1' },
        { selector: '#skills article:nth-of-type(4) .flex.flex-wrap span:nth-child(3)', key: 'skills.cards.security.tags.2' },
        { selector: '#projects p.text-xs.font-semibold', key: 'projects.label' },
        { selector: '#projects h2', key: 'projects.title' },
        { selector: '[data-locale-element="projects.seeAll"]', key: 'projects.seeAll' },
        { selector: '[data-locale-element="projects.mesasya.badge"]', key: 'projects.mesasya.badge' },
        { selector: '#projects article:nth-of-type(1) span.text-xs.uppercase', key: 'projects.mesasya.tech' },
        { selector: '#projects article:nth-of-type(1) h3', key: 'projects.mesasya.title' },
        { selector: '#projects article:nth-of-type(1) p.text-base', key: 'projects.mesasya.description' },
        { selector: '#projects article:nth-of-type(1) ul li:nth-child(1)', key: 'projects.mesasya.bullets.first', type: 'html' },
        { selector: '#projects article:nth-of-type(1) ul li:nth-child(2)', key: 'projects.mesasya.bullets.second', type: 'html' },
        { selector: '#projects article:nth-of-type(1) ul li:nth-child(3)', key: 'projects.mesasya.bullets.third', type: 'html' },
        { selector: '[data-project-direct-link="mesasya"]', key: 'projects.mesasya.directAccess', type: 'html' },
        { selector: '[data-locale-element="projects.trato.badge"]', key: 'projects.trato.badge' },
        { selector: '#projects article:nth-of-type(2) span.text-xs.uppercase', key: 'projects.trato.tech' },
        { selector: '#projects article:nth-of-type(2) h3', key: 'projects.trato.title' },
        { selector: '#projects article:nth-of-type(2) p.text-base', key: 'projects.trato.description' },
        { selector: '#projects article:nth-of-type(2) ul li:nth-child(1)', key: 'projects.trato.bullets.first', type: 'html' },
        { selector: '#projects article:nth-of-type(2) ul li:nth-child(2)', key: 'projects.trato.bullets.second', type: 'html' },
        { selector: '#projects article:nth-of-type(2) ul li:nth-child(3)', key: 'projects.trato.bullets.third', type: 'html' },
        { selector: '[data-project-direct-link="trato"]', key: 'projects.trato.directAccess', type: 'html' },
        { selector: '[data-locale-element="projects.kobra.badge"]', key: 'projects.kobra.badge' },
        { selector: '#projects article:nth-of-type(3) span.text-xs.uppercase', key: 'projects.kobra.tech' },
        { selector: '#projects article:nth-of-type(3) h3', key: 'projects.kobra.title' },
        { selector: '#projects article:nth-of-type(3) p.text-base', key: 'projects.kobra.description' },
        { selector: '#projects article:nth-of-type(3) ul li:nth-child(1)', key: 'projects.kobra.bullets.first', type: 'html' },
        { selector: '#projects article:nth-of-type(3) ul li:nth-child(2)', key: 'projects.kobra.bullets.second', type: 'html' },
        { selector: '#projects article:nth-of-type(3) ul li:nth-child(3)', key: 'projects.kobra.bullets.third', type: 'html' },
        { selector: '[data-locale-element="projects.beatlist.badge"]', key: 'projects.beatlist.badge' },
        { selector: '[data-locale-element="projects.beatlist.approval"]', key: 'projects.beatlist.approval' },
        { selector: '#projects article:nth-of-type(4) span.text-xs.uppercase', key: 'projects.beatlist.tech' },
        { selector: '#projects article:nth-of-type(4) h3', key: 'projects.beatlist.title' },
        { selector: '#projects article:nth-of-type(4) p.text-base', key: 'projects.beatlist.description' },
        { selector: '#projects article:nth-of-type(4) ul li:nth-child(1)', key: 'projects.beatlist.bullets.first', type: 'html' },
        { selector: '#projects article:nth-of-type(4) ul li:nth-child(2)', key: 'projects.beatlist.bullets.second', type: 'html' },
        { selector: '#projects article:nth-of-type(4) ul li:nth-child(3)', key: 'projects.beatlist.bullets.third', type: 'html' },
        { selector: '[data-project-direct-link="beatlist"]', key: 'projects.beatlist.directAccess', type: 'html' },
        { selector: '[data-locale-element="projects.cta"]', key: 'projects.cta' },
        { selector: '[data-locale-element="projects.caseStudy"]', key: 'projects.caseStudy' },
        { selector: '#contact p.text-xs.font-semibold', key: 'contact.label' },
        { selector: '#contact h2', key: 'contact.title' },
        { selector: '#contact p.text-lg', key: 'contact.description' },
        { selector: '#contact .font-medium.text-slate-500', key: 'contact.direct' },
        { selector: '#contact label[for="name"]', key: 'contact.nameLabel' },
        { selector: '#contact input#name', attribute: 'placeholder', key: 'contact.namePlaceholder' },
        { selector: '#contact label[for="email"]', key: 'contact.emailLabel' },
        { selector: '#contact input#email', attribute: 'placeholder', key: 'contact.emailPlaceholder' },
        { selector: '#contact label[for="message"]', key: 'contact.messageLabel' },
        { selector: '#contact textarea#message', attribute: 'placeholder', key: 'contact.messagePlaceholder' },
        { selector: '[data-locale-element="contact.submit"]', key: 'contact.submit' },
        { selector: '#modal-kobra p.text-xs.font-semibold', key: 'modals.kobra.tag' },
        { selector: '#modal-kobra h3', key: 'modals.kobra.title' },
        { selector: '#modal-kobra .mt-6 p:nth-of-type(1)', key: 'modals.kobra.paragraph1', type: 'html' },
        { selector: '#modal-kobra .mt-6 p:nth-of-type(2)', key: 'modals.kobra.paragraph2', type: 'html' },
        { selector: '#modal-kobra .mt-6 ul li:nth-child(1)', key: 'modals.kobra.bullets.first', type: 'html' },
        { selector: '#modal-kobra .mt-6 ul li:nth-child(2)', key: 'modals.kobra.bullets.second', type: 'html' },
        { selector: '#modal-kobra .mt-6 ul li:nth-child(3)', key: 'modals.kobra.bullets.third', type: 'html' },
        { selector: '#modal-kobra .mt-4', key: 'modals.kobra.next' },
        { selector: '#modal-kobra summary', key: 'modals.kobra.diagram' },
        { selector: '#modal-kobra pre', key: 'modals.kobra.diagramContent', type: 'text' },
        { selector: '#modal-trato p.text-xs.font-semibold', key: 'modals.trato.tag' },
        { selector: '#modal-trato h3', key: 'modals.trato.title' },
        { selector: '#modal-trato .mt-6 p:nth-of-type(1)', key: 'modals.trato.paragraph1', type: 'html' },
        { selector: '#modal-trato .mt-6 p:nth-of-type(2)', key: 'modals.trato.paragraph2', type: 'html' },
        { selector: '#modal-trato .mt-6 ul li:nth-child(1)', key: 'modals.trato.bullets.first', type: 'html' },
        { selector: '#modal-trato .mt-6 ul li:nth-child(2)', key: 'modals.trato.bullets.second', type: 'html' },
        { selector: '#modal-trato .mt-6 ul li:nth-child(3)', key: 'modals.trato.bullets.third', type: 'html' },
        { selector: '#modal-trato .mt-4', key: 'modals.trato.next' },
        { selector: '#modal-trato summary', key: 'modals.trato.diagram' },
        { selector: '#modal-trato pre', key: 'modals.trato.diagramContent', type: 'text' },
        { selector: '#modal-beatlist p.text-xs.font-semibold', key: 'modals.beatlist.tag' },
        { selector: '#modal-beatlist h3', key: 'modals.beatlist.title' },
        { selector: '#modal-beatlist .mt-6 p:nth-of-type(1)', key: 'modals.beatlist.paragraph1', type: 'html' },
        { selector: '#modal-beatlist .mt-6 p:nth-of-type(2)', key: 'modals.beatlist.paragraph2', type: 'html' },
        { selector: '#modal-beatlist .mt-6 ul li:nth-child(1)', key: 'modals.beatlist.bullets.first', type: 'html' },
        { selector: '#modal-beatlist .mt-6 ul li:nth-child(2)', key: 'modals.beatlist.bullets.second', type: 'html' },
        { selector: '#modal-beatlist .mt-6 ul li:nth-child(3)', key: 'modals.beatlist.bullets.third', type: 'html' },
        { selector: '#modal-beatlist .mt-4', key: 'modals.beatlist.next' },
        { selector: '#modal-beatlist summary', key: 'modals.beatlist.diagram' },
        { selector: '#modal-beatlist pre', key: 'modals.beatlist.diagramContent', type: 'text' },
        { selector: '#modal-mesaysa p.text-xs.font-semibold', key: 'modals.mesasya.tag' },
        { selector: '#modal-mesaysa h3', key: 'modals.mesaysa.title' },
        { selector: '#modal-mesaysa .mt-6 p:nth-of-type(1)', key: 'modals.mesaysa.paragraph1', type: 'html' },
        { selector: '#modal-mesaysa .mt-6 p:nth-of-type(2)', key: 'modals.mesaysa.paragraph2', type: 'html' },
        { selector: '#modal-mesaysa .mt-6 ul li:nth-child(1)', key: 'modals.mesaysa.bullets.first', type: 'html' },
        { selector: '#modal-mesaysa .mt-6 ul li:nth-child(2)', key: 'modals.mesaysa.bullets.second', type: 'html' },
        { selector: '#modal-mesaysa .mt-6 ul li:nth-child(3)', key: 'modals.mesaysa.bullets.third', type: 'html' },
        { selector: '#modal-mesaysa .mt-4', key: 'modals.mesaysa.next' },
        { selector: '#modal-mesaysa summary', key: 'modals.mesaysa.diagram' },
        { selector: '#modal-mesaysa pre', key: 'modals.mesaysa.diagramContent', type: 'text' },
    ],
    projects: [
        { selector: '[data-nav] a[href="index.html#hero"]', attribute: 'aria-label', key: 'nav.brandAria' },
        { selector: '[data-nav] a[href="index.html#hero"] span.hidden.sm\\:block', key: 'nav.brandName' },
        { selector: '[data-nav] a[href="#mesasya"]', key: 'nav.mesasya' },
        { selector: '[data-nav] a[href="#trato"]', key: 'nav.trato' },
        { selector: '[data-nav] a[href="#kobra"]', key: 'nav.kobra' },
        { selector: '[data-nav] a[href="#beatlist"]', key: 'nav.beatlist' },
        { selector: '[data-nav] a[href="index.html#contact"]', key: 'nav.contact' },
        { selector: 'main .space-y-6 p.text-xs.font-semibold', key: 'hero.label' },
        { selector: 'main .space-y-6 h1', key: 'hero.title' },
        { selector: 'main .space-y-6 p.max-w-3xl', key: 'hero.description' },
        { selector: 'main .rounded-3xl p.text-xs.font-semibold', key: 'hero.indexLabel' },
        { selector: 'main .rounded-3xl ul li:nth-child(1) a', key: 'hero.indexItems.mesasya', type: 'html' },
        { selector: 'main .rounded-3xl ul li:nth-child(2) a', key: 'hero.indexItems.trato', type: 'html' },
        { selector: 'main .rounded-3xl ul li:nth-child(3) a', key: 'hero.indexItems.kobra', type: 'html' },
        { selector: 'main .rounded-3xl ul li:nth-child(4) a', key: 'hero.indexItems.beatlist', type: 'html' },
        { selector: '#mesasya p.text-xs.font-semibold', key: 'mesasya.label' },
        { selector: '#mesasya h2', key: 'mesasya.title' },
        { selector: '#mesasya article p:nth-of-type(1)', key: 'mesasya.paragraph1', type: 'html' },
        { selector: '#mesasya article p:nth-of-type(2)', key: 'mesasya.paragraph2', type: 'html' },
        { selector: '#mesasya h3.text-sm.font-semibold', key: 'mesasya.impact' },
        { selector: '#mesasya article ul li:nth-child(1)', key: 'mesasya.bullets.first', type: 'html' },
        { selector: '#mesasya article ul li:nth-child(2)', key: 'mesasya.bullets.second', type: 'html' },
        { selector: '#mesasya article ul li:nth-child(3)', key: 'mesasya.bullets.third', type: 'html' },
        { selector: '#mesasya aside h3.text-sm.font-semibold', key: 'mesasya.stack' },
        { selector: '#mesasya .rounded-3xl.border-dashed h3', key: 'mesasya.next' },
        { selector: '#mesasya .rounded-3xl.border-dashed p', key: 'mesasya.nextText' },
        { selector: '#mesasya details summary', key: 'mesasya.schema' },
        { selector: '#mesasya details pre', key: 'mesasya.schemaContent', type: 'text' },
        { selector: '#trato p.text-xs.font-semibold', key: 'trato.label' },
        { selector: '#trato h2', key: 'trato.title' },
        { selector: '#trato article p:nth-of-type(1)', key: 'trato.paragraph1', type: 'html' },
        { selector: '#trato article p:nth-of-type(2)', key: 'trato.paragraph2', type: 'html' },
        { selector: '#trato article .rounded-3xl h3', key: 'trato.impact' },
        { selector: '#trato article ul li:nth-child(1)', key: 'trato.bullets.first', type: 'html' },
        { selector: '#trato article ul li:nth-child(2)', key: 'trato.bullets.second', type: 'html' },
        { selector: '#trato article ul li:nth-child(3)', key: 'trato.bullets.third', type: 'html' },
        { selector: '#trato aside .border.border-slate-200 h3', key: 'trato.stack' },
        { selector: '#trato aside .border-dashed h3', key: 'trato.status.title' },
        { selector: '#trato aside .border-dashed p', key: 'trato.status.description' },
        { selector: '#trato details summary', key: 'trato.schema' },
        { selector: '#trato details pre', key: 'trato.schemaContent', type: 'text' },
        { selector: '#kobra p.text-xs.font-semibold', key: 'kobra.label' },
        { selector: '#kobra h2', key: 'kobra.title' },
        { selector: '#kobra article p:nth-of-type(1)', key: 'kobra.paragraph1', type: 'html' },
        { selector: '#kobra article p:nth-of-type(2)', key: 'kobra.paragraph2' },
        { selector: '#kobra h3.text-sm.font-semibold', key: 'kobra.results' },
        { selector: '#kobra article ul li:nth-child(1)', key: 'kobra.bullets.first', type: 'html' },
        { selector: '#kobra article ul li:nth-child(2)', key: 'kobra.bullets.second', type: 'html' },
        { selector: '#kobra article ul li:nth-child(3)', key: 'kobra.bullets.third', type: 'html' },
        { selector: '#kobra aside h3.text-sm.font-semibold', key: 'kobra.stack' },
        { selector: '#kobra .border-dashed h3', key: 'kobra.next' },
        { selector: '#kobra .border-dashed p', key: 'kobra.nextText' },
        { selector: '#kobra details summary', key: 'kobra.schema' },
        { selector: '#kobra details pre', key: 'kobra.schemaContent', type: 'text' },
        { selector: '#beatlist p.text-xs.font-semibold', key: 'beatlist.label' },
        { selector: '#beatlist h2', key: 'beatlist.title' },
        { selector: '[data-locale-element="projects.beatlist.approval"]', key: 'beatlist.approval' },
        { selector: '#beatlist article p:nth-of-type(1)', key: 'beatlist.paragraph1', type: 'html' },
        { selector: '#beatlist article p:nth-of-type(2)', key: 'beatlist.paragraph2', type: 'html' },
        { selector: '#beatlist h3.text-sm.font-semibold', key: 'beatlist.outcomes' },
        { selector: '#beatlist article ul li:nth-child(1)', key: 'beatlist.bullets.first', type: 'html' },
        { selector: '#beatlist article ul li:nth-child(2)', key: 'beatlist.bullets.second', type: 'html' },
        { selector: '#beatlist article ul li:nth-child(3)', key: 'beatlist.bullets.third', type: 'html' },
        { selector: '#beatlist aside h3.text-sm.font-semibold', key: 'beatlist.stack' },
        { selector: '#beatlist aside ul li:nth-child(1)', key: 'beatlist.stackItems.first' },
        { selector: '#beatlist aside ul li:nth-child(2)', key: 'beatlist.stackItems.second' },
        { selector: '#beatlist aside ul li:nth-child(3)', key: 'beatlist.stackItems.third' },
        { selector: '#beatlist aside ul li:nth-child(4)', key: 'beatlist.stackItems.fourth' },
        { selector: '#beatlist .border-dashed h3', key: 'beatlist.next' },
        { selector: '#beatlist .border-dashed p', key: 'beatlist.nextText' },
        { selector: '#beatlist details summary', key: 'beatlist.schema' },
        { selector: '#beatlist details pre', key: 'beatlist.schemaContent', type: 'text' },
        { selector: '[data-direct-access-label]', key: 'directAccess.label' },
        { selector: '[data-direct-access-link="mesasya"]', key: 'directAccess.links.mesasya', type: 'html' },
        { selector: '[data-direct-access-link="trato"]', key: 'directAccess.links.trato', type: 'html' },
        { selector: '[data-direct-access-link="beatlist"]', key: 'directAccess.links.beatlist', type: 'html' },
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
        applyBindings(langData?.common, translationBindings.common);
        applyBindings(langData?.[pageKey], translationBindings[pageKey]);
        applyBindings(langData?.common, translationBindings.common);
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
