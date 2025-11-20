// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Update aria-expanded attribute for accessibility
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial and activate corresponding dot
    if (testimonialItems[index]) {
        testimonialItems[index].classList.add('active');
    }
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
}

// Initialize testimonial slider if elements exist
if (testimonialDots.length > 0) {
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials
    let currentTestimonial = 0;
    if (testimonialItems.length > 0) {
        const testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
}

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');
const videoThumbnails = document.querySelectorAll('.video-thumbnail');

// Video sources (replace with actual video files)
const videoSources = [
    'videos/Main1.mp4',
    'videos/Main2.mp4',
    'videos/Main3.mp4'
];

// Initialize video modal if elements exist
if (videoThumbnails.length > 0) {
    videoThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            if (modalVideo) {
                // Reset video source
                modalVideo.src = videoSources[index];
                modalVideo.load();
            }
            if (videoModal) {
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Play video when modal opens
                setTimeout(() => {
                    if (modalVideo) modalVideo.play();
                }, 300);
            }
        });
    });
}

// Close modal when clicking the X
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            if (modalVideo) {
                modalVideo.pause(); // Pause video playback
                modalVideo.currentTime = 0; // Reset to beginning
            }
        }
    });
}

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        if (modalVideo) {
            modalVideo.pause(); // Pause video playback
            modalVideo.currentTime = 0; // Reset to beginning
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    }
});

// Add floating elements animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Set random initial positions and animations
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        const randomDelay = Math.random() * 5;
        const randomDuration = Math.random() * 3 + 5;
        
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Handle scroll actions here
        }, 100);
    }
});

// Add scroll animations for sections
document.addEventListener('DOMContentLoaded', function() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        observer.observe(section);
    });
});

// Add loading state for form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // In a real implementation, you would send the form data to a server
        // For now, we'll simulate a network request
        setTimeout(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Fix for any potential console errors
document.addEventListener('DOMContentLoaded', function() {
    // Check if all required elements exist before initializing features
    console.log('Dark Beats website loaded successfully!');
});