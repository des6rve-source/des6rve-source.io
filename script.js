// Бургер-меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

overlay.addEventListener('click', () => {
  burger.classList.remove('active');
  nav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
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

// Анимация при скролле
function checkVisibility() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 100) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);

// Автоматический год в футере
const footerText = document.querySelector('.footer p');
if (footerText) {
  footerText.innerHTML = `© ${new Date().getFullYear()} Creative Studio. Учебный проект`;
}

// ===== ТЁМНАЯ ТЕМА =====
const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// ===== КНОПКА НАВЕРХ =====
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== АКТИВНОЕ МЕНЮ =====
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav__link');

function setActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ===== СЧЁТЧИКИ =====
function animateNumbers() {
  document.querySelectorAll('.stat-number').forEach(number => {
    const target = parseInt(number.dataset.target);
    const current = parseInt(number.innerText);
    if (current < target) {
      number.innerText = Math.min(current + Math.ceil(target / 30), target);
    }
  });
}

let animationStarted = false;

window.addEventListener('scroll', function checkStats() {
  const stats = document.querySelector('.stats');
  if (!stats || animationStarted) return;
  
  if (stats.getBoundingClientRect().top < window.innerHeight - 100) {
    animationStarted = true;
    const interval = setInterval(() => {
      animateNumbers();
      let allFinished = true;
      document.querySelectorAll('.stat-number').forEach(n => {
        if (parseInt(n.innerText) < parseInt(n.dataset.target)) allFinished = false;
      });
      if (allFinished) clearInterval(interval);
    }, 50);
  }
});

// ===== ФИЛЬТР ПОРТФОЛИО =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio__item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Убираем активный класс у всех кнопок
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Добавляем активный класс нажатой кнопке
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      // Показываем все, если выбрано "all"
      if (filterValue === 'all') {
        item.classList.remove('hidden');
      } else {
        // Показываем только те, у которых category совпадает с фильтром
        if (item.dataset.category === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      }
    });
  });
});

// ===== ПРОГРЕСС-БАР =====
const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// Убедимся, что бар создан
if (!progressBar) {
  console.warn('Прогресс-бар не найден');
}