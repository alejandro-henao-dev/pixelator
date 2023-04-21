
import { ToggleSwitch } from "@/components/atoms/toggleSwitch"
import { classnames } from "@/utils/classnames"
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons"
import { PropsWithChildren, useEffect, useState } from "react"
import { Title, TITLE_TYPES } from "../../atoms/title"
import styles from "./index.module.scss"


export interface ConfigBoxProps extends PropsWithChildren{
  label: string,
  initCollapsedState?: boolean,
  collapsed?:boolean,
  disabled?: boolean,
  switchOnHeader?: boolean,
  onChange?:(state:boolean)=>void
}

export const ConfigBox: React.FC<ConfigBoxProps> = ({
  initCollapsedState=false,
  label,
  disabled,
  switchOnHeader,
  collapsed: controlledCollapseValue,
  onChange,
  children,
}) => {


  const [collapsed, setCollapsed] = useState(controlledCollapseValue ?? initCollapsedState)


  useEffect(() => {
    if (controlledCollapseValue !== null && controlledCollapseValue !== undefined) {
      setCollapsed(controlledCollapseValue as boolean)  
    }
    
  }, [controlledCollapseValue])
  
  const toggle = (e:any) => {
   
    if (controlledCollapseValue !== null && controlledCollapseValue !== undefined) { 
      onChange && onChange(collapsed)
      return
    }
    setCollapsed(prev=>!prev)
  }


  return <article
    className={classnames(
      styles.toolbox,
      collapsed && styles.collapsed,
      disabled && styles.disabled
    )}
  >
    <header className={classnames(styles.header,  switchOnHeader && styles.switchOnHeader )}
      onClick={toggle}
    >
      <Title type={TITLE_TYPES.caption} className={styles.title}>{label}</Title>
      <span className={classnames(styles.dropDownIcon)}>
        {collapsed && <CaretDownFilled />}
        {!collapsed && <CaretUpFilled />}
      </span>
      {switchOnHeader && <ToggleSwitch />}
    </header>
    
    {!collapsed && <section className={styles.body}>
      {children}
    </section>}
  </article>
}