import { Pixel } from "@/models/Pixel"
import { classnames } from "@/utils/classnames"
import styles from './index.module.scss'

export interface PixelDrawProps{
  pixel: Pixel,
  className: string,
  onClick?: (e:any) => void,
  onMouseEnter?: (e: any) => void
  onMouseLeave?: (e:any)=>void
}
export const PixelDraw: React.FC<PixelDrawProps> = ({
  pixel,
  className,
  onClick = () => { },
  onMouseEnter = () => { },
  onMouseLeave=()=>{}
}) => { 

  return <div
    style={{ ['--pixel-color' as any]: `rgb(${pixel.color.r},${pixel.color.g},${pixel.color.b})` }}
    onClick={onClick}
    
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={classnames(styles.pixel, className)}
  />
}