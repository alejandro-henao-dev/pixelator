import { PropsWithChildren } from "react"
import styles from './index.module.scss'


export interface OverLayProps extends PropsWithChildren{
  onClick?:(e:any)=>void
}
export const Overlay: React.FC<OverLayProps> = ({
  children,
  onClick=()=>{}
}) => {
  return <div className={styles.overlay}
    onClick={onClick}
  >
    {children}
  </div>
}