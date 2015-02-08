var accordion = (function() {
	return {
		init: function() {
			var $accordion = $('.accordion');

			if ($accordion.length === 0)
				return;

			$accordion.each(function(index) {
				var $this = $(this),
					$accordionLinks = $this.find('> ul > li > .accordion_toggler'),
					$accordionContent = $this.find('> ul > li > .accordion_content'),
					multiple = $this.data('multiple'),
					accordionID = 'accordionid-' + window.location.pathname + '-' + index,
					accordionHasCookie = multiple ? false : $this.data('cookie'),
					accordionCookie = accordionHasCookie ? cookie.read(accordionID) : 0;

				if ($accordionLinks.length === 0)
					return;
				else if ($accordionLinks.length === 1)
					multiple = true;

				$accordionContent.each(function() {
					transition.storeInitial($(this));
				});

				$accordionLinks.each(function(idx) {
					var $this = $(this),
						$accordionContentIndex = $accordionContent.eq(idx);

					if (!multiple || accordionHasCookie) {
						if (!accordionHasCookie) {
							if ($this.hasClass('accordion_toggler--to_open'))
								accordionCookie = idx;
						}

						if (parseInt(accordionCookie) === idx) {
							$accordionLinks.removeClass('accordion_toggler--is_open');
							$accordionContent.attr('aria-hidden', true).css('height', '0');

							$this.addClass('accordion_toggler--is_open');

							$accordionContentIndex.attr('aria-hidden', false).css('height', 'auto');
						}
					}
					else {
						if ($this.hasClass('accordion_toggler--to_open')) {
							$this.removeClass('accordion_toggler--to_open').addClass('accordion_toggler--is_open');

							$accordionContentIndex.attr('aria-hidden', false).css('height', 'auto');

							if (!multiple && accordionHasCookie)
								cookie.set(accordionID, idx);
						}
					}

					$this.on('click', function(e) {
						e.preventDefault();

						var $this = $(this),
							$accordionContentSibling = $this.next(),
							transitionPropertyValue = 'auto',
							transitionDuration = $accordionContentSibling.data('transition-duration'),
							transitionTimingFunction = $accordionContentSibling.data('transition-timing-function'),
							ariaHidden = false;

						if (!multiple) {
							$accordionLinks.removeClass('accordion_toggler--to_open accordion_toggler--is_open');

							$accordionContent.each(function(index) {
								if (index === idx)
									$(this).attr('aria-hidden', false).transition({height: transitionPropertyValue}, transitionDuration, transitionTimingFunction);
								else
									$(this).attr('aria-hidden', true).transition({height: 0}, transitionDuration, transitionTimingFunction);
							});

							$this.addClass('accordion_toggler--is_open');
						}
						else {
							$this.toggleClass('accordion_toggler--is_open');

							if ($accordionContentSibling.attr('aria-hidden') == 'false') {
								ariaHidden = true;
								transitionPropertyValue = 0;
							}

							$accordionContentSibling.attr('aria-hidden', ariaHidden).transition({height: transitionPropertyValue}, transitionDuration, transitionTimingFunction);
						}

						if (!multiple && accordionHasCookie) {
							cookie.set(accordionID, idx);
							trackEvent('Website', 'Accordions', accordionID + '-' + idx);
						}
					});
				});
			});

			transition.overrideDefault('.accordion_content');
		}
	};
})();
