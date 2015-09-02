$(function(){
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {

		$('body').css('height', $(window).get(0).innerHeight);
	});
	
	$('#slider').on('click', function() {
		if($('#icon-slider').hasClass('fullscreen')) {
			$('#icon-slider').removeClass('fullscreen');
			$('#slide-panel').animate({
				marginLeft: '0'
			},500).dequeue();
		} else {
			$('#icon-slider').addClass('fullscreen');
			$('#slide-panel').animate({
				marginLeft: '-640px'
			}, 500).dequeue();
		}
	});

	if($(window).width() <= 640) {
		$('#slide-panel').animate({
			marginLeft: '-640px'
		}, 500).dequeue();
		$('#icon-slider').addClass('fullscreen');
	}

	/**
	 * 滚动事件
	 * */
	$('#contents').scroll(function(){
	    var t = $(this).scrollTop();
	    if( t >= 10) {
	    	if(!$('#back2top').is(":visible")){
		    	$('#back2top').show();
	    	}
	    } else {
	    	$('#back2top').hide();
	    }
	});

	$('#back2top').click(function() {
		$('#contents').animate({
			scrollTop: '0'
		}, 700);
	});
});
