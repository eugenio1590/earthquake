export enum Type {
  Md,
  Ml,
  Ms,
  Mw,
  Me,
  Mi,
  Mb,
  MLg
}

class Magnitude {
  constructor(public value: number, public type: Type) {};
}

export default Magnitude;