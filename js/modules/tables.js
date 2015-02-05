var tables = {
	init: function() {
		if (layoutEngine.vendor === 'ie' && layoutEngine.version === 9)
			this.gridFix();
	},
	
	gridFix: function() {
		$('.data_table').each(function() {
			$(this).append('<tr class="ie9_grid_dummy"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		});
	}
};