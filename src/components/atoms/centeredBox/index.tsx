import { classnames } from "@/utils/classnames"
import {PropsWithChildren,FC} from "react"
import styles from "./index.module.scss"


interface Props extends PropsWithChildren{
 className?:string 
}

/**
 * Box that centers  vertically and horizontally
 * it's children content, occuping all width and height of it's parent
 */
export const CenteredBox: FC<Props> = ({
  children,
  className
}) => {
  
  return <div className={classnames(styles.centeredBox, className)}>
    <div>
      {children}
    </div>
  </div>
  
}