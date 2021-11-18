const html = document.querySelector('html');
const header = document.querySelector('.header');
const burger = document.querySelector('#burger');
const menu = document.querySelector('.menu');

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
    fixHeaderHeight();
  } else {
    header.classList.remove('small');
    fixHeaderHeight();
  }
}

// фиксим проваливание блока идущего после fixed header
function fixHeaderHeight() {
  const maxHeight = '100vh';
  const minHeight = '215px';

  header.nextElementSibling.style.transition = '.5s';
  header.nextElementSibling.style.paddingTop = header.classList.contains('small') ? minHeight : maxHeight;
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
const activities = document.querySelectorAll('.activity__card');

if (activityWrapper) {
  activityWrapper.addEventListener('click', event => {
    const target = event.target.closest('.activity__card');

    if (target && target.classList.contains('activity__card')) {
      const content = target.querySelector('.activity__body');

      activities.forEach(activity => {
        const content = activity.querySelector('.activity__body');
        activity.classList.remove('open');
        content.style.height = '';
      })

      content.style.height = `${content.scrollHeight}px`;
      target.classList.add('open')
    }
  })

}

// on load
window.addEventListener('load', () => {
  if (isApple()) document.html.classList.add('ios');
  fixHeaderHeight();
});

// on scroll
document.addEventListener('scroll', () => {
  resizeHeader();
});