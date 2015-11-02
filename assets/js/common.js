$(function(){
	// change page height
	$('body').css('height', $(window).get(0).innerHeight);
	$(window).resize(function() {
		$('body').css('height', $(window).get(0).innerHeight);
	});

	// switch file category tag
	$('#slide-panel .guid-item').on('click', function() {
		var page = $(this).data('page');
		$('#slide-panel .page-item').hide();
		$('#slide-panel').find('.' + page).show().css('display','flex');
	});

	// click slider-btn to show or hide slider-panel
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
				step: function() {
					$('.contents-box').addClass('fullscreen');
				}
			});
		}
	});

	// show back2top-btn
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

	// back to top
	$('#back2top').click(function() {
		$('#contents').animate({
			scrollTop: '0'
		}, 700);
	});

	// side index-list
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

	// use jquery-pjax
	bindActive();
	$(document).pjax('[data-pjax] a, a[data-pjax]', '#contents', { 
		fragment: '#contents',
		timeout: 10000
	});
	$(document).on({
		'pjax:start': function() {
			$("#contents").fadeOut();
			NProgress.start();
		},
		'pjax:end': function() {
			pjaxEnd();
			bindActive();
			$("#contents").fadeIn();
			NProgress.done();
		}
	});

	// get categories-list
	$('.category-all .category-item').on('click', function() {
		var key = $(this).data('category');
		$(this).addClass('active').siblings().removeClass('active');
		$.getJSON('/simplex/data/post.json', function(data) {
			var count = 0,
				datas = data.datas,
				html = '<ul>';
			$.each(datas, function(i, item) {
				if(item.category){
					if(item.category == key) {
						html += '<li class="x-pjax"><a href="/simplex'+item.url+'" data-pjax>'+item.title+'</a></li>';
						count++;
					}
				}
			});
			if(count > 0) {
				html += '</ul>';
				$('.category-box').html(html);
				bindActive();
			}
		});
	});

	// get tags-list
	$('.tags-all .tags-item').on('click', function() {
		var key = $(this).data('tag');
		$(this).addClass('active').siblings().removeClass('active');
		$.getJSON('/simplex/data/post.json', function(data) {
			var count = 0,
				datas = data.datas,
				html = '<ul>';
			$.each(datas, function(i, item) {
				for(var i in item.tags) {
					if(item.tags[i] == key) {
						html += '<li class="x-pjax"><a href="/simplex'+item.url+'" data-pjax>'+item.title+'</a></li>';
						count++;
					}
				}
			});
			if(count > 0) {
				html += '</ul>';
				$('.tags-box').html(html);
				bindActive();
			}
		});
	});

	pjaxEnd();
});

function pjaxEnd(){
	// catalogue automatic hide in mobile
	if($(window).width() <= 640) {
		$('#slide-panel').animate({
			marginLeft: '-640px'
		}, 500).dequeue();
		$('#icon-slider').addClass('fullscreen');
	}

	if($('#icon-slider').hasClass('fullscreen')) {
		$('.contents-box').addClass('fullscreen');
	} else {
		$('.contents-box').removeClass('fullscreen');
	}

	// open page in new tab
	$('a[href^="http"]').each(function() {
		$(this).attr('target', '_blank');
	});

	// code highlight
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}

function bindActive() {
	$('.x-pjax').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.page-next, .page-previous').on('click', function() {
		var $_id = $(this).data("id");
		$('.x-pjax').removeClass('active').each(function() {
			if($(this).data('id') == $_id) {
				$(this).addClass('active');
			}
		});
	});
}