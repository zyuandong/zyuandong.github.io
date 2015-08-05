$(function(){
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {

		$('body').css('height', $(window).get(0).innerHeight);
	});
	
	$('#slider').on('click', function(){
		if($(this).hasClass('left')){
			$(this).removeClass('left').addClass('right');
			$('#slide-panel').animate({
				marginLeft: "-520px"
			},500);
		}else{
			$(this).removeClass('right').addClass('left');
			$('#slide-panel').animate({
				marginLeft: "0"
			},500);
		}
	});
});
