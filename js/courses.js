$(function(){
	onFun();
});

function onFun(){
	$('.course-item')
	.mouseover(function(){
		$(this).css({
			'backgroundColor':'#0e90d2',
			'color':'#fff'
		});
	}).mouseout(function(){
		$(this).css({
			'backgroundColor':'#fff',
			'color':'#000'
		});
	}).click(function(){
		window.open("/simpleBlog/2015/03/09/labs.html");
	})
}