var grid = {
	init: function() {
		if (window.location.search.match(/suzigrid=true/g))
			yepnope(window.suzi.jsVendorPath + 'suzi.grid.js');
	}
};