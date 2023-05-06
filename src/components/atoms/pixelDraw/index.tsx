import { getColorRGBACssFormat } from "@/models/ColorRBG"
import { IPixel } from "@/models/Pixel"
import { classnames } from "@/utils/classnames"
import styles from './index.module.scss'

export interface PixelDrawProps{
  pixel: IPixel,
  active?:boolean,
  className?: string,
  cssVars?: Record<string,string>,
  onClick?: (e:any) => void,
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e:any)=>void,
}
export const PixelDraw: React.FC<PixelDrawProps> = ({
  pixel,
  className,
  onClick = () => { },
  onMouseEnter = () => { },
  onMouseLeave = () => { },
  cssVars,
  active=true
}) => { 


  return <div
    style={{
      ['--pixel-color' as any]: getColorRGBACssFormat(pixel.color),
      ...cssVars
    }}
    onClick={onClick}
    data-empty={pixel.empty}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={classnames(styles.pixel, className, !active && styles.pixelOff)}
  />
}