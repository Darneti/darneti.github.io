// Кнопка «Наверх/Вниз»
var lastScrollPosition = 0; 

$('#js-scroll-up').click( function(){
	if ( $(document).scrollTop() > 0 ) {
		$('body').animate({scrollTop:0},1000);
		lastScrollPosition = $(document).scrollTop();
	} else {
		$('body').animate({scrollTop:lastScrollPosition},1000);
	}	
});

$(document).scroll( function() {
	if ( $(document).scrollTop() > 500 ) {
		$('#js-scroll-up').fadeIn();
		$('#js-scroll-up').text('Наверх');
	} else {
		$('#js-scroll-up').text('Вниз');
	}
});
