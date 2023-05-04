export class ColorRGBA{

  
  constructor(
    public r: number,
    public g?: number,
    public b?: number,
    public a?: number
  ) { 

    if (this.g === undefined && this.b === undefined) {
      this.g = this.r
      this.b=this.r
    }

    if (this.a === undefined) {
      this.a=1
    }
  }


  getCssFormat() {
    return `rgba(${this.r},${this.g},${this.b}, ${this.a})`
  }
  
}