class Element {
  constructor(tag) {
    this.element = document.createElement(tag);
  }
  static create(tag) {
    if (tag) return new Element(tag);
    else throw new Error("invalid tag name");
  }
  setId(id) {
    if (id) this.element.id = id;
    else throw new Error("invalid id");
    return this;
  }
  setClass(className) {
    if (className) this.element.classList.add(className);
    else throw new Error("invalid class name");
    return this;
  }
  build() {
    return this.element;
  }
}
export function createElement(tag, className, id) {
  const element = Element.create(tag);
  if (className) element.setClass(className);
  if (id) element.setId(id);
  return element.build();
}
