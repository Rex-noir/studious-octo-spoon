export class Data {
  constructor(id) {
    this.id = id;
  }
  setTitle(title) {
    this.title = title;
    return this;
  }
  setDate(date) {
    this.date = date;
    return this;
  }
  setNote(note) {
    this.note = note;
    return this;
  }
  build() {
    return JSON.stringify(this);
  }
}
export class Storage {
  static getSotrageLength() {
    return localStorage.length;
  }
  static getDataOf(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  static removeData(key) {
    localStorage.removeItem(key);
  }
  static clearStorageData() {
    localStorage.clear();
  }
}
