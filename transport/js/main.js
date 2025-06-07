(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


// My custom js

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });


// Booking section js

  const localTrips = [
    { destination: 'Lagos ➔ Abuja', price: '₦7,500' },
    { destination: 'Lagos ➔ Ibadan', price: '₦4,000' },
    { destination: 'Lagos ➔ Port Harcourt', price: '₦9,000' },
    { destination: 'Lagos ➔ Owerri', price: '₦6,000' },
    { destination: 'Lagos ➔ Asaba', price: '₦5,000' },
    { destination: 'Lagos ➔ Enugu', price: '₦8,500' },
  ];

  const internationalTrips = [
    { destination: 'Lagos ➔ Accra', price: '₦25,000' },
    { destination: 'Lagos ➔ Cotonou', price: '₦20,000' },
    { destination: 'Lagos ➔ Lome', price: '₦22,000' },
  ];

  function renderTrips(type) {
    const container = document.getElementById("trip-grid");
    const trips = type === 'local' ? localTrips : internationalTrips;
    container.innerHTML = trips.map((trip, index) => 
    `
    <div class="trip-card wow fadeInUp" data-wow-delay="${index * 0.2}s">
        <img src="img/bus-icon.png" alt="bus icon">
        <div class="trip-details">
            <div class="destination">
                <small>Destination:</small>
                <h4>${trip.destination}</h4>
            </div>
            <div class="price">
                <small>Price:</small>
                <h4>${trip.price}</h4>
            </div>
        </div>
    </div>
    `
).join('');

// Re-init WOW for dynamically added elements
new WOW().init();
}

  function filterTrips(type) {
    document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTrips(type);
  }

  const modal = document.getElementById("bookingForm");

  function openForm() {
    modal.style.display = 'block';
  }

  // Close modal when clicking outside the content
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
        modal.style.display = "none";
        }
    });

  function closeForm() {
    modal.style.display = 'none';
  }

  function saveBooking(e) {
    e.preventDefault();
    alert("Booking submitted successfully!");
    closeForm();
  }

  // Initialize with Local trips
  window.onload = () => renderTrips('local');

