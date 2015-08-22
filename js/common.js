$(function(){
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {

		$('body').css('height', $(window).get(0).innerHeight);
	});
	
	$('#slider').on('click', function(){
		if($('#icon-slider').hasClass('fullscreen')) {
			$('#icon-slider').removeClass('fullscreen');
			$('#slide-panel').animate({
				marginLeft: '0'
			},500).dequeue();
		} else {
			$('#icon-slider').addClass('fullscreen');
			$('#slide-panel').animate({
				marginLeft: '-640px'
			},500).dequeue();
		}
		/**
		if($(this).children('i').hasClass('toRight')){
			$(this).children('i').remove();
			$(this).html('<i class="fa fa-angle-left toLeft"></i>');
		}else{
			//$(this).children('i').removeClass('toLeft').addClass('toRight');
			$(this).children('i').remove();
			$(this).html('<i class="fa fa-angle-right toRight"></i>');
		}
		**/
	});
});
