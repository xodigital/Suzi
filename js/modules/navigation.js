var navigation = (function() {
	var $toggle = $('#nav_toggle'),
    sitePanel = document.getElementById('site'),
    navPanel = document.getElementById('nav_main'),
    navOpen = false,
    windowWidth = window.innerWidth;
  
  return {
    closeNav: function() {
      navOpen = false;
      $html.removeClass('translating navigation_drawer--visible');
      html.removeAttribute("style");
    },
    
    touch: function() {
      var slidingNav = new swinch(html, {
        onMove: function(distance, direction) {
          if (!$html.hasClass('navigation_drawer--visible'))
            return;
          
          if (direction == 'left')
            return;
          
          var openNavPos = parseInt((windowWidth / 100) * 80),
              newSiteTranslation = - openNavPos + distance;

          if (newSiteTranslation > 0) {
            navigation.closeNav();
            return;
          }
          
          $html.addClass('translating');
          html.style.transform = 'translateX(' + newSiteTranslation + 'px)';
        },
        
        onEnd: function(distance, direction, time) {
          if (navOpen == true)
          	navigation.closeNav();
        }
    	});
    },

    nonTouch: function() {
      $toggle.on('click', function(e) {
      	e.preventDefault();
        e.stopPropagation();
        $html.toggleClass('navigation_drawer--visible');
        
        if ($html.hasClass('navigation_drawer--visible'))
          navOpen = true;
        else
          navOpen = false;
      });

      $html.on('click', function(e) {
        var $this = $(this);

        if ($this.hasClass('navigation_drawer--visible')) {
          e.preventDefault();
          $this.removeClass('navigation_drawer--visible');
          navOpen = false;
        }
      });

      $('#nav_main, #nav_main li a').on('click', function(e) {
        e.stopPropagation();
      });
    },
    
    init: function() {
      this.closeNav();
      this.touch();
      this.nonTouch();
    }
  }
})();