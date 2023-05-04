import { Pixel } from "@/models/Pixel"
import { classnames } from "@/utils/classnames"
import styles from './index.module.scss'

export interface PixelDrawProps{
  pixel: Pixel,
  className?: string,
  cssVars?: Record<string,string>
  onClick?: (e:any) => void,
  onMouseEnter?: (e: any) => void
  onMouseLeave?: (e:any)=>void
}
export const PixelDraw: React.FC<PixelDrawProps> = ({
  pixel,
  className,
  onClick = () => { },
  onMouseEnter = () => { },
  onMouseLeave = () => { },
  cssVars
}) => { 


  return <div
    style={{
      ['--pixel-color' as any]: pixel.color.getCssFormat(),
      ...cssVars
    }}
    onClick={onClick}
    data-empty={pixel.empty}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={classnames(styles.pixel, className)}
  />
}