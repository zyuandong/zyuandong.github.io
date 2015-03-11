$(function(){
	init();
	onFun();
});

function init(){
	var editorHeight = $(window).height() - 51;
	$('.doc-content').css('height', editorHeight);
	$('.doc-text').css('height', editorHeight - 60);
	$('.editor-content').css('height', editorHeight);
	$('#editor').css('height', editorHeight - 50);
}

function onFun(){
	$(window).resize(function(){
		var editorHeight = $(window).height() - 51;
		$('.doc-content').css('height', editorHeight);
		$('.doc-text').css('height', editorHeight - 60);
		$('.editor-content').css('height', editorHeight);
		$('#editor').css('height', editorHeight - 50);
		console.log($(window).height());
	})
}


var editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.getSession().setMode('ace/mode/javascript');
var value = editor.getValue();
console.log(value);
editor.getSession().selection.on('changeSelection', function(e) {
    var session = editor.session.getTextRange(editor.getSelectionRange());
    console.log(session);
});