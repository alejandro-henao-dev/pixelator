import { classnames } from "@/utils/classnames"
import { PropsWithChildren } from "react"
import styles from "./index.module.scss"

export interface LabelProps extends PropsWithChildren,React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>{
  active?:boolean
}

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  active
}) => {
  return <label
    className={ classnames(styles.label,className,active && styles.active)}
  >
    {children}
  </label>
}