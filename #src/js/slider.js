let index = 0;

document.addEventListener("click", (evt) => {
  const activeSlide = (n) => {
    slides.forEach((element) => {
      return element.classList.remove("slider__item--active")
    })
    slides[n].classList.add("slider__item--active")
  }

  const prevSlide = () => {
    if (index === 0) {
      index = slides.length -1;
      activeSlide(index);
    } else {
      index --;
      activeSlide(index);
    }
  }

  const nextSLide = () => {
    if (index === slides.length - 1) {
      index = 0;
      activeSlide(index)
    } else {
      index ++;
      activeSlide(index);
    }
  }

  const slider = evt.target.parentNode;
  const slides = slider.querySelectorAll(".slider__item");

  if(evt.target.classList.contains("slider__btn--next")) {
    nextSLide();
  }

  if (evt.target.classList.contains("slider__btn--prev")) {
    prevSlide();
  }
});

