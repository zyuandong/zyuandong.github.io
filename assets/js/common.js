$(function(){
	// 调整目录高度
	$('body').css('height', $(window).get(0).innerHeight);

	$(window).resize(function() {
		$('body').css('height', $(window).get(0).innerHeight);
	});

	// 切换所有文章、分类、标签
	$('#slide-panel .guid-item').on('click', function() {
		var page = $(this).data('page');
		$('#slide-panel .page-item').hide();
		$('#slide-panel').find('.' + page).show();
	});

	// 使用 jquery-pjax 实现无刷新改变文档内容
	$('.x-pjax').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	$(document).pjax('[data-pjax] a, a[data-pjax]', '#contents', { 
		fragment: '#contents',
		timeout: 10000
	});

	$(document).on('pjax:end', function() {
		if($(window).width() <= 640) {
			$('#slide-panel').animate({
				marginLeft: '-640px'
			}, 500).dequeue();
			$('#icon-slider').addClass('fullscreen');
		}

		// 为超链接加上target='_blank'属性
		$('a[href^="http"]').each(function() {
			$(this).attr('target', '_blank');
		});


		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
			//hljs.configure({tabReplace: ''});
		});

        //hljs.initHighlightingOnLoad();
	});
	
	// 移动设备，打开文章时目录自动收起
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

	$.getJSON('/simplex/data/post.json', function(data) {
		var html = "",
			len = data.size,
			datas = data.datas;
		for(var i in data.datas) {
			if(datas[i].tags.length > 0) {
				for(var j in datas[i].tags) {
					html += datas[i].tags[j] + ',';
				}
			}
		}
		$('.tags-box').html(html);
	});

	/**
	 *  获取分类文章
	 */
	$('.category-all span').on('click', function() {
		var key = $(this).data('category');
		$.getJSON('/simplex/data/post.json', function(data) {
			var count = 0,
				datas = data.datas,
				html = '<h2>分类：'+ key +'</h2><ul>';
			$.each(datas, function(i, item) {
				if(item.category){
					if(item.category == key) {
						html += '<li><a href="/simplex'+item.url+'">'+item.title+'</a></li>';
						count++;
					}
				}
			});
			if(count > 0) {
				html += '</ul>';
				$('.category-box').html(html);
			}
		});
	});
});
