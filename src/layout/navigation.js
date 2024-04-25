import openIcon from "/src/img/nav-menu.svg";
import closeIcon from "/src/img/close-button.svg";
import { getView } from "./home";

const nav_menu = document.querySelector(".nav-menu");
const nav_button = document.querySelector(".nav-menu-icon");
const nav_logo = document.querySelector(".nav-logo");

let open = false;
nav_menu.addEventListener("click", () => {
  open = !open;
  if (open) {
    nav_button.setAttribute("src", closeIcon);
    nav_logo.style.display = "none";
    openNav();
  } else {
    nav_button.setAttribute("src", openIcon);
    nav_logo.style.display = "flex";
    closeNav();
  }
});

export function openNav() {
  document.querySelector(".side-nav-container").style.width = "240px";
  document.querySelector("#app").style.marginLeft = "250px";
}

export function closeNav() {
  document.querySelector(".side-nav-container").style.width = "0";
  document.querySelector("#app").style.marginLeft = "0";
}
//new button
const nav_new = document.querySelector(".nav-new");
nav_new.addEventListener("click", (e) => getView());
