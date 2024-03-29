import {
  ESCKEYCODE,
  SPACEKEYCODE
} from "../constants";

const btnOpenMenuCatalog = document.querySelector(".catalog-navigation__btn");
const catalogMenu = document.querySelector(".catalog-list");

btnOpenMenuCatalog.addEventListener("click", (evt) => {
  evt.stopPropagation();
  catalogMenu.classList.toggle("catalog-list--active");
});

document.addEventListener("click", () => {
  if (catalogMenu.classList.contains("catalog-list--active")) {
    catalogMenu.classList.remove("catalog-list--active");
  }
});

btnOpenMenuCatalog.addEventListener("keydown", (evt) => {
  evt.preventDefault();

  switch (evt.keyCode) {
    case SPACEKEYCODE:
      catalogMenu.classList.toggle("catalog-list--active");
      break;

    case ESCKEYCODE:
      catalogMenu.classList.remove("catalog-list--active");
      break;
  }
});
