function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    // Half way
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // Bottom of image
    console.log(slideInAt)
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    // Makes sure slide in value is greater than top of image
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    // Makes sure we are not scrolled all the way pas the image because if we are we want to slide image back out of window
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));