$(function(){
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {

		$('body').css('height', $(window).get(0).innerHeight);
	});
	
	$('#slider').on('click', function(){
		if($(this).children('i').hasClass('toRight')){
			$(this).children('i').remove();
			$(this).html('<i class="fa fa-angle-left toLeft"></i>');
			$('#slide-panel').animate({
				marginLeft: '0'
			},500);
		}else{
			//$(this).children('i').removeClass('toLeft').addClass('toRight');
			$(this).children('i').remove();
			$(this).html('<i class="fa fa-angle-right toRight"></i>');
			$('#slide-panel').animate({
				marginLeft: '-640px'
			},500);
		}
	});
});
