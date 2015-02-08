var html = document.documentElement,
	$html = $(html),
	$window = $(window),
	actualFontSize = 16,
	baseFontSize = 16,
	multiplier;

var trackEvent = function(campaign, action, label) {
	var clean = function(str) {
		return str.toString().replace(/\s|'|"/g, '-');
	};
	if (typeof(_gaq) !== 'undefined')
		_gaq.push(['_trackEvent', clean(campaign), clean(action), clean(label)]);
};

$(document).ready(function() {
	$html.addClass('jquery');

	FastClick.attach(document.body);

	grid.init();
	placeholder.init();
	forms.init();
	slider.init();
	tabs.init();
	accordion.init();
	tables.init();
});
