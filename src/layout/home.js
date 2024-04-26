import { createElement } from "../utils/DOM-manipulator";
import { View, closedState } from "../utils/ViewContent";
import "/src/styles/layout.css";
import deleteBUTTONIcon from "/src/img/delete-button.svg";
import { Storage } from "../utils/Data Manger";
import { Log } from "../utils/LogMessages";
import { ms, te } from "date-fns/locale";
import { closeNav } from "./navigation";

const container = createElement("div", ["home", "wrapper"]);
const taskLists = document.querySelector(".task-lists");

let open = false;
export function newHomeTemplate() {
  if (!open) {
    closedState(container);
  }
  return container;
}
export function getView() {
  new View({ option: "add", container: container });
}

//task list handler
fillTheNav();
export function fillTheNav() {
  taskLists.innerHTML = "";
  const keys = Object.keys(localStorage);
  if (keys.length <= 0) {
    const text = createElement("span", ["empty-text"]);
    let msg = new Log(text);
    msg.setMessage(msg.EmptyList).type("warning");
    taskLists.appendChild(text);
  }
  for (const key of keys) {
    const listItemContainer = createElement("div", ["list-item-container"]);
    const li = createElement("li", ["list-item"]);
    let data = JSON.parse(localStorage.getItem(key));
    let title = data.title;
    li.textContent = title;
    listItemContainer.addEventListener("click", (e) => {
      closeNav();
      new View({ option: "view", container: container, key: key });
    });

    const DeleteBTN = createElement("img", ["item-delete-button"]);
    DeleteBTN.src = deleteBUTTONIcon;
    DeleteBTN.style.width = "24px";
    DeleteBTN.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop propagation to container
      deleteItem(data);
      fillTheNav();
      closeNav();
      closedState(container);
    });

    listItemContainer.appendChild(li);
    listItemContainer.appendChild(DeleteBTN);
    taskLists.appendChild(listItemContainer);
  }
}
function deleteItem(data) {
  Storage.removeData(data.id);
}
