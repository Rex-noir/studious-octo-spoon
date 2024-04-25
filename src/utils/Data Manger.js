export class Data {
  constructor(title) {
    this.title = title;
    this.id = title.slice(0, 2);
    this.watermark = "json";
  }
  setDate(date, rawDate) {
    this.date = date;
    this.rawDate = rawDate;
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
