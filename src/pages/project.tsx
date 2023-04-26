
import { BUTTON_TYPES } from "@/components/atoms/button";
import { Dropdown } from "@/components/molecules/dropdown";
import { Input, INPUT_VARIANT } from "@/components/atoms/input";
import { ProjectImageInput } from "@/components/organisms/projectImageInput";
import { ProjectTitleInput } from "@/components/organisms/projectTitleInput";
import styles from "./project.module.scss"
import { PixelatorConfigDropdown } from "@/components/organisms/pixelatorConfigDropdown";
import { ProjectConfigDropdown } from "@/components/organisms/projectConfigDropdown/projectConfigDropdown";

export default function ProjectView() {

  return <article className={styles.pageContainer}>

    <section>

      <div  className={styles.workspace }>
        <section className={styles.canvas}>
          <ProjectImageInput/>
        </section>
        <aside className={styles.sidebar}>

          <PixelatorConfigDropdown />
          <ProjectConfigDropdown/>

        </aside>
      </div>
    </section>

  </article>
}