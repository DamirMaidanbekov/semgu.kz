// Управление интро-видео
const videoOverlay = document.querySelector('.video-overlay');
const introVideo = document.getElementById('intro-video');

// Управление видео-фоном
const heroVideo = document.querySelector('.hero-video');
const heroOverlay = document.querySelector('.hero-overlay');

// Устанавливаем скорость воспроизведения
introVideo.playbackRate = 7.5;

// Обработчик окончания видео
introVideo.addEventListener('ended', () => {
    videoOverlay.classList.add('fade-out');
    
    // Удаляем оверлей после анимации
    setTimeout(() => {
        videoOverlay.remove();
    }, 1000);
});

// Затемнение видео-фона при прокрутке
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    if (scrollPosition > heroHeight * 0.5) {
        heroOverlay.classList.add('darken');
    } else {
        heroOverlay.classList.remove('darken');
    }
});

// Мобильное меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');

burger.addEventListener('click', () => {
    // Переключение навигации
    nav.classList.toggle('active');
    
    // Анимация бургер-меню
    burger.classList.toggle('toggle');
    
    // Анимация ссылок
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Анимация при прокрутке
const sections = document.querySelectorAll('section');
const navHeight = document.querySelector('header').offsetHeight;

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - navHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Подсветка активного пункта меню
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Эффект прозрачности хедера при прокрутке
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Обработка формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить отправку формы на сервер
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Добавляем анимацию для секций
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Добавляем стили для анимации
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .burger.toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .burger.toggle .line2 {
        opacity: 0;
    }
    
    .burger.toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .nav-links a.active {
        color: var(--secondary-color);
    }
`;

document.head.appendChild(style);

// Category Carousel
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.category-slider');
    const slides = document.querySelectorAll('.category-slide');
    
    // Clone slides once for infinite loop
    const slidesArray = Array.from(slides);
    slidesArray.forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    // Handle hover effects
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(50px)';
        });

        slide.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0)';
        });
    });
});

// Rector Section
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.question-modal');
    const openBtn = document.querySelector('.ask-question-btn');
    const closeBtn = document.querySelector('.close-modal');
    const contactItems = document.querySelectorAll('.contact-item[data-copy]');

    // Open modal
    openBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Copy contact information
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show copied notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                notification.textContent = 'Скопировано!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            });
        });
    });

    // Handle form submission
    const form = document.querySelector('.question-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you can add form submission logic
        modal.style.display = 'none';
    });
});

// Header scroll behavior
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for background color change
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 150) {
        // Scrolling down and past the threshold
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

// Faculties Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const schools = document.querySelectorAll('.school');
    const facultiesSection = document.querySelector('.faculties');
    const facultyLogo = document.querySelector('.faculty-logo');
    const facultySpirals = document.querySelector('.faculty-spirals');
    const closeButtons = document.querySelectorAll('.banner-close');
    
    // Function to close all banners
    function closeAllBanners() {
        schools.forEach(school => {
            school.classList.remove('active');
            school.style.zIndex = '1';
            const banner = school.querySelector('.school-banner');
            banner.style.display = 'none';
            banner.style.opacity = '0';
            banner.style.transform = 'scale(0.95)';
        });
        facultyLogo.style.display = 'block';
        facultySpirals.style.display = 'block';
        schools.forEach(school => {
            school.style.display = 'block';
            // Re-enable animation
            school.style.animation = '';
        });
        document.body.style.overflow = '';
    }

    // Click event for each school
    schools.forEach(school => {
        school.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = this.classList.contains('active');
            
            closeAllBanners();
            
            if (!isActive) {
                // Lock scroll to prevent background scrolling
                document.body.style.overflow = 'hidden';
                
                // Activate the school
                this.classList.add('active');
                this.style.zIndex = '1000';
                
                // Get the banner
                const banner = this.querySelector('.school-banner');
                
                // Display the banner in fullscreen
                banner.style.display = 'flex';
                
                // Disable animation on the active school
                this.style.animation = 'none';
                
                // Force the browser to acknowledge the changed styles
                // before applying the transition
                window.getComputedStyle(banner).opacity;
                
                // Animate in
                banner.style.opacity = '1';
                banner.style.transform = 'scale(1)';
                
                // Hide other elements
                setTimeout(() => {
                    facultyLogo.style.display = 'none';
                    facultySpirals.style.display = 'none';
                    schools.forEach(otherSchool => {
                        if (otherSchool !== this) {
                            otherSchool.style.display = 'none';
                        }
                    });
                }, 200);
            }
        });
    });

    // Close banner when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllBanners();
        });
    });

    // Close banner when clicking outside
    document.body.addEventListener('click', function(e) {
        if (!facultiesSection.contains(e.target)) {
            closeAllBanners();
        }
    });

    facultiesSection.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Listen for escape key to close banner
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllBanners();
        }
    });
}); 