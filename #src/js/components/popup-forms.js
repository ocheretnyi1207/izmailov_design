import {
  BLACKOUT_ACTIVE_CLASS,
  BLACKOUT_DISABLE_SCROLL,
  ESCKEYCODE,
  METHOD,
  ASYNC,
  URL
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

  if (target.classList.contains("description__btn--getorder")) {
    const template = document.querySelector(".form-order");
    const form = template.content.firstElementChild.cloneNode(true);
    const closeBtnForm = form.querySelector(".popup-form__button");

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const formData = new FormData(form);
      console.log(formData)
      const xhr =  new XMLHttpRequest();

      xhr.open(METHOD, URL, ASYNC);

      xhr.onload = () => {
        if (xhr.status === 200) {
          alert("Сообщение было отправлено");
        } else {
          alert("Сообщение не оптравлено. Ошибка " + xhr.status);
        }
      }

      xhr.send(formData);

    })

    showForm(popup, form);

    closeBtnForm.addEventListener("click", () => {
      hideForm(popup);
    });
  }

  if (target.classList.contains("description__btn--getprice")) {
    const template = document.querySelector(".form-price");
    const form = template.content.firstElementChild.cloneNode(true);
    const closeBtnForm = form.querySelector(".popup-form__button");

    showForm(popup, form);

    closeBtnForm.addEventListener("click", () => {
      hideForm(popup);
    });
  }
});
