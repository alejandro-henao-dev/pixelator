import { classnames } from "@/utils/classnames";
import React, { PropsWithChildren } from "react"
import styles from "./index.module.scss"

export enum TEXT_WEIGHT{
  extraLight= 200,
  light = 300,
  normal='normal',
  bold=700
}

export enum TEXT_SIZE{
  small = '.8',
  normal = '1',
  medium = "1.2",
  big= "1.5"
}

enum TEXT_SIZE_UNITS{
  relative = 'em',
  fixed = 'rem'
}

export interface TextProps extends PropsWithChildren{
  as?: string,
  className?: string,
  weight?: TEXT_WEIGHT,
  size?: TEXT_SIZE,
  relativeSize?:boolean
}

const DEFAULT_AS_ELEMENT = 'p';

export const Text: React.FC<TextProps> = ({
  as: asProp,
  weight = TEXT_WEIGHT.normal,
  size = TEXT_SIZE.normal,
  relativeSize = false,
  className,
  children,
  ...props
}) => {
  
  return React.createElement(
    asProp ?? DEFAULT_AS_ELEMENT,
    {
      style: {
        '--font-weight': weight,
        '--font-size': `${size}${relativeSize ? TEXT_SIZE_UNITS.relative : TEXT_SIZE_UNITS.fixed}`
      },
      className:classnames(
        className,
        styles.text
      ),
      ...props
    },
    children
  )
}