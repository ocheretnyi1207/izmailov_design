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

document.addEventListener("click", (evt) => {
  if (navListHeader) {
    const positionNavListHeader = navListHeader.getBoundingClientRect();
    const xMin = positionNavListHeader.left;
    const xMax = positionNavListHeader.right;
    const yMin = positionNavListHeader.top;
    const yMax = positionNavListHeader.bottom;

    if (evt.clientX < xMin || evt.clientX > xMax || evt.clientY < yMin || evt.clientY > yMax) {
      navListHeader.classList.add("nav-list--hide");
    }
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
