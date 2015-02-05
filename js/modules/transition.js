var transition = {
	storeInitial: function($elem) {
		if (window.getComputedStyle) {
			var transitionDuration = window.getComputedStyle($elem[0]).getPropertyValue('transition-duration') || window.getComputedStyle($elem[0]).getPropertyValue('-webkit-transition-duration'),
				transitionTimingFunction = window.getComputedStyle($elem[0]).getPropertyValue('transition-timing-function') || window.getComputedStyle($elem[0]).getPropertyValue('-webkit-transition-timing-function');
			
			if (transitionDuration.match(/\d+s$/g))
				transitionDuration = parseFloat(transitionDuration) * 1000;
			else
				transitionDuration = parseInt(transitionDuration);
			
			$elem.attr('aria-hidden', true).data('transition-duration', transitionDuration).data('transition-timing-function', transitionTimingFunction);
		}
	},
	
	overrideDefault: function(selector) {
		if (window.getComputedStyle) {
			var style = document.createElement('style');
			style.appendChild(document.createTextNode('.jquery ' + selector.replace(/,/g, ',.jquery ') + '{ -moz-transition: none; -o-transition: none; -webkit-transition: none; transition: none; }'));
			document.head.appendChild(style);
		}
	}
};