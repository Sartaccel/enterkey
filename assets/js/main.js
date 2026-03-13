/**
* Template Name: UpConstruction
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  // Scroll-to-top functionality
  const scrollTop = document.querySelector('.scroll-top');

  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };

    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);

    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Add animation class
      const animClass = scrollTop.getAttribute('data-animation');
      const removeTime = parseInt(scrollTop.getAttribute('data-remove'), 10);

      if (scrollTop.classList.contains(animClass)) {
        scrollTop.classList.remove(animClass);
      } else {
        scrollTop.classList.add(animClass);

        if (!isNaN(removeTime)) {
          setTimeout(() => {
            scrollTop.classList.remove(animClass);
          }, removeTime);
        }
      }
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function (el) {
        el.addEventListener('click', function () {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


// Function to track and update background position based on pointer for dark btn
function moveBg(e) {
  const rect = e.target.getBoundingClientRect();
  e.target.style.setProperty('--x', (e.clientX - rect.x) / rect.width * 100);
  e.target.style.setProperty('--y', (e.clientY - rect.y) / rect.height * 100);
}

// Add pointer movement listener to the button for dark btn
document.querySelector("button").addEventListener('pointermove', moveBg);

// Intro animation for button for dark btn
let x;
function intro() {
  let i = 4;
  const button = document.querySelector("button");
  button.style.setProperty("--a", '100%');
  x = setInterval(() => {
    button.style.setProperty("--x", ((Math.cos(i) + 2) / 3.6) * 100);
    button.style.setProperty("--y", ((Math.sin(i) + 2) / 3.6) * 100);
    i += 0.03;
    if (i > 11.5) {
      clearInterval(x);
      button.style.setProperty("--a", '');
    }
  }, 16);
}

intro();

// Clear intro animation on hover for dark btn
document.querySelector("button").addEventListener('pointerover', (e) => {
  clearInterval(x);
  e.target.style.setProperty("--a", '');
});

//cursor animation
console.clear();

const { gsap } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
let isStuck = false;
let mouse = {
  x: -100,
  y: -100,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener('scroll', function (e) {
  scrollHeight = window.scrollY
})

let cursorOuterOriginalState = {
  width: cursorOuter.getBoundingClientRect().width,
  height: cursorOuter.getBoundingClientRect().height,
};
const buttons = document.querySelectorAll(" .foot-body a, .scroll-top");

buttons.forEach((button) => {
  button.addEventListener("pointerenter", handleMouseEnter);
  button.addEventListener("pointerleave", handleMouseLeave);
});

document.body.addEventListener("pointermove", updateCursorPosition);
document.body.addEventListener("pointerdown", () => {
  gsap.to(cursorInner, 0.15, {
    scale: 2,
  });
});
document.body.addEventListener("pointerup", () => {
  gsap.to(cursorInner, 0.15, {
    scale: 1,
  });
});

function updateCursorPosition(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

function updateCursor() {
  gsap.set(cursorInner, {
    x: mouse.x,
    y: mouse.y,
  });

  if (!isStuck) {
    gsap.to(cursorOuter, {
      duration: 0.15,
      x: mouse.x - cursorOuterOriginalState.width / 2,
      y: mouse.y - cursorOuterOriginalState.height / 2,
    });
  }

  requestAnimationFrame(updateCursor);
}

updateCursor();

function handleMouseEnter(e) {
  isStuck = true;
  const targetBox = e.currentTarget.getBoundingClientRect();
  gsap.to(cursorOuter, 0.2, {
    x: targetBox.left,
    y: targetBox.top + scrollHeight,
    width: targetBox.width,
    height: targetBox.width,
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  });
}

function handleMouseLeave(e) {
  isStuck = false;
  gsap.to(cursorOuter, 0.2, {
    width: cursorOuterOriginalState.width,
    height: cursorOuterOriginalState.width,
    borderRadius: "50%",
    backgroundColor: "transparent",
  });
}