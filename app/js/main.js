const html = document.querySelector('html');
const header = document.querySelector('.header');
const burger = document.querySelector('#burger');
const menu = document.querySelector('.menu');
let headerMinHeight = 0;
let lastScrollPosition = 0;

// is Apple
function isApple() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

// header
function resizeHeader() {
  const lengthY = 0;

  if (window.scrollY > lengthY) {
    header.classList.add('small');
  } else {
    header.classList.remove('small');
  }
}

function getHederMinHeght() {
  headerMinHeight = getComputedStyle(header).getPropertyValue('--headerMinHeight');
  return parseFloat(headerMinHeight);
}

function detectScrollDirection() {
  const positionFromTop = window.pageYOffset;
  const nextElement = header.nextElementSibling;

  if (window.scrollY > headerMinHeight) {
    header.classList.add('fixed');
    nextElement.style.paddingTop = `${headerMinHeight}px`;

    if (positionFromTop > lastScrollPosition) {
      header.classList.remove('show');
    } else {
      header.classList.add('show');
    }
  } else if (window.scrollY === 0) {
    header.classList.remove('fixed');
    header.classList.remove('show');
    nextElement.style.paddingTop = '';
  }

  lastScrollPosition = positionFromTop <= 0 ? 0 : positionFromTop;
}

// menu
function openMenu() {
  burger.classList.toggle('open')
  menu.classList.toggle('open')
  html.classList.toggle('scrollOff')
}

burger.addEventListener('click', openMenu)

// news
const newsSlider = document.querySelector('.news__slider');
if (newsSlider) {
  new Swiper(newsSlider, {
    loop: true,
    spaceBetween: 36,
    slidesPerView: 3,
    slidesPerGroup: 3,
    navigation: {
      nextEl: '.news__nav--next',
      prevEl: '.news__nav--prev',
    },
    breakpoints: {
      1: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      581: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1001: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  });
}

// video
const playerWrapper = document.querySelector('.video__player-wrapper');
if (playerWrapper) {
  const player = playerWrapper.querySelector('.video__player');
  const btn = playerWrapper.querySelector('.video__btn');

  btn.addEventListener('click', () => {
    playerWrapper.classList.add('active');

    btn.classList.add('toggleCircle')

    const action = btn.getAttribute('data-action');
    switch (action) {
      case 'play':
        btn.setAttribute('data-action', 'pause');
        player.play();
        break;
      case 'pause':
        btn.setAttribute('data-action', 'play');
        player.pause();
        break;
    }

    setTimeout(() => {
      btn.classList.remove('toggleCircle')
    }, 200)
  })
}

// activity
const activityWrapper = document.querySelector('.activity__inner');

if (activityWrapper) {
  activityWrapper.addEventListener('click', event => {
    const target = event.target.closest('.activity__head');

    if (target && target.classList.contains('activity__head')) {
      const wrapper = event.target.closest('.activity__card');
      const content = wrapper.querySelector('.activity__body');
      const isOpen = wrapper.classList.contains('open');

      if (isOpen) {
        wrapper.classList.remove('open');
        content.style.height = '0px';
      } else {
        wrapper.classList.add('open');
        content.style.height = `${content.scrollHeight}px`;
      }
    }
  })
}

function setHeightOnResize() {
  const cards = document.querySelectorAll('.activity__card.open');
  const isMobile = window.matchMedia('(max-width: 580px)').matches;

  if (cards.length) {
    cards.forEach(card => {
      const content = card.querySelector('.activity__body');
      const text = card.querySelector('.activity__text');
      let imageHeight = 0;

      if (isMobile) {
        const image = card.querySelector('.activity__body img');
        imageHeight = image.clientHeight;
      }

      content.style.height = `${text.clientHeight + imageHeight}px`;
    });
  }
}

// on load
window.addEventListener('load', () => {
  if (isApple()) document.html.classList.add('ios');
  headerMinHeight = getHederMinHeght();
});

// on scroll
window.addEventListener('scroll', () => {
  detectScrollDirection();
  resizeHeader();
  headerMinHeight = getHederMinHeght();
});

// on resize
window.addEventListener('resize', () => {
  headerMinHeight = getHederMinHeght();
  setHeightOnResize();
});