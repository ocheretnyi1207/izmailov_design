import { ESCKEYCODE } from "../constants";

const btnOpenMenu = document.querySelector(".page-header__btn");
const navListHeader = document.querySelector(".nav-list--header");

btnOpenMenu.addEventListener("click", () => {
  navListHeader.classList.toggle("nav-list--disable");
});

btnOpenMenu.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.keyCode === ESCKEYCODE) {
    navListHeader.classList.toggle("nav-list--disable");
  }
});