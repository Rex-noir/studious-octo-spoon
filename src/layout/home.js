import { createElement } from "../utils/DOM-manipulator";
import { View, closedState } from "../utils/ViewContent";
import "/src/styles/layout.css";
import deleteBUTTONIcon from "/src/img/delete-button.svg";

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

  for (const key of keys) {
    const listItemContainer = createElement("div", ["list-item-container"]);
    const li = createElement("li", ["list-item"]);

    li.textContent = key;
    li.addEventListener("click", (e) => {
      new View({ option: "view", container: container, key: key });
    });

    const DeleteBTN = createElement("img", ["item-delete-button"]);
    DeleteBTN.textContent = "DELETE";
    DeleteBTN.src = deleteBUTTONIcon;
    DeleteBTN.style.width = "24px";

    listItemContainer.appendChild(li);
    listItemContainer.appendChild(DeleteBTN);
    taskLists.appendChild(listItemContainer);
  }
}
