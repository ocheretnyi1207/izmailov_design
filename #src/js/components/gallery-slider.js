import {
  DOT_CLASS,
  DOT_ACTIVE_CLASS,
  ITEM_ACTIVE_CLASS
} from "../constants";

const slides = [...document.querySelectorAll(".gallery-slider__item")];
const dots = [...document.querySelectorAll(".gallery-slider__dotted")];

const switchSlide = (arrayDots, dotClass, arrayItems, itemClass, target) => {
  if (arrayDots.length === arrayItems.length) {
    for (let i = 0; i < arrayDots.length; i++) {

      arrayDots[i].classList.remove(dotClass);
      arrayItems[i].classList.remove(itemClass);

      if (target === arrayDots[i]) {
        target.classList.add(dotClass);
        arrayItems[i].classList.add(itemClass)
      }
    }
  }
}

document.addEventListener("click", (evt) => {
  const targetElement = evt.target

  if (targetElement.classList.contains(DOT_CLASS)) {
    switchSlide(dots, DOT_ACTIVE_CLASS, slides, ITEM_ACTIVE_CLASS, targetElement)
  }
})
