import { createElement } from "../utils/DOM-manipulator";
import { View, closedState } from "../utils/ViewContent";
import "/src/styles/layout.css";

const container = createElement("div", ["home", "wrapper"]);
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
