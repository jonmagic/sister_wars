interface ActiveXObject {
  new (progID: string): unknown
}

declare const ActiveXObject: {
  prototype: ActiveXObject
  new (progID: string): ActiveXObject
}
