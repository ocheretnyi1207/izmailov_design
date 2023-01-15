const ESCKEYCODE = 32;

const btnOpenMenuCatalog = document.querySelector(".catalog-navigation__btn");
const catalogMenu = document.querySelector(".catalog-list");

btnOpenMenuCatalog.addEventListener("click", () => {
  catalogMenu.classList.toggle("catalog-list--active");
});

btnOpenMenuCatalog.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.keyCode === ESCKEYCODE) {
    catalogMenu.classList.toggle("catalog-list--active");
  }
});


