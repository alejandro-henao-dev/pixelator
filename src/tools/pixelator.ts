
import { IColorRGBA } from '@/models/ColorRBG';

import { IPixel } from '@/models/Pixel';
import { IPixelMatrix } from '@/models/PixelMatrix';

import { IPoint } from '@/models/Point';
import { ISize } from '@/models/Size';
import { resizeByMaxSide } from '@/tools/resizer';
import P5 from 'p5';


export function pixelateImage(
  imgURL: string, pixelSize: number
):Promise<IPixelMatrix> {
  const canvas = document.createElement('canvas')
  return new Promise(async resolve => {
    const P5=(await import('p5')).default
    new P5(p5 => { 
      pixelatorSketch(p5, imgURL, pixelSize)
        .then( pixelMatrix =>{
          pixelMatrix = pixelMatrix
          resolve(pixelMatrix)
        })
    },canvas)
  })
}

const pixelatorSketch = (
  p5: P5, imgURL: string, pixelSize: number, maxImageSize: number = 500
): Promise<IPixelMatrix> => new Promise(resolve => {
  
  let img:P5.Image;
  
  p5.preload= ()=> {
    img = p5.loadImage(imgURL);
  }

  p5.setup = () => {
    const imgSize:ISize = { width: img.width, height: img.height }
    
    
    const canvasSize = resizeByMaxSide(imgSize, maxImageSize)
    
    
    p5.createCanvas(canvasSize.width, canvasSize.height);
    p5.noLoop();  
  }
  
  p5.draw = () => {
    p5.image(img, 0, 0, p5.width, p5.height)
    const pixels:IPixelMatrix = pixelate(p5, { width: pixelSize, height: pixelSize })
    p5.remove()
    const matrix= pixels
    resolve(matrix)
  }
})


const pixelate = (p5:P5, size:ISize):IPixelMatrix =>{
  const pixels:IPixelMatrix = []
  
  for (let y = 0; y < p5.height; y += size.height) {
    pixels.push([])
    for (let x = 0; x < p5.width; x += size.width) {
      const currentCoord:IPoint={x,y}
      let color = getAreaAverageColor(p5, currentCoord, size);
      const pixel:IPixel={color,coords:{x:x/size.width,y:y/size.height},empty:false}
      pixels.at(-1)?.push(pixel)
    }
  }
  return pixels
}

const getAreaAverageColor = (p5:P5, startPoint:IPoint, size:ISize):IColorRGBA =>{
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

  return {r,g,b,a:1}
}

