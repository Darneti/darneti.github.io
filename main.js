// ===== Кнопка "Вгору" з IntersectionObserver =====
document.addEventListener('DOMContentLoaded', function() {
	const scrollUpBtn = document.getElementById('js-scroll-up');
	const firstWrapper = document.querySelector('.first-wrapper');

	if (!scrollUpBtn || !firstWrapper) return;

	// IntersectionObserver для показу/приховування кнопки
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					scrollUpBtn.classList.remove('visible');
				} else {
					scrollUpBtn.classList.add('visible');
				}
			});
		},
		{
			rootMargin: '-200px 0px 0px 0px',
			threshold: 0
		}
	);

	observer.observe(firstWrapper);

	// Плавна прокрутка вгору
	scrollUpBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});

// ===== Модальне вікно =====
document.addEventListener('DOMContentLoaded', function() {
	const openBtn = document.querySelector('.js-button-campaign');
	const overlay = document.querySelector('.js-overlay-campaign');
	const closeBtn = document.querySelector('.js-close-campaign');
	const popup = document.querySelector('.js-popup-campaign');

	if (!overlay || !openBtn) return;

	// Відкрити модальне вікно
	openBtn.addEventListener('click', () => {
		overlay.style.display = 'block';
		setTimeout(() => {
			overlay.style.opacity = '1';
		}, 10);
	});

	// Закрити на хрестик
	closeBtn?.addEventListener('click', () => {
		closeOverlay();
	});

	// Закрити по кліку поза вікном
	overlay?.addEventListener('click', (e) => {
		if (!popup.contains(e.target)) {
			closeOverlay();
		}
	});

	// Закрити на Escape
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && overlay.style.display === 'block') {
			closeOverlay();
		}
	});

	function closeOverlay() {
		overlay.style.opacity = '0';
		setTimeout(() => {
			overlay.style.display = 'none';
		}, 300);
	}
});

// ===== Обробка форми з валідацією =====
document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('.contact-form');

	if (!form) return;

	// Валідація в реальному часі
	const inputs = form.querySelectorAll('input, textarea');
	inputs.forEach(input => {
		input.addEventListener('blur', () => validateField(input));
		input.addEventListener('input', () => {
			if (input.classList.contains('error')) {
				validateField(input);
			}
		});
	});

	// Відправка форми
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		// Валідація всіх полів
		let isValid = true;
		inputs.forEach(input => {
			if (!validateField(input)) {
				isValid = false;
			}
		});

		if (!isValid) {
			showToast('Будь ласка, заповніть всі поля коректно', 'error');
			return;
		}

		// Збір даних
		const formData = {
			name: form.querySelector('[name="name"]').value,
			email: form.querySelector('[name="email"]').value,
			subject: form.querySelector('[name="subject"]').value,
			message: form.querySelector('[name="message"]').value,
			timestamp: new Date().toISOString()
		};

		// Симуляція відправки (можна інтегрувати з Formspree)
		try {
			await new Promise(resolve => setTimeout(resolve, 500));

			// Успіх
			showToast(`Дякуємо, ${formData.name}! Ваше повідомлення отримано.`, 'success');
			form.reset();

			// Закрити модальне вікно через 2 секунди
			setTimeout(() => {
				const overlay = document.querySelector('.js-overlay-campaign');
				if (overlay) {
					overlay.style.opacity = '0';
					setTimeout(() => {
						overlay.style.display = 'none';
					}, 300);
				}
			}, 2000);

		} catch (error) {
			showToast('Помилка відправки. Спробуйте пізніше.', 'error');
			console.error('Form submission error:', error);
		}
	});

	// Валідація поля
	function validateField(field) {
		const value = field.value.trim();
		let isValid = true;
		let errorMessage = '';

		// Перевірка обов'язкових полів
		if (field.required && !value) {
			isValid = false;
			errorMessage = 'Це поле обов\'язкове';
		}

		// Валідація email
		if (field.type === 'email' && value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				isValid = false;
				errorMessage = 'Введіть коректний email';
			}
		}

		// Мінімальна довжина
		if (field.name === 'name' && value && value.length < 2) {
			isValid = false;
			errorMessage = 'Ім\'я занадто коротке';
		}

		if (field.name === 'message' && value && value.length < 10) {
			isValid = false;
			errorMessage = 'Повідомлення занадто коротке (мінімум 10 символів)';
		}

		// Відображення помилки
		const parent = field.parentElement;
		if (!parent) return isValid;

		let errorElement = parent.querySelector('.field-error');

		if (!isValid) {
			field.classList.add('error');
			field.setAttribute('aria-invalid', 'true');

			if (!errorElement) {
				errorElement = document.createElement('span');
				errorElement.className = 'field-error';
				errorElement.setAttribute('role', 'alert');
				parent.appendChild(errorElement);
			}
			errorElement.textContent = errorMessage;
		} else {
			field.classList.remove('error');
			field.removeAttribute('aria-invalid');
			if (errorElement) {
				errorElement.remove();
			}
		}

		return isValid;
	}
});

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
	// Видалити старі toast
	const existingToast = document.querySelector('.toast');
	if (existingToast) {
		existingToast.remove();
	}

	// Створити toast
	const toast = document.createElement('div');
	toast.className = `toast toast-${type}`;
	toast.setAttribute('role', 'alert');
	toast.setAttribute('aria-live', 'polite');

	// Іконка
	const icon = document.createElement('span');
	icon.className = 'toast-icon';
	icon.setAttribute('aria-hidden', 'true');
	icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

	// Текст
	const text = document.createElement('span');
	text.className = 'toast-text';
	text.textContent = message;

	// Кнопка закриття
	const closeBtn = document.createElement('button');
	closeBtn.className = 'toast-close';
	closeBtn.setAttribute('aria-label', 'Закрити повідомлення');
	closeBtn.innerHTML = '&times;';
	closeBtn.addEventListener('click', () => hideToast(toast));

	toast.appendChild(icon);
	toast.appendChild(text);
	toast.appendChild(closeBtn);
	document.body.appendChild(toast);

	// Анімація появи
	setTimeout(() => toast.classList.add('visible'), 10);

	// Автоматичне приховування через 5 секунд
	const hideTimeout = setTimeout(() => hideToast(toast), 5000);

	// Зберегти timeout для можливості скасування
	toast.dataset.hideTimeout = hideTimeout;
}

function hideToast(toast) {
	if (!toast) return;

	// Скасувати автоматичне приховування
	if (toast.dataset.hideTimeout) {
		clearTimeout(Number(toast.dataset.hideTimeout));
	}

	toast.classList.remove('visible');
	setTimeout(() => toast.remove(), 300);
}



//Sidebar===========================================================================================================
// Сучасний бургер-меню на чистому JavaScript (без jQuery)
document.addEventListener('DOMContentLoaded', function() {
	const burgerButton = document.getElementById('burger-button');
	const menuList = document.getElementById('main-menu');

	if (burgerButton && menuList) {
		// Обробник кліку на кнопку бургер-меню
		burgerButton.addEventListener('click', function() {
			// Перемикаємо активний стан
			const isActive = this.classList.toggle('active');
			menuList.classList.toggle('active');

			// Оновлюємо ARIA атрибути для доступності
			this.setAttribute('aria-expanded', isActive);
			this.setAttribute('aria-label', isActive ? 'Закрити меню' : 'Відкрити меню');
		});

		// Закриття меню при зміні розміру вікна (якщо перейшли на десктоп)
		let resizeTimer;
		window.addEventListener('resize', function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				if (window.innerWidth > 1200) {
					burgerButton.classList.remove('active');
					menuList.classList.remove('active');
					burgerButton.setAttribute('aria-expanded', 'false');
					burgerButton.setAttribute('aria-label', 'Відкрити меню');
				}
			}, 250);
		});

		// Закриття меню при натисканні Escape
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && burgerButton.classList.contains('active')) {
				burgerButton.classList.remove('active');
				menuList.classList.remove('active');
				burgerButton.setAttribute('aria-expanded', 'false');
				burgerButton.setAttribute('aria-label', 'Відкрити меню');
				burgerButton.focus();
			}
		});

		// Закриття меню при кліку на пункт меню (на мобільних)
		const menuLinks = menuList.querySelectorAll('a');
		menuLinks.forEach(function(link) {
			link.addEventListener('click', function() {
				if (window.innerWidth <= 1200) {
					burgerButton.classList.remove('active');
					menuList.classList.remove('active');
					burgerButton.setAttribute('aria-expanded', 'false');
					burgerButton.setAttribute('aria-label', 'Відкрити меню');
				}
			});
		});
	}
});
