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
    // setTimeout(fixHeaderHeight, 300)
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

// on load
window.addEventListener('load', () => {
  if (isApple()) document.html.classList.add('ios');
  fixHeaderHeight();
});

// on scroll
document.addEventListener('scroll', () => {
  resizeHeader();
});