$(function(){
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {
		$('body').css('height', $(window).get(0).innerHeight);
	});

	//为超链接加上target='_blank'属性
	$('a[href^="http"]').each(function() {
		$(this).attr('target', '_blank');
	});
	
	//移动设备，打开文章时目录自动收起
	if($(window).width() <= 640) {
		$('#slide-panel').animate({
			marginLeft: '-640px'
		}, 500).dequeue();
		$('#icon-slider').addClass('fullscreen');
	}

	$('#slider').on('click', function() {
		if($('#icon-slider').hasClass('fullscreen')) {
			$('#icon-slider').removeClass('fullscreen');
			$('#slide-panel').animate({
				marginLeft: '0'
			}, {
				duration: 300,
				queue: false,
				complete: function() {
					$('.contents-box').removeClass('fullscreen');
				}
			});
		} else {
			$('#icon-slider').addClass('fullscreen');
			$('#slide-panel').animate({
				marginLeft: '-640px'
			}, {
				duration: 300,
				queue: false,
				complete: function() {
					$('.contents-box').addClass('fullscreen');
				}
			});
		}
	});

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

	$('#index-btn').click(function() {
		if($(this).hasClass('show')){
			$(this).removeClass('show');
			$('#index-panel').animate({
				right: '-100px'
			}, 300).dequeue();
		} else {
			$(this).addClass('show');
			$('#index-panel').animate({
				right: '0'
			}, 300).dequeue();
		}
	});
});
