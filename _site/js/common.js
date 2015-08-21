$(function(){
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {

		$('body').css('height', $(window).get(0).innerHeight);
	});
	
	$('#slider').on('click', function(){
		if($(this).hasClass('toRight')){
			$(this).removeClass('toRight').addClass('toLeft').html('>');
			$('#slide-panel').animate({
				marginLeft: "0"
			},500);
		}else{
			$(this).removeClass('toLeft').addClass('toRight').html('<');
			$('#slide-panel').animate({
				marginLeft: "-640px"
			},500);
		}
	});
});
