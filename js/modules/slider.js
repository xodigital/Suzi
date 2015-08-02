var slider = (function() {
	return {
		swipejs: Modernizr.csstransforms3d || layoutEngine.vendor === 'opera',

		init: function() {
			var $sliderParent = $('.carousel');

			if ($sliderParent.length === 0)
				return;

			$sliderParent.each(function(index) {
				var $this = $(this),
					$slider = $this.find('.slider'),
					$slides = $slider.find('> li'),
					slidesCount = $slides.length,
					$imagesLazy,
					globalPos = 0,
					isComplete = false,
					isVisible = false,
					carouselID = 'carouselid-' + window.location.pathname + '-' + index,
					carouselHasCookie = $this.data('cookie'),
					carouselCookie = carouselHasCookie ? cookie.read(carouselID) : 0,
					circular = $this.data('circular');

				if ($slider.length === 0 || $slides.length === 0)
					return;

				if (slider.swipejs && circular) {
					$slides.eq(0).clone().appendTo($slider);
					$slides.eq(slidesCount - 1).clone().prependTo($slider);
					$slides = $slider.find('> li'),
					slidesCount = slidesCount + 2;
				}

				if (carouselHasCookie)
					globalPos = parseInt(carouselCookie);

				if (slider.swipejs && circular && globalPos === 0)
					globalPos = 1;

				$imagesLazy = $slides.find('.rwdimage');

				if (slidesCount === 1) {
					globalPos = 0;
					slider.lazyLoad($imagesLazy, globalPos);

					var $feature = $this.find('.inner');

					$slides.css('visibility', 'visible');
					$feature.css('visibility', 'visible');
				}
				else {
					var li = '',
						interval = parseInt($this.data('interval') * 1000) || 0,
						counter = $this.data('counter'),
						pager = $this.data('pager'),
						thumbnails = $this.data('pager-thumbnails'),
						nav = $this.data('nav'),
						speed = parseInt($this.data('speed')) || 500;

					var loadAdditional = function(pos, globalPos, slidesCount) {
						slider.lazyLoad($imagesLazy, pos);

						if (pos > globalPos) {
							if (pos < slidesCount - 1) {
								slider.lazyLoad($imagesLazy, pos + 1);

								if (circular && pos === slidesCount - 2 && globalPos === 1) {
									slider.lazyLoad($imagesLazy, pos - 1);
								}
							}
							else if (pos === slidesCount - 1 && globalPos === 0) {
								slider.lazyLoad($imagesLazy, pos - 1);
							}
							else {
								slider.lazyLoad($imagesLazy, 0);
							}
						}
						else if (pos < globalPos) {
							if (pos === 0) {
								if (globalPos > 1)
									slider.lazyLoad($imagesLazy, pos + 1);
								else
									slider.lazyLoad($imagesLazy, pos - 1);
							}
							else if (circular && pos === 1) {
								slider.lazyLoad($imagesLazy, pos - 1);
							}
							else if (pos > 1) {
								slider.lazyLoad($imagesLazy, pos - 1);
							}
							else {
								slider.lazyLoad($imagesLazy, 0);
							}
						}
					};

					slider.lazyLoad($imagesLazy, globalPos, globalPos, slidesCount);

					if (counter) {
						var $slideCounter = $('<div class="carousel__counter" />');
						$this.append($slideCounter);

						var updateSlideCounter = function(slideIndex) {
							$slideCounter[0].innerHTML = (slider.swipejs && circular ? slideIndex : slideIndex + 1) + '/' + (slider.swipejs && circular ? slidesCount - 2 : slidesCount);
						}
					}

					if (pager) {
						var $navPager = $('<ul class="carousel__pager' + (thumbnails ? ' carousel__pager--thumbnails' : '') + ' reset menu" />');
						$this.append($navPager);
					}

					if (nav) {
						var $navContainer = $('<div class="carousel__nav" />'),
							$navPrev = $('<a href="#previous" class="carousel__nav_item carousel__nav_item--prev"><span>Previous</span></a>'),
							$navNext = $('<a href="#next" class="carousel__nav_item carousel__nav_item--next"><span>Next</span></a>');

						$navContainer.append($navPrev).append($navNext)
						$this.append($navContainer);
					}

					if (slider.swipejs) {
						var hasResizeClass = false,
							resizeSwipe = function() {
								$html.removeClass('window_is_resizing');
								hasResizeClass = false;
							};

						$window.resize(function() {
							clearTimeout(window.resizeTimer);

							if (!hasResizeClass) {
								$html.addClass('window_is_resizing');
								hasResizeClass = true;
							}

							window.resizeTimer = setTimeout(resizeSwipe, 250);
						});

						if (pager) {
							for (var i = 1; i <= slidesCount; i++) {
								if (thumbnails)
									li += '<li class="reset carousel__pager_item"><a href="#slide-' + i + '">' + ($slides.eq(i - 1).data('pager-thumbnail') ? '<img src="' + $slides.eq(i - 1).data('pager-thumbnail') + '" alt="Slide ' + i + '" />' : 'Slide ' + i) + '</a></li>';
								else
									li += '<li class="reset carousel__pager_item"><a href="#slide-' + i + '">Slide ' + i + '</a></li>';
							}

							$navPager.append(li);
							var $navPagerLi = $navPager.find('li'),
								$navPagerA = $navPager.find('a');

							if (circular) {
								$navPagerLi.eq(0).hide();
								$navPagerLi.eq(slidesCount - 1).hide();
							}
						}

						var $feature = $this.find('.inner');

						var carousel = new Swipe($feature[0], {
							circular: circular,
							speed: speed,

							complete: function() {
								this.slide(globalPos);
								isComplete = true;

								if (layoutEngine.vendor === 'webkit' && cssua.ua.safari) {
									window.setTimeout(function() {
										isVisible = true;
										$slides.css('visibility', 'visible');
										$feature.css('visibility', 'visible');
									}, speed + 1);
								}
							},

							touchCallback: function() {
								stopCarousel();
							},

							callback: function(e, pos) {
								if (isComplete && !isVisible) {
									isVisible = true;
									$slides.css('visibility', 'visible');
									$feature.css('visibility', 'visible');
								}

								$slides
									.attr('aria-hidden', true)
									.eq(pos)
									.attr('aria-hidden', false);

								loadAdditional(pos, globalPos, slidesCount);

								if (pager) {
									$navPagerLi
										.removeClass('carousel__pager_item--is_current')
										.eq(pos).addClass('carousel__pager_item--is_current');
								}

								if (counter)
									updateSlideCounter(pos);

								if (!interval)
									trackEvent('Website', 'Carousel', 'Slide ' + (pos + 1));

								globalPos = pos;

								if (carouselHasCookie)
									cookie.set(carouselID, globalPos);
							}
						});

						var stopCarousel = function() {
							if (interval) {
								window.clearTimeout(timer);
								interval = false;
							}
						};

						if (nav) {
							$navPrev.on('click', function(e) {
								e.preventDefault();

								carousel.prev();
								stopCarousel();
							});

							$navNext.on('click', function(e) {
								e.preventDefault();

								carousel.next();
								stopCarousel();
							});
						}

						if (pager) {
							$navPagerA.each(function(idx) {
								var $this = $(this),
									$parent = $this.parent();

								$this.on('click', function(e) {
									e.preventDefault();

									slider.lazyLoad($imagesLazy, idx);
									carousel.slide(idx);

									$navPagerLi.removeClass('carousel__pager_item--is_current');
									$parent.addClass('carousel__pager_item--is_current');

									stopCarousel();
								});
							});
						}

						var autoCarousel = function() {
							carousel.next();
						};

						if (interval) {
							var timer = window.setInterval(autoCarousel, interval),
								$tile = $this.find('.carousel__tile');

							$tile.hover(
								function(e) {
									e.stopPropagation();
									if (interval)
										window.clearTimeout(timer);
								},
								function(e) {
									e.stopPropagation();
									if (interval)
										timer = window.setInterval(autoCarousel, interval);
								}
							);
						}
					}
					else {
						// Fix huge horizontal scrollbar on IE8.
						$('.inner').css('overflow', 'hidden');

						$(window).on('resize', function(event) {
							var windowWidth = $(window).width();
							var totalSlides = $('.carousel li').length;

							$('.carousel').width(windowWidth);
							$('.carousel .slider li').width(windowWidth).attr('cycleW', windowWidth);
							
							$('.slider').width(windowWidth * totalSlides);
						});

						var $feature = $this.find('.slider'),
							widthOverride = 'width: 100% !important',

							cycleOpts = {
								activePagerClass: 'carousel__pager_item--is_current',
								cleartypeNoBg: true,
								easing: 'easeInOutQuint',
								fx: 'scrollHorz',
								pause: true,
								speed: speed,
								startingSlide: globalPos,
								timeout: interval,
								after: function(curr, next, opts) {
									var pos = opts.currSlide;

									$slides
										.attr('aria-hidden', true)
										.eq(pos)
										.attr('aria-hidden', false);

									loadAdditional(pos, globalPos, slidesCount);

									if (counter)
										updateSlideCounter(pos);

									globalPos = pos;

									if (carouselHasCookie)
										cookie.set(carouselID, globalPos);
								}
							};

						if (nav) {
							$navPrev.attr('id', 'nav_prev-' + index);
							$navNext.attr('id', 'nav_next-' + index);
							cycleOpts.prev = '#nav_prev-' + index;
							cycleOpts.next = '#nav_next-' + index;
						}

						if (pager) {
							$navPager.attr('id', 'nav_pager-' + index);
							cycleOpts.pager = '#nav_pager-' + index;
							cycleOpts.pagerAnchorBuilder = function(idx, slide) {
								if (thumbnails)
									return '<li class="reset carousel__pager_item"><a href="#slide-' + (idx + 1) + '">' + ($slides.eq(idx).data('pager-thumbnail') ? '<img src="' + $slides.eq(idx).data('pager-thumbnail') + '" alt="Slide ' + (idx + 1) + '" />' : 'Slide ' + (idx + 1)) + '</a></li>';
								else
									return '<li class="reset carousel__pager_item"><a href="#slide-' + (idx + 1) + '">Slide ' + (idx + 1) + '</a></li>';
							};
						}

						$feature.attr('style', widthOverride);
						$slides.attr('style', widthOverride);

						yepnope({
							load: [window.suzi.jsVendorPath + '_bundle.jquery.cycle.js'],
							complete: function() {
								$feature
									.cycle(cycleOpts)
									.css('visibility', 'visible');

								$slides.css('visibility', 'visible');

								if (nav) {
									$navPrev.on('click', function(e) {
										e.preventDefault();
										$feature.cycle('pause');
									});

									$navNext.on('click', function(e) {
										e.preventDefault();
										$feature.cycle('pause');
									});
								}

								if (pager) {
									$navPager.css('z-index', slidesCount + 1).find('a').each(function(i) {
										$(this).on('click', function(e) {
											slider.lazyLoad($imagesLazy.eq(i));
											$feature.cycle('pause');
										});
									});
								}
							}
						});
					}
				}
			});
		},

		lazyLoad: function($imagesLazy, index, globalPos, slidesCount) {
			var $this = $($imagesLazy[index]);

			if ($this.length === 0 || $this.hasClass('lazy-loaded'))
				return;

			$this.addClass('lazy-loaded');
			window.rwdImageChangeSrc($imagesLazy[index]);

			var loadAdditional = function() {
				$this.addClass('has-lazy-loaded');

				if (slidesCount) {
					if (globalPos === 0) {
						slider.lazyLoad($imagesLazy, globalPos + 1);
						slider.lazyLoad($imagesLazy, slidesCount - 1);
					}
					else if (globalPos === slidesCount - 1) {
						slider.lazyLoad($imagesLazy, 0);
						slider.lazyLoad($imagesLazy, globalPos - 1);
					}
					else {
						slider.lazyLoad($imagesLazy, globalPos + 1);
						slider.lazyLoad($imagesLazy, globalPos - 1);
					}
				}
			};

			var src = !!window.getComputedStyle ? window.getComputedStyle($this[0]).getPropertyValue('background-image') : $this[0].currentStyle.backgroundImage,
				img = new Image();

			src = src.replace(/url\((?:\"?)(.*?)(?:\"?)\)/, '$1');

			if (src !== 'none') {
				img.onload = loadAdditional;

				img.src = src;
			}
		}
	};
})();
