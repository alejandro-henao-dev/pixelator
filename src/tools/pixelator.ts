
import { ColorRGBA } from '@/models/ColorRBG';
import { Matrix } from '@/models/Matrix';
import { Pixel } from '@/models/Pixel';
import { PixelMatrix } from '@/models/PixelMatrix';
import { Point } from '@/models/Point';
import { Size } from '@/models/Size';
import { Resizer } from '@/tools/resizer';
import P5 from 'p5';


export class Pixelator{
  private pixelMatrix?: PixelMatrix;

  constructor(
    public readonly imgURL: string,
  ) { }

  get matrix() {
    return this.pixelMatrix
  }
  
  pixelate(pixelSize: number): Promise<PixelMatrix> {
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
): Promise<PixelMatrix> => new Promise(resolve => {
  
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
    p5.remove()
    const matrix= new PixelMatrix(pixels)
    resolve(matrix)
  }
})


const pixelate = (p5:P5, size:Size):Array<Array<Pixel>> =>{
  const pixels:Array<Array<Pixel>> = []
  
  for (let y = 0; y < p5.height; y += size.height) {
    pixels.push([])
    for (let x = 0; x < p5.width; x += size.width) {
      const currentCoord=new Point(x,y)
      let color = getAreaAverageColor(p5, currentCoord, size);
      pixels.at(-1)?.push( new Pixel(color, new Point(x,y)) )
    }
  }
  return pixels
}

const getAreaAverageColor = (p5:P5, startPoint:Point, size:Size):ColorRGBA =>{
  let r = 0, g = 0, b = 0;
  let count = 0;
  
  for (let y = startPoint.y; y < startPoint.y + size.height && y < p5.height; y++) {
    for (let x = startPoint.x; x < startPoint.x + size.width && x < p5.width; x++) {  
      let c = p5.get(x, y);
      r += p5.red(c);
      g += p5.green(c);
      b += p5.blue(c);
      count++;
    }
  }
  
  r /= count;
  g /= count;
  b /= count;

  return new ColorRGBA(r,g,b)
}

