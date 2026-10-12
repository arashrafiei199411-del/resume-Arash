/**
 * فایل جاوا اسکریپت اصلی رزومه
 * شامل افکت‌های تعاملی، انیمیشن اسکرول و مدیریت رویدادها
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- ۱. انیمیشن ظاهر شدن عناصر به هنگام اسکرول (Fade In on Scroll) --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // فعال شدن انیمیشن وقتی ۱۵ درصد عنصر در دید کاربر قرار گیرد
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // اگر می‌خواهید انیمیشن فقط یک‌بار اجرا شود، خط زیر را فعال کنید:
                // observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // انتخاب بخش‌هایی که باید انیمیشن اسکرول داشته باشند
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        scrollObserver.observe(section);
    });

    // افزودن کلاس استایل برای حالت نمایان شدن
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        section.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    /* --- ۲. افکت اسکرول نرم برای لینک‌های داخلی منو --- */
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* --- ۳. اعتبارسنجی ساده فرم تماس و پیام موفقیت --- */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // اینجا می‌توانید کدهای ارسال فرم با ایجکس یا PHP را قرار دهید
            alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهم گرفت.');
            contactForm.reset();
        });
    }

});