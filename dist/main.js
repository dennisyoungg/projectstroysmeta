// Основной файл TypeScript для сайта ПроектСтройСмета
// Функция для обработки отправки формы
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Получение значений полей формы
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            // В реальном проекте здесь был бы код для отправки данных на сервер
            console.log('Отправка формы:', { name, email, phone });
            // Показать сообщение об успешной отправке
            alert('Спасибо за обращение! Наши специалисты свяжутся с вами в ближайшее время.');
            // Очистка формы
            contactForm.reset();
        });
    }
    // Модальное окно для сертификатов
    const modal = document.getElementById('certificateModal');
    const modalImage = modal === null || modal === void 0 ? void 0 : modal.querySelector('.modal__image');
    const modalTitle = modal === null || modal === void 0 ? void 0 : modal.querySelector('.modal__title');
    const modalClose = modal === null || modal === void 0 ? void 0 : modal.querySelector('.modal__close');
    // Инициализация для сертификатов на главной странице
    const certificateItems = document.querySelectorAll('.certificate__item img');
    certificateItems.forEach(item => {
        item.addEventListener('click', (e) => {
            var _a, _b;
            const target = e.target;
            const imageSrc = target.src;
            const title = ((_b = (_a = target.closest('.certificate__item')) === null || _a === void 0 ? void 0 : _a.querySelector('p')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
            openModal(imageSrc, title);
        });
    });
    // Инициализация для сертификатов на странице сертификатов
    const certificatePageItems = document.querySelectorAll('.certificate-page__image img');
    certificatePageItems.forEach(item => {
        item.addEventListener('click', (e) => {
            var _a, _b;
            const target = e.target;
            const imageSrc = target.src;
            const title = ((_b = (_a = target.closest('.certificate-page__item')) === null || _a === void 0 ? void 0 : _a.querySelector('h3')) === null || _b === void 0 ? void 0 : _b.textContent) || '';
            openModal(imageSrc, title);
        });
    });
    // Закрытие модального окна
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    // Закрытие модального окна при клике вне содержимого
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (modal === null || modal === void 0 ? void 0 : modal.classList.contains('open'))) {
            closeModal();
        }
    });
    function openModal(imageSrc, title) {
        if (modal && modalImage && modalTitle) {
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Запрет скролла при открытом модальном окне
        }
    }
    function closeModal() {
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = ''; // Восстановление скролла при закрытии
        }
    }
    // Плавная прокрутка для якорных ссылок
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === '#')
                return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.scrollY,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Кнопка "Рассчитать стоимость" в hero секции
    const heroButton = document.querySelector('.hero__button');
    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Прокрутка к форме
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.getBoundingClientRect().top + window.scrollY,
                    behavior: 'smooth'
                });
            }
        });
    }
    // Добавление анимаций при прокрутке страницы
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.services__card, .certificate__item, .about__gallery-item, .certificate-page__item, .services-detail__card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.85) { // Элемент достиг 85% высоты окна при прокрутке
                element.classList.add('animate');
            }
        });
    };
    // Инициализация анимаций при загрузке и прокрутке
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
export {};
