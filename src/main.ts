// Основной файл TypeScript для сайта ПроектСтройСмета

// Функция для обработки отправки формы
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm') as HTMLFormElement;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Получение значений полей формы
      const formData = new FormData(contactForm);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;

      // В реальном проекте здесь был бы код для отправки данных на сервер
      console.log('Отправка формы:', { name, email, phone });

      // Показать сообщение об успешной отправке
      alert('Спасибо за обращение! Наши специалисты свяжутся с вами в ближайшее время.');

      // Очистка формы
      contactForm.reset();
    });
  }

  // Модальное окно для сертификатов
  const modal = document.getElementById('certificateModal') as HTMLDivElement | null;
  const modalImage = modal?.querySelector('.modal__image') as HTMLImageElement | null;
  const modalTitle = modal?.querySelector('.modal__title') as HTMLDivElement | null;
  const modalClose = modal?.querySelector('.modal__close') as HTMLDivElement | null;

  // Инициализация для сертификатов на главной странице
  const certificateItems = document.querySelectorAll('.certificate__item img');

  certificateItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.target as HTMLImageElement;
      const imageSrc = target.src;
      const title = target.closest('.certificate__item')?.querySelector('p')?.textContent || '';

      openModal(imageSrc, title);
    });
  });

  // Инициализация для сертификатов на странице сертификатов
  const certificatePageItems = document.querySelectorAll('.certificate-page__image img');

  certificatePageItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.target as HTMLImageElement;
      const imageSrc = target.src;
      const title = target.closest('.certificate-page__item')?.querySelector('h3')?.textContent || '';

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
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });

  function openModal(imageSrc: string, title: string) {
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

      const href = (link as HTMLAnchorElement).getAttribute('href') as string;

      if (href === '#') return;

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

// Экспорт пустого объекта для совместимости с модульной системой
export {};
