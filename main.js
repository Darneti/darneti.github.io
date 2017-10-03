// Кнопка «Наверх/Вниз»
$(document).ready(function(){
$(window).scroll(function () {
	if ($(this).scrollTop() > 400) {
		$('#js-scroll-up').fadeIn();
		} else {$('#js-scroll-up').fadeOut();}});
$('#js-scroll-up').click(function () {
	$('body,html').animate({scrollTop: 0}, 400); return false;});
});


// Модальное окно

// открыть по кнопке
$('.js-button-campaign').click(function() { 
	$('.js-overlay-campaign').fadeIn();
	
});

// закрыть на крестик
$('.js-close-campaign').click(function() { 
	$('.js-overlay-campaign').fadeOut();
	
});

// закрыть по клику вне окна
$(document).mouseup(function (e) { 
	var popup = $('.js-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-campaign').fadeOut();
		
	}
});

