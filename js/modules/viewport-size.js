var viewportSize = {
	height: function() {
		return html.clientHeight ? html.clientHeight : window.innerHeight;
	},
	width: function() {
		return html.clientWidth ? html.clientWidth : window.innerWidth;
	},
	multiplier: function() {
		if (window.getComputedStyle)
			actualFontSize = parseInt(window.getComputedStyle(html).getPropertyValue('font-size'));
		
		return actualFontSize / baseFontSize;
	}
};