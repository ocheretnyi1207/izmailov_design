import { HEIGHT_SHOW_BTNUP } from "../constants";

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




