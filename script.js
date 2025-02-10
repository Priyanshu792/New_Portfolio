// Optimize performance with debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll behavior
const scrollToElement = (elementSelector, instance = 0) => {
    const element = document.querySelectorAll(elementSelector)[instance];
    if (!element) return;
    
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

// Add performance monitoring
const perfData = window.performance.timing;
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
console.log(`Page load time: ${pageLoadTime}ms`);

// Optimize image loading
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
};

// Optimize typing animation
const textLoad = () => {
    const secText = document.querySelector(".sec-text");
    const words = ["Software Engineer", "CG Artist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typing = () => {
        const currentWord = words[wordIndex];

        // Set color based on current word; use theme's neon magenta for Software Engineer
        if (currentWord === "Software Engineer") {
            secText.style.color = "#ff00ff";
        } else if (currentWord === "CG Artist") {
            secText.style.color = "yellow";
        }

        if (isDeleting) {
            secText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            secText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typing, 2000); // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typing, 500); // Pause before starting new word
        } else {
            setTimeout(typing, isDeleting ? 50 : 100); // Typing speed
        }
    };

    typing();
};

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
document.body.appendChild(progressBar);

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
});

// Fix scroll performance
function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
}

// Loading Animation
const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="loader-content"></div>';
document.body.appendChild(loader);

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Scroll-triggered animations
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Remove observer after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Page Transition Effect
const createPageTransition = () => {
    const transition = document.createElement('div');
    transition.classList.add('page-transition');
    document.body.appendChild(transition);

    document.querySelectorAll('a').forEach(link => {
        if (link.href !== window.location.href && !link.href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                transition.style.transform = 'translateY(0)';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            });
        }
    });
};

createPageTransition();

// Page Transition Handler
const pageTransition = document.querySelector('.page-transition');

function handlePageTransition() {
    // On page load
    pageTransition.classList.add('active');
    setTimeout(() => {
        pageTransition.classList.remove('active');
    }, 500);

    // On page navigation
    document.querySelectorAll('a').forEach(link => {
        if (link.href !== window.location.href && !link.href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                pageTransition.classList.add('active');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            });
        }
    });
}

// Optimize animation frame rate
const optimizeAnimations = () => {
    document.querySelectorAll('.image-strip').forEach(strip => {
        strip.style.willChange = 'transform';
    });
};

// Fix video background error handling
function setupVideoBackground() {
    const videoElement = document.getElementById('background-video');
    if (!videoElement) return; // Add null check

    const videos = [
        'images/Videos/video_1.mp4',
        'images/Videos/video_2.mp4'
    ];
    let currentVideoIndex = 0;

    function playNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        videoElement.src = videos[currentVideoIndex];
        videoElement.play().catch(error => {
            console.warn("Video autoplay failed:", error);
            // Fallback: mute video and try again
            videoElement.muted = true;
            videoElement.play().catch(console.error);
        });
    }

    videoElement.addEventListener('ended', playNextVideo);
}

// Add navbar background on scroll
function handleNavBackground() {
    const nav = document.querySelector('.main-nav');
    const scrollTrigger = window.innerHeight * 0.8; // 80% of viewport height

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTrigger) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Fix smooth scroll function
function smoothScroll(target, duration) {
    const targetSection = document.querySelector(target);
    if (!targetSection) return;
    
    const navHeight = document.querySelector('.main-nav').offsetHeight;
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo({
            top: run,
            behavior: 'instant'
        });
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add active state to nav links
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scroll = window.pageYOffset;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add scroll event listener for active nav state
window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// Add event listeners to nav links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 800);
        });
    });
});

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Defer non-critical operations
    setTimeout(() => {
        // Initialize animations
        initAnimations();
        // Load remaining images
        lazyLoadImages();
    }, 100);
    textLoad();
    optimizeAnimations();
    handlePageTransition();
    setupVideoBackground();
    handleNavBackground();
    // Add event listeners
    document.querySelector('.nav-links').addEventListener('click', debounce((e) => {
        const link = e.target.closest('.link');
        if (!link) return;
        
        const id = link.id;
        switch(id) {
            case 'link1': scrollToElement('.features'); break;
            case 'link2': scrollToElement('.pricing'); break;
            case 'link3': scrollToElement('footer'); break;
        }
    }, 250));
    
    // Remove loader after content is ready
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Fullscreen Gallery functionality
const initializeGallery = () => {
    const modal = document.getElementById('mediaModal');
    const modalContainer = modal.querySelector('.modal-media-container');
    const closeBtn = modal.querySelector('.close-modal');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    // Fix modal navigation
    function showMedia(index) {
        const item = galleryItems[index];
        if (!item) return; // Add check for valid index
        
        const isVideo = item.querySelector('video');
        modalContainer.innerHTML = '';

        if (isVideo) {
            const video = isVideo.cloneNode(true);
            video.controls = true;
            modalContainer.appendChild(video);
        } else {
            const img = item.querySelector('img');
            if (img) {
                const clone = img.cloneNode(true);
                modalContainer.appendChild(clone);
            }
        }
        currentIndex = index;
    }

    function nextMedia() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showMedia(currentIndex);
    }

    function prevMedia() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showMedia(currentIndex);
    }

    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            showMedia(index);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevBtn.addEventListener('click', prevMedia);
    nextBtn.addEventListener('click', nextMedia);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') modal.style.display = 'none';
            if (e.key === 'ArrowLeft') prevMedia();
            if (e.key === 'ArrowRight') nextMedia();
        }
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
};

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);