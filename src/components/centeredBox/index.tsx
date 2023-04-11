import {PropsWithChildren,FC} from "react"
import styles from "./index.module.scss"


interface Props extends PropsWithChildren{
  
}

/**
 * Box that centers  vertically and horizontally
 * it's children content, occuping all width and height of it's parent
 */
export const CenteredBox: FC<Props> = ({
  children
}) => {
  
  return <div className={styles.centeredBox}>
    <div>
      {children}
    </div>
  </div>
  
}