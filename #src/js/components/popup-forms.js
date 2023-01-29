import { BLACKOUT_ACTIVE_CLASS, BLACKOUT_DISABLE_SCROLL, ESCKEYCODE} from "../constants";

const popup = document.querySelector(".popup");
const blackout = document.querySelector(".blackout");
const body = document.querySelector("body");
const catalogProducts = document.querySelector(".catalog-products");


const activeBlackout = () => {
  blackout.classList.add(BLACKOUT_ACTIVE_CLASS);
  body.classList.add(BLACKOUT_DISABLE_SCROLL);
}

const disableBlackout = () => {
  blackout.classList.remove(BLACKOUT_ACTIVE_CLASS);
  body.classList.remove(BLACKOUT_DISABLE_SCROLL);
}

document.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.keyCode === ESCKEYCODE || evt.key === "Escape") {
    popup.removeChild(document.querySelector(".popup-form"))
    disableBlackout();
  }
});

// document.addEventListener("click", () => {
//     popup.removeChild(document.querySelector(".popup-form"))
//     disableBlackout();
// });

catalogProducts.addEventListener("click", (evt) => {
  evt.stopPropagation();
  const target = evt.target;

  if (target.classList.contains("description__btn--getorder")) {
    const template = document.querySelector(".form-order");
    const form = template.content.cloneNode(true);
    const closeBtnForm = form.querySelector(".popup-form__button")

    popup.append(form);
    activeBlackout();

    closeBtnForm.addEventListener("click", () => {
      popup.removeChild(document.querySelector(".popup-form"))
      disableBlackout();
    });
  }

  if (target.classList.contains("description__btn--getprice")) {
    const template = document.querySelector(".form-price");
    const form = template.content.cloneNode(true);
    const closeBtnForm = form.querySelector(".popup-form__button")

    popup.append(form);
    activeBlackout();

    closeBtnForm.addEventListener("click", () => {
      popup.removeChild(document.querySelector(".popup-form"))
      disableBlackout();
    })
  }
})

