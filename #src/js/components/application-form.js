import {
  URL_ORDER,
  ASYNC,
  STATUS_SERVER_OK
} from "../constants";

const applicationForm = document.querySelector(".application-form");

applicationForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(applicationForm);
  const xhr = new XMLHttpRequest();

  xhr.open("post", URL_ORDER, ASYNC);

  xhr.onload = () => {
    if (xhr.status === STATUS_SERVER_OK) {
      const itName = applicationForm.querySelector(".application-form__element--username");
      const itPhone = applicationForm.querySelector(".application-form__element--userphone");
      itName.value = "";
      itPhone.value = "";
    } else {
      const itName = applicationForm.querySelector(".application-form__element--username");
      const itPhone = applicationForm.querySelector(".application-form__element--userphone");
      itName.value = "";
      itPhone.value = "";
      alert(`Сообщение не было доставлено. Ошибка + ${xhr.status}`)
    }
  }

  xhr.send(formData);
});
