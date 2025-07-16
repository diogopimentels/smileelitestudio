document.addEventListener('DOMContentLoaded', () => {

    // BLOCO 1: ANIMAÇÃO DE FADE-IN
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    sections.forEach(section => {
        observer.observe(section);
    });

    // BLOCO 2: SLIDERS E COMPARAÇÃO DE IMAGEM
    const comparisonSlider = document.querySelector('.comparison-slider .slider');
    if (comparisonSlider) {
        comparisonSlider.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            const afterImage = e.target.closest('.comparison-slider').querySelector('.image-after');
            afterImage.style.width = `${sliderValue}%`;
        });
    }

    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-nav .prev');
    const nextBtn = document.querySelector('.slider-nav .next');
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    showSlide(currentSlide);
    
    // BLOCO 3: ANIMAÇÃO DE CONTAGEM DOS NÚMEROS
    const statsSection = document.querySelector('#stats');
    const numbers = document.querySelectorAll('.stat-number');
    let animationStarted = false;

    const startCounter = () => {
        if (animationStarted) return;
        animationStarted = true;

        numbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            number.innerText = '0';

            const updateCount = () => {
                const current = +number.innerText;
                const increment = Math.max(1, target / 200);

                if (current < target) {
                    const nextValue = Math.ceil(current + increment);
                    number.innerText = nextValue > target ? target : nextValue;
                    setTimeout(updateCount, 10);
                } else {
                    number.innerText = target.toString() + (number.getAttribute('data-target') === '99' ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounter();
            statsObserver.unobserve(entries[0].target);
        }
    }, {
        threshold: 0.5
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // BLOCO 4: FUNCIONALIDADE DO FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // BLOCO 5: FORMULÁRIO DE CONTATO INTELIGENTE
    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('#form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            const submitButton = contactForm.querySelector('.form-button');

            if (name === '' || email === '' || message === '') {
                showFormMessage('Please fill out all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            submitButton.disabled = true;
            submitButton.innerText = 'Sending...';
            showFormMessage('');

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerText = 'Send Request';
                showFormMessage('Thank you! Your request has been sent.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    function showFormMessage(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
        }
    }

    function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

});