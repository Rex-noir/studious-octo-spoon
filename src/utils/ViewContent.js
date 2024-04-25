import { createElement } from "./DOM-manipulator";
import { Data } from "./Data Manger";
import { Log } from "./LogMessages";
import "/src/styles/components.css";
import { format } from "date-fns";

let saved = false;
let inputTitle;
let inputDate;
let inputNote;
let navTitle = document.querySelector("#nav-title");
let messages = new Log(navTitle);
//View
export function closedState(container) {
  container.innerHTML = messages.emptyView;
}
export function View(option) {
  const wrapper = option.container;
  wrapper.innerHTML = "";
  const container = createElement("div", ["project-container"]);
  //title and action container
  const containerTA = createElement("div", ["container", "ta-container"]);
  containerTA.appendChild(title());

  //date-time container
  //main wrapper
  container.appendChild(action());
  container.appendChild(containerTA);
  container.appendChild(DatePicker());
  container.appendChild(Note());
  wrapper.appendChild(container);
  //saving eventListener
  messages.setMessage(messages.notSave).type("warning");
  document.addEventListener("keydown", (e) => {
    saveEventListener(e);
  });
  inputTitle.addEventListener("keyup", (e) => {
    //check for the title if it is a log message
    if (isLogTitle(navTitle.textContent)) {
      navTitle.textContent = "";
    }
    messages.type();
    navTitle.textContent = inputTitle.value;
  });
  //Buttons event Listenere
  document.querySelector(".close-btn").addEventListener("click", (e) => {
    closeButtonClicked(wrapper);
  });
  //checking methods
  const method = option.option;
  if (method == "add") {
    document.querySelector(".input-title").focus();
  }
  //if method is to view then check it
  else {
    saved = true;
    if (wrapper.childNodes.length > 0) {
      for (const child of wrapper.childNodes) {
        if (
          child.nodeType === Node.ELEMENT_NODE &&
          child.matches("input, textarea")
        ) {
          child.disabled = true;
        }
      }
    }
  }
}

//title
function title() {
  const container = createElement("div", [
    "title-container",
    "input-container",
  ]);
  const label = createElement("label");
  label.setAttribute("for", "input-title");
  label.textContent = "Title";
  inputTitle = createElement("input", ["input-title"], "input-title");
  inputTitle.setAttribute("maxlength", "100");
  container.appendChild(label);
  container.appendChild(inputTitle);
  return container;
}
//action
function action() {
  const container = createElement("div", [
    "action-container",
    "action-container",
  ]);
  const close = createElement("button", ["close-btn"]);
  close.textContent = "Close";
  container.appendChild(close);

  const action = createElement("button", ["edit-btn", "edit-btn"]);
  action.textContent = "Edit";
  container.appendChild(action);
  return container;
}
//date and time
function DatePicker() {
  const container = createElement("div", ["date-container", "input-container"]);
  const label = createElement("label");
  label.setAttribute("for", "input-date");
  label.textContent = "Dead Line";
  inputDate = createElement("input", ["input-date"], "input-date");
  inputDate.setAttribute("type", "datetime-local");
  container.appendChild(label);
  container.appendChild(inputDate);
  return container;
}
function Note() {
  const container = createElement("div", [
    "input-container",
    "input-note-container",
  ]);
  const label = createElement("label");
  label.setAttribute("for", "input-note");
  label.textContent = "Brief Note About Your To-Do item";

  inputNote = createElement("textarea", ["input-note"], "input-note");
  container.appendChild(label);
  container.appendChild(inputNote);
  return container;
}
//close button
function closeButtonClicked(container) {
  if (!saved && checkInputs()) {
    let condition = confirm("Changes will not be saved. Are you sure?");
    if (condition) closedState(container);
  } else {
    messages.setMessage(messages.emptyViewShort);
    closedState(container);
  }
}
function saveEventListener(e) {
  if (e.ctrlKey && e.key === "s") {
    if (checkInputs()) {
      e.preventDefault();
      //formatting date
      let date = format(new Date(inputDate.value), "MMM do yyyy hh:mm a");
      //saving logic
      let data = new Data(inputTitle.value)
        .setDate(date)
        .setNote(inputNote.value)
        .build();
      localStorage.setItem(inputTitle.value, data);
      //updating some values
      saved = true;
      messages.setMessage(messages.saved).type("success");
    } else {
      messages.setMessage(messages.invalidInput).type("warning");
      e.preventDefault();
      saved = false;
    }
  }
}
function checkInputs() {
  if (inputTitle.value === "") {
    return false;
  } else if (inputDate.value === "") {
    return false;
  }
  return true;
}

//check the message first for log
function isLogTitle(title) {
  let message = messages.getMessages();
  for (const value in message) {
    if (message[value] == title) {
      return true;
    }
  }
  return false;
}
