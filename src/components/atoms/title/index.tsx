import { classnames } from "@/utils/classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./index.module.scss"

export enum TITLE_TYPES{
  none='none',
  main='main',
  subtitle='subtitle',
  caption='caption'
}

interface Props extends React.PropsWithChildren, DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
  as?:string,
  type?: TITLE_TYPES,
  align?:  'inherit' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify'
}


const titleComponentTypes:any = {
  [TITLE_TYPES.main]:'h1',
  [TITLE_TYPES.subtitle]: 'h2',
  [TITLE_TYPES.caption] : 'h4' ,
}
export const Title: React.FC<Props> = ({
  type=TITLE_TYPES.main,
  align = 'inherit',
  className,
  children,
  ...props
}) => {

  const variables:any = {
    '--align':align
  }

  return React.createElement(
    props.as ?? titleComponentTypes[type],
    {
      style:variables,
      className:classnames(
        styles.title,
        styles[type],
        className
        
      ),
      ...props
    },
    children

  )
  
}