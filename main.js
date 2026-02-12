// Кнопка «Вгору/Вниз»
$(document).ready(function(){
$(window).scroll(function () {
	if ($(this).scrollTop() > 400) {
		$('#js-scroll-up').fadeIn();
		} else {$('#js-scroll-up').fadeOut();}});
$('#js-scroll-up').click(function () {
	$('body,html').animate({scrollTop: 0}, 400); return false;});
});



// Модальне вікно

// відкрити за кнопкою
$('.js-button-campaign').click(function() {
	$('.js-overlay-campaign').fadeIn();

});

// закрити на хрестик
$('.js-close-campaign').click(function() {
	$('.js-overlay-campaign').fadeOut();

});

// закрити по кліку поза вікном
$(document).mouseup(function (e) {
	var popup = $('.js-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-campaign').fadeOut();

	}
});

// Обробка форми
$('.contact-form').submit(function(e) {
	e.preventDefault();

	// Отримання значень форми
	var name = $(this).find('input[name="name"]').val();
	var email = $(this).find('input[name="email"]').val();
	var subject = $(this).find('input[name="subject"]').val();
	var message = $(this).find('textarea[name="message"]').val();

	// Тут можна додати відправку на сервер
	// Наприклад через AJAX або використати сервіс типу Formspree

	// Поки що показуємо повідомлення
	alert('Дякуємо за ваше повідомлення, ' + name + '!\n\nВаша форма буде відправлена після налаштування сервера.');

	// Очищення форми
	$(this)[0].reset();

	// Закриття модального вікна
	$('.js-overlay-campaign').fadeOut();
});



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
