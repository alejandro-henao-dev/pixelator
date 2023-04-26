
import { ToggleSwitch } from "@/components/atoms/toggleSwitch"
import { classnames } from "@/utils/classnames"
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons"
import { PropsWithChildren, ReactComponentElement, ReactElement, useEffect, useState } from "react"
import { Title, TITLE_TYPES } from "../../atoms/title"
import styles from "./index.module.scss"


export interface DropdownProps extends PropsWithChildren{
  label: string,
  initCollapsedState?: boolean,
  collapsed?:boolean,
  disabled?: boolean,
  HeaderRender?:any,
  onChange?:(state:boolean)=>void
}

export const Dropdown: React.FC<DropdownProps> = ({
  initCollapsedState=false,
  label,
  disabled,
  collapsed: controlledCollapseValue,
  onChange,
  children,
  HeaderRender,
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
    <header className={classnames(styles.header)}
      onClick={toggle}
    >
      {!HeaderRender && <>
        <Title type={TITLE_TYPES.caption} className={styles.title}>{label}</Title>
        <span className={classnames(styles.dropDownIcon)}>
          {collapsed && <CaretDownFilled />}
          {!collapsed && <CaretUpFilled />}
        </span>
      </>}

      {HeaderRender && <HeaderRender collapsed={collapsed} toggleCollapsed={ toggle} />}
    </header>
    
    {!collapsed && <section className={styles.body}>
      {children}
    </section>}
  </article>
}