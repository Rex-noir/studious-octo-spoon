export class Log {
  constructor(logElement) {
    this.logElement = logElement;
    this.emptyView =
      "You haven't view any data! You can add or view your previous datas from the list.";
    this.notSave = "Not saved";
    this.invalidInput = "Title & DeadLine must not be empty!";
    this.titleLimit = "Title character limit reached!";
    this.emptyViewShort = "No view";
    this.saved = "Saved";
  }
  getMessages() {
    return this;
  }
  setMessage(message) {
    this.logElement.textContent = message;
    return this;
  }
  type(type) {
    switch (type) {
      case "error":
        this.logElement.style.color = "red";
        break;
      case "warning":
        this.logElement.style.color = "blue";
        break;
      case "success":
        this.logElement.style.color = "green";
        break;
      default:
        this.logElement.style.color = "";
    }
  }
}
