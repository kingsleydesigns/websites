(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.trending-box');
	const filtersElem = document.querySelector('.trending-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.trending-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});

				// Delay a bit to let Isotope finish rearranging DOM before recalculating AOS
				setTimeout(resetAOSDelays, 100); // or use 0 if you don't notice a delay

				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}

	}


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});
    


})(window.jQuery);


window.addEventListener("load", () => {
    window.dispatchEvent(new Event("resize"));
    AOS.refresh(); // Important if you’re using animations
  });

  function resetAOSDelays() {
	const visibleCards = document.querySelectorAll('.cards'); // all items
	let index = 0;
	visibleCards.forEach(card => {
		// Only apply delay if item is currently visible in the grid
		if (card.style.display !== 'none') {
			card.setAttribute('data-aos-delay', (index * 100).toString());
			index++;
		}
	});
	AOS.refreshHard(); // Important to apply the new delays
}



VanillaTilt.init(document.querySelectorAll(".cards"), {
	max: 15,
	speed: 400,
	scale: 1.05,
	glare: true,
	"max-glare": 0.2,
  });


// Prevent the default action of the 'Shop' link (reloading the page or navigating away)
const shopLink = document.querySelector('.shop-link');
shopLink.addEventListener('click', function(event) {
  event.preventDefault(); // Prevents the default action (page reload/navigation)
});



document.addEventListener('DOMContentLoaded', function() {
	// Function to check if we're on mobile
	function isMobile() {
	  return window.innerWidth <= 767; // Adjust breakpoint as needed
	}
	
	const shopLink = document.querySelector('.shop-link');
	
	// Handle shop link click
	shopLink.addEventListener('click', function(e) {
	  if (isMobile()) {
		e.preventDefault();
		
		const hasSubmenu = this.parentElement;
		const submenu = hasSubmenu.querySelector('.submenu');
		
		// Toggle an expanded class instead of changing display directly
		hasSubmenu.classList.toggle('expanded');
		
		// Here's the key change: when using classList.toggle, it returns
		// a boolean indicating if the class was added or removed
		if (hasSubmenu.classList.contains('expanded')) {
		  // Clone each submenu item and insert directly after the Shop item
		  const submenuItems = submenu.querySelectorAll('li');
		  const fragment = document.createDocumentFragment();
		  
		  submenuItems.forEach(item => {
			const clonedItem = item.cloneNode(true);
			clonedItem.classList.add('mobile-submenu-item');
			fragment.appendChild(clonedItem);
		  });
		  
		  // Insert all submenu items after the Shop list item
		  if (hasSubmenu.nextSibling) {
			hasSubmenu.parentNode.insertBefore(fragment, hasSubmenu.nextSibling);
		  } else {
			hasSubmenu.parentNode.appendChild(fragment);
		  }
		} else {
		  // Remove the inserted mobile submenu items
		  const mobileItems = document.querySelectorAll('.mobile-submenu-item');
		  mobileItems.forEach(item => item.remove());
		}
	  }
	});
  });