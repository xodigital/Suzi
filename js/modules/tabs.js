var tabs = {
	init: function() {
		var $tabs = $('.tabs');
		
		$tabs.each(function(index) {
			var $this = $(this),
				$links = $this.find('> li a'),
				$panes = $this.nextAll('.panes:first').find('> .pane'),
				tabID = 'tabid-' + window.location.pathname + '-' + index,
				tabHasCookie = $this.data('cookie'), 
				tabCookie = tabHasCookie ? cookie.read(tabID) : 0;
			
			if (tabHasCookie) {
				$links.eq(tabCookie).addClass('tab--is_current');
				$panes.hide().attr('aria-hidden', true);
				$panes.eq(tabCookie).show().attr('aria-hidden', false);
			}
			else {
				$links.eq(0).addClass('tab--is_current');
				$panes.not(':first').attr('aria-hidden', true);
			}
			
			$links.on('click', function(e) {
				e.preventDefault();
				
				var $this = $(this),
					idx = $this.parent().index();
				
				if (!$this.hasClass('tab--is_current')) {
					$links.removeClass('tab--is_current');
					$this.addClass('tab--is_current');
				}
				
				$panes.hide().attr('aria-hidden', true);
				$panes.eq(idx).show().attr('aria-hidden', false);
				
				if (tabHasCookie)
					cookie.set(tabID, idx);
				
				trackEvent('Website', 'Tabs', tabID + '-' + idx);
			});
		});
	}
};