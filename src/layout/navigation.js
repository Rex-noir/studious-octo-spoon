import openIcon from "/src/img/nav-menu.svg";
import closeIcon from "/src/img/close-button.svg";

const nav_button = document.querySelector(".nav-menu-icon");
let open = false;
nav_button.addEventListener("click", () => {
  open = !open;
  if (open) {
    nav_button.setAttribute("src", closeIcon);
    openNav();
  } else {
    nav_button.setAttribute("src", openIcon);
    closeNav();
  }
});

function openNav() {
  document.querySelector(".side-nav-container").style.width = "240px";
  document.querySelector("#app").style.marginLeft = "250px";
}

function closeNav() {
  document.querySelector(".side-nav-container").style.width = "0";
  document.querySelector("#app").style.marginLeft = "0";
}
