import { fillTheNav } from "../layout/home";
import { createElement } from "./DOM-manipulator";
import { Data, Storage } from "./Data Manger";
import { Log } from "./LogMessages";
import "/src/styles/components.css";
import { v4 as uuidv4 } from "uuid";

let saved = false;
let inputTitle;
let inputDate;
let inputNote;
let navTitle = document.querySelector("#nav-title");
let messages = new Log(navTitle);
let keydownEventListener;
let OPTION;
let oldID;
let uniqueID;
let editDone = false;

//View
export function closedState(container) {
  container.innerHTML = messages.emptyView;
  messages.setMessage(messages.emptyViewShort).type();
}
export function View(option) {
  const wrapper = option.container;
  OPTION = option;
  wrapper.innerHTML = "";
  const container = createElement("div", ["project-container"]);
  //title and action container
  const containerTA = createElement("div", ["container", "ta-container"]);
  containerTA.appendChild(title());
  enableSaving();
  //main wrapper
  container.appendChild(action());
  container.appendChild(containerTA);
  container.appendChild(DatePicker());
  container.appendChild(Note());
  wrapper.appendChild(container);
  //saving eventListener
  //for updating keys with the navtitle
  //Buttons event Listenere
  document.querySelector(".close-btn").addEventListener("click", (e) => {
    closeButtonClicked(wrapper);
  });
  //checking methods
  const method = option.option;

  if (method == "add") {
    saved = false;
    messages.setMessage(messages.howToSave).type("warning");
    document.querySelector(".input-title").focus();
    uniqueID = uuidv4();
    document.querySelector(".edit-btn").textContent = "Save";
    document.querySelector(".edit-btn").addEventListener("click", saveNow);
  } else if (method == "view") {
    saved = true;
    updateResults(option);
    navTitle.textContent = inputTitle.value;
    let editBtn = document.querySelector(".edit-btn");
    editBtn.style.display = "true";
    editBtn.addEventListener("click", enableAllInputs);

    oldID = JSON.parse(localStorage.getItem(option.key)).id;
    disableAllInputs();
  }
}
function enableSaving() {
  keydownEventListener = (e) => {
    keyBoardListener(e);
  };
  document.addEventListener("keydown", keydownEventListener);
  inputTitle.addEventListener("keyup", UpdateNavTitleWithInputTitle);
}
function UpdateNavTitleWithInputTitle() {
  if (isLogTitle(navTitle.textContent)) {
    navTitle.textContent = "";
  }
  messages.type();
  navTitle.textContent = inputTitle.value;
}
function updateResults(option) {
  let key = option.key;
  let content = JSON.parse(localStorage.getItem(key));
  inputTitle.value = content.title;
  inputDate.setAttribute("value", content.date);
  inputNote.textContent = content.note;
}
function disableAllInputs() {
  document.querySelector("input").disabled = "true";
  document.querySelector("textarea").disabled = "true";
  document.querySelector("#input-date").setAttribute("disabled", "true");
}
function enableAllInputs(e) {
  const btn = e.target;
  if (!editDone) {
    btn.textContent = "Done";
    document.querySelector("input").removeAttribute("disabled");
    document.querySelector("textarea").removeAttribute("disabled");
    document.querySelector("#input-date").removeAttribute("disabled");
    enableSaving();
    saved = false;
    editDone = !editDone;
    if (OPTION.option == "add") keyBoardListener();
  } else {
    btn.textContent = "Edit";
    disableAllInputs();
    saved = true;
    editDone = false;
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
    if (condition) {
      document.removeEventListener("keydown", keydownEventListener);
      closedState(container);
    } else {
    }
  } else {
    saved = false;
    messages.setMessage(messages.emptyViewShort);
    closedState(container);
  }
}
function keyBoardListener(e) {
  if (e.ctrlKey && e.key === "s" && !saved) {
    saveNow(e);
  }
}
function saveNow(e) {
  if (checkInputs()) {
    e.preventDefault();
    //formatting date
    //saving logic
    if (OPTION.option === "view") Storage.removeData(oldID);
    let data = new Data(uniqueID)
      .setTitle(inputTitle.value)
      .setDate(inputDate.value)
      .setNote(inputNote.value)
      .build();
    localStorage.setItem(uniqueID, data);
    //updating some values
    saved = true;
    messages.setMessage(messages.saved).type("success");
    fillTheNav();
  } else {
    messages.setMessage(messages.invalidInput).type("warning");
    e.preventDefault();
    saved = false;
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
