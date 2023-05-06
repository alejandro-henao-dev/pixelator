
import { BUTTON_TYPES } from "@/components/atoms/button";
import { Dropdown } from "@/components/molecules/dropdown";
import { Input, INPUT_VARIANT } from "@/components/atoms/input";
import { ProjectImageInput } from "@/components/organisms/projectImageInput";
import { ProjectTitleInput } from "@/components/organisms/projectTitleInput";
import styles from "./project.module.scss"
import { PixelatorConfigDropdown } from "@/components/organisms/pixelatorConfigDropdown";
import { ProjectConfigDropdown } from "@/components/organisms/projectConfigDropdown/projectConfigDropdown";
import { PixelatedImage } from "@/components/organisms/PixelatedImage";
import { CloseCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { classnames } from "@/utils/classnames";
import { Overlay } from "@/components/atoms/overlay";

export default function ProjectView() {

  const [openSidebar, setOpenSidebar] = useState(false)

  return <article className={styles.pageContainer}>

    <section>
      <header className={styles.header}>
        <span className={styles.menu}
          onClick={()=>setOpenSidebar(p=>!p)}
        >
          <MenuOutlined />
        </span>
      </header>

      <div  className={styles.workspace }>
        <section className={styles.canvas}>
          <ProjectImageInput />
          <PixelatedImage/>
        </section>
        {openSidebar && <Overlay onClick={()=>setOpenSidebar(false)}/>}
        <aside className={classnames(styles.sidebar, openSidebar ? styles.open : styles.close)}>
          <nav className={styles.mobileSidebarNav}>
            <span className={styles.closeSidebar}
              onClick={()=>setOpenSidebar(p=>!p)}
            >
              <CloseCircleOutlined />
            </span>
          </nav>

          <PixelatorConfigDropdown />
          <ProjectConfigDropdown/>

        </aside>
      </div>
    </section>

  </article>
}