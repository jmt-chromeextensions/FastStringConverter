$( document ).ready(function() {
	
	var clipboardTextArea = $('#clipboardTextArea');
	var previousTextArea = $('#previousTextArea');

	// String conversion functions

	function allLowerCase(t) {
		return t.toLowerCase();
	}

	function allUpperCase(t) {
		return t.toUpperCase();
	}

	function sentenceType(t) {
		return t.charAt(0).toUpperCase() + t.slice(1) + (t.endsWith('.') ? "" : '.');
	}

	function firstLettersUpperCase(t) {
		return t.split(' ').map(w =>  w.charAt(0).toUpperCase() + w.substring(1)).join(' ');
	}

	function alternateCase(t) {
		return t.split('').map(w =>  {if (w == w.toUpperCase()) {return w.toLowerCase()} else { return w.toUpperCase() }} ).join('');
	}
	
	function underscoresToSpaces(t) {
		return t.replace(/_/g, ' ');
	}

	function spacesToUnderscores(t) {
		return t.replace(/ /g,"_");
	}

	function spacesToCaps(t) {
		return t.split(' ').map(w =>  w.charAt(0).toUpperCase() + w.substring(1)).join('');
	}

	function capsToSpaces(t) {
		return t.split(/(?=[A-Z])/).join(" ").toLowerCase();
	}


	function animateClipboardTextAreaBackground() {

		// If the textarea is being animated, this animation is stopped and the ones that could be in queue are removed.
		if (clipboardTextArea.css('backgroundColor') != 'rgb(255, 255, 255)') {
			clipboardTextArea.stop();
			clipboardTextArea.css("background-color", "white");
			clipboardTextArea.clearQueue();
		}

		clipboardTextArea.animate({backgroundColor: '#6CE679'}, "fast");
		clipboardTextArea.animate({backgroundColor: 'white'}, "slow");
	} 

	// The text contained in the clipboard is pasted to clipboardTextArea when the popup is opened.
	clipboardTextArea.select();
	document.execCommand('paste');

	// Buttons are assigned with their corresponding functions.
	$("button").click(function()
	{ 
		// Store the text in the bottom textarea before the transformation
		previousTextArea.val(clipboardTextArea.val());

		// Execute function
		eval("clipboardTextArea.val(" + this.id + "(clipboardTextArea.val()))");
		animateClipboardTextAreaBackground();

		// Copy converted text to clipboard
		clipboardTextArea.select();
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
	});

});





