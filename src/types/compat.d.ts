
interface ActiveXObject {
  new (progID: string): any
}

declare var ActiveXObject: {
  prototype: ActiveXObject
  new (progID: string): ActiveXObject
};
