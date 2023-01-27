import { POPUP_FORM_ACTIVE_CLASS, BLACKOUT_ACTIVE_CLASS, BLACKOUT_DISABLE_SCROLL } from "../constants";

const body = document.querySelector("body")
const blackout = document.querySelector(".blackout");
const btnGetOrder = document.querySelector(".description__btn--getorder");
const btnGetPrice = document.querySelector(".description__btn--getprice");
const formGetOrder = document.querySelector(".popup-form--getorder");
const formGetPrice = document.querySelector(".popup-form--getprice");
const btnCloseFormGetOrder = formGetOrder.querySelector(".popup-form__button");
const btnCloseFormGetPrice = formGetPrice.querySelector(".popup-form__button");

const activeBlackout = () => {
  blackout.classList.add(BLACKOUT_ACTIVE_CLASS);
  body.classList.add(BLACKOUT_DISABLE_SCROLL);
}

const disableBlackout = () => {
  blackout.classList.remove(BLACKOUT_ACTIVE_CLASS);
  body.classList.remove(BLACKOUT_DISABLE_SCROLL);
}


btnGetOrder.addEventListener("click", (evt) => {
  evt.preventDefault();
  formGetOrder.classList.add(POPUP_FORM_ACTIVE_CLASS);
  activeBlackout();
});


btnGetPrice.addEventListener("click", (evt) => {
  evt.preventDefault();
  formGetPrice.classList.add(POPUP_FORM_ACTIVE_CLASS);
  activeBlackout();
});


btnCloseFormGetOrder.addEventListener("click", (evt) => {
  evt.preventDefault();
  formGetOrder.classList.remove(POPUP_FORM_ACTIVE_CLASS);
  disableBlackout();
});

btnCloseFormGetPrice.addEventListener("click", (evt) => {
  evt.preventDefault();
  formGetPrice.classList.remove(POPUP_FORM_ACTIVE_CLASS)
  disableBlackout();
});

