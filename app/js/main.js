const html = document.querySelector('html');
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
  const header = document.querySelector('.header');
  const lengthY = 30;

  if (window.scrollY > lengthY) {
    header.classList.add('small');
  } else {
    header.classList.remove('small');
  }
}

// menu
function openMenu() {
  burger.classList.toggle('open')
  menu.classList.toggle('open')
  html.classList.toggle('scrollOff')
}

burger.addEventListener('click', openMenu)

// on load
window.addEventListener('load', () => {
  if (isApple()) document.html.classList.add('ios');
});

// on scroll
document.addEventListener('scroll', () => {
  resizeHeader();
});