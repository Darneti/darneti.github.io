// Кнопка «Наверх/Вниз»
$(document).ready(function(){
$(window).scroll(function () {
	if ($(this).scrollTop() > 0) {$('#js-scroll-up').fadeIn();
				     } else {
					     $('#js-scroll-up').fadeOut();
				     }});
$('#js-scroll-up').click(function () {
	$('body,html').animate({scrollTop: 0}, 400); return false;});
});
