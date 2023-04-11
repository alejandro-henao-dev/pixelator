import { classnames } from "@/utils/classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./index.module.scss"

enum TitleTypes{
  main,
  subtitle,
  caption
}

interface Props extends React.PropsWithChildren,DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
  type?: TitleTypes,
  align:  'start' | 'end' | 'left' | 'right' | 'center' | 'justify'
}
export const Title: React.FC<Props> = ({
  type=TitleTypes.main,
  align = "start",
  children,
}) => {

  const variables:any = {
    '--align':align
  }
  
  return <h1 style={variables}
    className={classnames([
      styles.title
    ])}
  >
    {children}
  </h1>
}