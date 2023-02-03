import {
  BLACKOUT_ACTIVE_CLASS,
  BLACKOUT_DISABLE_SCROLL,
  ESCKEYCODE,
  METHOD,
  ASYNC,
  URL_ORDER,
  URL_PRICE,
  STATUS_SERVER_OK
} from "../constants";

const popup = document.querySelector(".popup");
const blackout = document.querySelector(".blackout");
const body = document.querySelector("body");

const activeBlackout = () => {
  blackout.classList.add(BLACKOUT_ACTIVE_CLASS);
  body.classList.add(BLACKOUT_DISABLE_SCROLL);
}

const disableBlackout = () => {
  blackout.classList.remove(BLACKOUT_ACTIVE_CLASS);
  body.classList.remove(BLACKOUT_DISABLE_SCROLL);
}

const showForm = (parent, child) => {
  parent.append(child);
  activeBlackout();
}

const hideForm = (element) => {
  element.removeChild(document.querySelector(".popup-form"))
  disableBlackout();
}

const sendForm = (element, URL) => {
  element.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const formData = new FormData(element);
    const xhr = new XMLHttpRequest();

    xhr.open(METHOD, URL, ASYNC);

    xhr.onload = () => {
      if (xhr.status === STATUS_SERVER_OK) {
        element.classList.add("popup-form--success");

        const btnCloseForm = element.querySelector(".popup-form__button");

        btnCloseForm.classList.contains("popup-form__button--order") ? btnCloseForm.classList.add("popup-form__button--ordersuccess") : btnCloseForm.classList.add("popup-form__button--pricesuccess");

        element.append(btnCloseForm);

        const fieldset = element.querySelector(".popup-form__element--fieldset");
        fieldset.parentNode.removeChild(fieldset);

        const pStatus = document.createElement("p");
        pStatus.textContent = "Отлично!";
        pStatus.classList.add("popup-form__element", "popup-form__element--success");
        element.prepend(pStatus);

        const pMessage = document.createElement("p");
        pMessage.textContent = `В скором времени, мы свяжемся с Вами, для уточнения деталей`;
        pMessage.classList.add("popup-form__element", "popup-form__element--success");
        pStatus.after(pMessage)
      } else {
        element.classList.add("popup-form--error");

        const btnCloseForm = element.querySelector(".popup-form__button");

        btnCloseForm.classList.contains("popup-form__button--order") ? btnCloseForm.classList.add("popup-form__button--ordererror") : btnCloseForm.classList.add("popup-form__button--priceerror");

        element.append(btnCloseForm);

        const fieldset = element.querySelector(".popup-form__element--fieldset");
        fieldset.parentNode.removeChild(fieldset);

        const pStatus = document.createElement("p");
        pStatus.textContent = "Неудача!";
        pStatus.classList.add("popup-form__element", "popup-form__element--error");
        element.prepend(pStatus);

        const pMessage = document.createElement("p");
        pMessage.textContent = `Сообщение не доставлено. Ошибка ${xhr.status}`;
        pMessage.classList.add("popup-form__element", "popup-form__element--error");
        pStatus.after(pMessage)
      }
    }

    xhr.send(formData);
  })
}

document.addEventListener("keydown", (evt) => {
  if (evt.keyCode === ESCKEYCODE || evt.key === "Escape") {
    hideForm(popup);
  }
});

document.addEventListener("click", (evt) => {
  const popupForm = document.querySelector(".popup-form");

  if (popupForm) {
    const positionForm = popupForm.getBoundingClientRect();
    const xMin = positionForm.left;
    const xMax = positionForm.right;
    const yMin = positionForm.top;
    const yMax = positionForm.bottom;

    if (evt.clientX < xMin || evt.clientX > xMax || evt.clientY < yMin || evt.clientY > yMax) {
      hideForm(popup);
    }
  }
});

document.addEventListener("click", (evt) => {
  const target = evt.target;

  if (target.classList.contains("description__btn--getorder") || target.classList.contains("contacts-info__btn")) {
    const template = document.querySelector(".form-order");
    const form = template.content.firstElementChild.cloneNode(true);
    const closeBtnForm = form.querySelector(".popup-form__button");

    showForm(popup, form);
    sendForm(form, URL_ORDER);

    closeBtnForm.addEventListener("click", () => {
      hideForm(popup);
    });
  }

  if (target.classList.contains("description__btn--getprice") || target.classList.contains("header-content__btn--getprice") || target.classList.contains("how-works__btn")) {
    const template = document.querySelector(".form-price");
    const form = template.content.firstElementChild.cloneNode(true);
    const closeBtnForm = form.querySelector(".popup-form__button");

    showForm(popup, form);
    sendForm(form, URL_PRICE);

    closeBtnForm.addEventListener("click", () => {
      hideForm(popup);
    });
  }
});
