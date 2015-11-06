var placeholder = (function() {
	return {
		init: function() {
			if (!Modernizr.placeholder) {
				$('[placeholder]').each(function() {
					var $this = $(this),
						attr = this.getAttribute('placeholder');

					$this.focus(function() {
						if (this.value === attr) {
							$this.removeClass('placeholder')[0].value = '';
						}
					}).blur(function() {
						if (this.value.length === 0 || this.value === attr) {
							$this.addClass('placeholder')[0].value = attr;
						}
					}).blur();

					$this.parents('form').on('submit', function() {
						if ($this[0].value === attr) {
							$this[0].value = '';
						}
					});
				});

				$html.addClass('placeholder');

			}
		}
	};
})();
