const ESCKEYCODE = 32;
const HEIGHT_SHOW_BTNUP = 800;

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

const btnUp = document.querySelector(".btn-up");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  scrollY > HEIGHT_SHOW_BTNUP ? btnUp.classList.remove("btn-up--hide") : btnUp.classList.add("btn-up--hide");

  btnUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });
});




