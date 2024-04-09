import Magnitude from "./Magnitude";

export class Coordinates {
  constructor(public longitude: number, public latitude: number) {};

  toGeoObject() {
    return { lat: this.latitude, lng: this.longitude }
  }
}

class Earthquake {
  constructor(
    public id: number,
    public title: string,
    public place: string,
    public time: string,
    public tsunami: boolean,
    public magnitude: Magnitude,
    public position: Coordinates
  ) {};

  marker() {
    return { 
      title: this.title, 
      position: this.position.toGeoObject()
    }
  }
}

export default Earthquake;