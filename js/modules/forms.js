var forms = (function() {
	return {
		requiredFields: [],

		init: function() {
			$('form').each(function(index) {
				var $this = $(this);
				forms.requiredFields[index] = $this.find('[required]');

				$this.on('submit', function() {
					return forms.validate($this, index);
				});
			});
		},

		validate: function(form, index) {
			var $requireds = $(forms.requiredFields[index]),
				errors = false;

			$requireds.removeClass('form_error').removeClass('tested');

			$requireds.each(function() {
				var $this = $(this);

				if ($this.is('[type="radio"], [type="checkbox"]') && !$this.hasClass('tested')) {
					var name = $this.attr('name'),
						$radioChecks = $requireds.filter('[name="' + name + '"]');

					if (!$radioChecks.is(':checked'))
						$radioChecks.addClass('form_error');

					$radioChecks.addClass('tested');
				}

				if ($.trim($this.val()).length === 0) {
					$this.addClass('form_error');
					errors = true;
				}
			});

			$requireds.filter('.form_error:first').focus();

			return !errors;
		}
	};
})();
