document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    const scene = document.getElementById('parallax-scene');
    if (scene) {
        const parallaxInstance = new Parallax(scene, {
            relativeInput: true,
            hoverOnly: false,
        });
    }

    gsap.utils.toArray('.milestone').forEach((milestone) => {
        gsap.fromTo(milestone, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: milestone,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.utils.toArray('.skill-bar').forEach((bar) => {
        const skillLevel = bar.getAttribute('data-level');
        gsap.fromTo(bar, { width: '0%' }, {
            width: skillLevel,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    gsap.from(".highlight", { duration: 1.5, opacity: 0, y: -50, ease: "power2.out", delay: 0.5 });
    gsap.from(".lead", { duration: 1.5, opacity: 0, y: -50, ease: "power2.out", delay: 1 });
    gsap.from(".btn", { duration: 1.5, opacity: 0, scale: 0.8, ease: "bounce.out", delay: 1.5 });
});

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
