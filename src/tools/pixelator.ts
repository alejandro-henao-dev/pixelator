
import { ColorRBG } from '@/models/ColorRBG';
import { Matrix } from '@/models/Matrix';
import { Pixel } from '@/models/Pixel';
import { Point } from '@/models/Point';
import { Size } from '@/models/Size';
import { Resizer } from '@/tools/resizer';
import P5 from 'p5';


export class Pixelator{
  private pixelMatrix?: Matrix<Pixel>;

  constructor(
    public readonly imgURL: string,
  ) { }

  get matrix() {
    return this.pixelMatrix
  }
  
  pixelate(pixelSize: number): Promise<Matrix<Pixel>> {
    const canvas = document.createElement('canvas')
    return new Promise(async resolve => {
      const P5=(await import('p5')).default
      new P5(p5 => { 
        pixelatorSketch(p5, this.imgURL, pixelSize)
          .then( pixelMatrix =>{
            this.pixelMatrix = pixelMatrix
            resolve(pixelMatrix)
          })
      },canvas)
    })
  }
  

}

const pixelatorSketch = (
  p5: P5, imgURL: string, pixelSize: number, maxImageSize: number = 500
): Promise<Matrix<Pixel>> => new Promise(resolve => {
  
  let img:P5.Image;
  
  p5.preload= ()=> {
    img = p5.loadImage(imgURL);
  }

  p5.setup = () => {
    const imgSize=new Size(img.width, img.height)
    const imgResize = new Resizer(imgSize)
    
    
    const canvasSize = imgResize.resizeByMaxSide(maxImageSize)
    
    
    p5.createCanvas(canvasSize.width, canvasSize.height);
    p5.noLoop();  
  }
  
  p5.draw = () => {
    p5.image(img, 0, 0, p5.width, p5.height)
    const pixels = pixelate(p5, new Size(pixelSize, pixelSize))

    const pixelateVersionSize = new Size(
      Math.floor(p5.width / pixelSize),
      Math.floor(p5.height / pixelSize)
    )
    p5.remove()
    resolve(new Matrix<Pixel>(pixels, pixelateVersionSize))
  }
})


const pixelate = (p5:P5, size:Size):Array<Array<Pixel>> =>{
  const pixels:Array<Array<Pixel>> = []
  
  for (let y = 0; y < p5.height; y += size.height) {
    pixels.push([])
    for (let x = 0; x < p5.width; x += size.width) {
      const currentCoord=new Point(x,y)
      let color = getAreaAverageColor(p5, currentCoord, size);
      pixels.at(-1)?.push( new Pixel(color) )
    }
    
  }
  return pixels
}

const getAreaAverageColor = (p5:P5, startPoint:Point, size:Size):ColorRBG =>{
  let r = 0, g = 0, b = 0;
  let count = 0;
  
  for (let row = startPoint.x; row < startPoint.x + size.width && row < p5.width; row++) {
    for (let col = startPoint.y; col < startPoint.y + size.height && col < p5.height; col++) {
      
      let c = p5.get(row, col);
      r += p5.red(c);
      g += p5.green(c);
      b += p5.blue(c);
      count++;
    }
  }
  
  r /= count;
  g /= count;
  b /= count;

  return new ColorRBG(r,g,b)
}

