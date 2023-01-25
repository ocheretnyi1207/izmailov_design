import { ESCKEYCODE } from "../constants";

const btnOpenMenu = document.querySelector(".page-header__btn");
const navListHeader = document.querySelector(".nav-list--header");

btnOpenMenu.addEventListener("click", (evt) => {
  evt.stopPropagation();
  navListHeader.classList.toggle("nav-list--hide");
});

btnOpenMenu.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  navListHeader.classList.toggle("nav-list--hide");
});

document.addEventListener("click", () => {
  if (!navListHeader.classList.contains("nav-list--hide")) {
    navListHeader.classList.add("nav-list--hide");
  }
});

document.addEventListener("keydown", (evt) => {
  if (!navListHeader.classList.contains("nav-list--hide") && evt.key === ESCKEYCODE) {
    navListHeader.classList.add("nav-list--hide");
  }
});

