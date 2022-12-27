const ESCKEYCODE = 32;

const btnOpenMenu = document.querySelector(".page-header__btn");
const navListHeader = document.querySelector(".nav-list--header");
const btnOpenMenuCatalog = document.querySelector(".catalog-navigation__btn");
const catalogMenu = document.querySelector(".catalog-list");

btnOpenMenu.addEventListener("click", () => {
  navListHeader.classList.toggle("nav-list--disable")
});

btnOpenMenu.addEventListener("keydown", (evt) => {
  evt.preventDefault()
  if (evt.keyCode === ESCKEYCODE) {
    navListHeader.classList.toggle("nav-list--disable")
  }
})

btnOpenMenuCatalog.addEventListener("click", () => {
  catalogMenu.classList.toggle("catalog-list--active")
})

btnOpenMenuCatalog.addEventListener("keydown", (evt) => {
  evt.preventDefault()
  if (evt.keyCode === ESCKEYCODE) {
    catalogMenu.classList.toggle("catalog-list--active")
  }
})


