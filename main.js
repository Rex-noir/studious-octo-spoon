import { newHomeTemplate } from "./src/layout/home";
import "./style.css";
import "./src/layout/navigation.js";
import { Data } from "./src/utils/Data Manger.js";

let app = document.querySelector("#app");
const homepage = newHomeTemplate();

app.appendChild(homepage);
