import {
  ESCKEYCODE,
  SPACEKEYCODE
} from "../constants";

const btnOpenMenu = document.querySelector(".page-header__btn");
const navListHeader = document.querySelector(".nav-list--header");

btnOpenMenu.addEventListener("click", (evt) => {
  evt.stopPropagation();
  navListHeader.classList.toggle("nav-list--hide");
});

document.addEventListener("click", () => {
  if (!navListHeader.classList.contains("nav-list--hide")) {
    navListHeader.classList.add("nav-list--hide");
  }
});

btnOpenMenu.addEventListener("keydown", (evt) => {
  evt.preventDefault();

  switch (evt.keyCode) {
    case SPACEKEYCODE:
      navListHeader.classList.toggle("nav-list--hide");
      break;

    case ESCKEYCODE:
      navListHeader.classList.add("nav-list--hide");
      break;
  }
});
