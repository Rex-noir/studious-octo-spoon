import { newHomeTemplate } from "./src/layout/home";
import "./style.css";
import "./src/layout/navigation.js";

let app = document.querySelector("#app");
const homepage = newHomeTemplate();

app.appendChild(homepage);
