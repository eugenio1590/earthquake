export enum Type {
  Md = 'md',
  Ml = 'ml',
  Ms = 'ms',
  Mw = 'mw',
  Me = 'me',
  Mi = 'mi',
  Mb = 'mb',
  MLg = 'mlg'
}

class Magnitude {
  constructor(public value: number, public type: Type) {};
}

export default Magnitude;