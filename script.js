// Main JavaScript for KAZE Coffee Website
document.addEventListener('DOMContentLoaded', function() {
    // ===== Loader Animation =====
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2500);
    }

    // ===== Custom Cursor =====
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Change cursor size on hover
        const hoverElements = document.querySelectorAll('a, button, .menu-item, .service-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
            });
        });
    }

    // ===== Sticky Header =====
    const header = document.getElementById('header');
    const heroSection = document.querySelector('.hero');
    
    function toggleHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass(); // Check on initial load

    // ===== Mobile Menu Toggle =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ===== Active Navigation Links on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Check on initial load

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Parallax Effect =====
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);

    // ===== Reveal Elements on Scroll =====
    const revealElements = document.querySelectorAll('.reveal-text');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Reveal elements visible on initial load

    // ===== Back to Top Button =====
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Menu Filter =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, 50);
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.transform = 'translateY(20px)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== Testimonial Slider =====
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance when user interacts with slider
    const sliderControls = document.querySelector('.slider-controls');
    if (sliderControls) {
        sliderControls.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderControls.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // ===== Form Animation and Validation =====
    const contactForm = document.getElementById('contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Apply floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on page load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            formInputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.parentElement.classList.add('error');
                } else {
                    input.parentElement.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    // Success message
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. We'll get back to you shortly.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }

    // ===== Newsletter Form Animation =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput.value.trim() !== '') {
                // Simulate form submission
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';
                
                setTimeout(() => {
                    this.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <p>Thanks for subscribing!</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }

    // ===== Interactive Menu Items =====
    const menuCards = document.querySelectorAll('.menu-item');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create a custom animation for menu items
            card.style.transform = 'translateY(-10px) scale(1.03)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow)';
        });
    });

    // ===== Interactive Service Cards =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add hover effect with rotating icons
            const icon = card.querySelector('.icon i');
            if (icon) {
                icon.style.transform = 'rotateY(360deg)';
                icon.style.transition = 'transform 0.8s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.icon i');
            if (icon) {
                icon.style.transform = 'rotateY(0)';
            }
        });
    });

    // ===== Scroll-triggered Animations for Sections =====
    const animatedSections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedSections.forEach(section => {
        section.classList.add('section-animate');
        sectionObserver.observe(section);
    });

    // ===== Dynamic Background Effect =====
    // const hero Section = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroSection.style.backgroundPosition = `${50 + x * 10}% ${50 + y * 10}%`;
        });
    }

    // ===== 3D Tilt Effect for Cards =====
    const tiltElements = document.querySelectorAll('.menu-item, .service-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / 15;
            const deltaY = (y - centerY) / 15;
            
            element.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ===== Animated Counter for Service Cards =====
    function animateCounter(element, target, duration) {
        let start = 0;
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            element.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Create stats for the About section
    const aboutSection = document.querySelector('.about-text');
    if (aboutSection) {
        // Add stats to about section
        const statsElement = document.createElement('div');
        statsElement.className = 'about-stats';
        statsElement.innerHTML = `
            <div class="stat-item">
                <span class="stat-count" data-count="5">0</span>
                <span class="stat-label">Years of Excellence</span>
            </div>
            <div class="stat-item">
                <span class="stat-count" data-count="12">0</span>
                <span class="stat-label">Coffee Origins</span>
            </div>
            <div class="stat-item">
                <span class="stat-count" data-count="25000">0</span>
                <span class="stat-label">Happy Customers</span>
            </div>
        `;
        
        // Insert stats before the text link
        const textLink = aboutSection.querySelector('.text-link');
        aboutSection.insertBefore(statsElement, textLink);
        
        // Add styles for the stats
        const style = document.createElement('style');
        style.textContent = `
            .about-stats {
                display: flex;
                justify-content: space-between;
                margin: 30px 0;
            }
            .stat-item {
                text-align: center;
            }
            .stat-count {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--primary);
                display: block;
                font-family: 'Playfair Display', serif;
            }
            .stat-label {
                color: var(--text-light);
                font-size: 0.9rem;
            }
            @media (max-width: 576px) {
                .about-stats {
                    flex-direction: column;
                    gap: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Animate the counters when about section is in view
        const statCounts = document.querySelectorAll('.stat-count');
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                statCounts.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCounter(stat, target, 2000);
                });
                aboutObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }

    // ===== Coffee Cup Animation =====
    // Add a coffee cup that follows the cursor when hovering over the hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Create coffee cup element
        const coffeeCup = document.createElement('div');
        coffeeCup.className = 'floating-cup';
        coffeeCup.innerHTML = `<i class="fas fa-mug-hot"></i>`;
        document.body.appendChild(coffeeCup);
        
        // Add styles
        const cupStyle = document.createElement('style');
        cupStyle.textContent = `
            .floating-cup {
                position: fixed;
                font-size: 2rem;
                color: var(--accent);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 100;
                filter: drop-shadow(0 0 10px rgba(231, 217, 192, 0.7));
                transform: translate(-50%, -50%);
            }
            .hero:hover .floating-cup {
                opacity: 1;
            }
        `;
        document.head.appendChild(cupStyle);
        
        // Move cup with cursor on hero section
        hero.addEventListener('mousemove', (e) => {
            coffeeCup.style.left = e.clientX + 'px';
            coffeeCup.style.top = e.clientY + 'px';
        });
        
        hero.addEventListener('mouseenter', () => {
            coffeeCup.style.opacity = '1';
        });
        
        hero.addEventListener('mouseleave', () => {
            coffeeCup.style.opacity = '0';
        });
    }

    // ===== Add Typing Effect to Hero Heading =====
    const heroHeading = document.querySelector('.hero-content h1');
    
    if (heroHeading) {
        const originalText = heroHeading.textContent;
        heroHeading.textContent = '';
        
        function typeText(text, element, i = 0) {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(() => typeText(text, element, i), 100);
            }
        }
        
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    typeText(originalText, heroHeading);
                }, 500);
                heroObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
});