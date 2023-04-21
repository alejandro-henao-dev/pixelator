
import { BUTTON_TYPES } from "@/components/atoms/button";
import { ConfigBox } from "@/components/molecules/configBox";
import { Input, INPUT_VARIANT } from "@/components/atoms/input";
import { Title, TITLE_TYPES } from "@/components/atoms/title";
import { ProjectImageInput } from "@/components/organisms/projectImageInput.tsx";
import { ProjectTitleInput } from "@/components/organisms/projectTitleInput.tsx";
import { SaveProjectButton } from "@/components/organisms/saveProject/saveProjectButton";
import styles from "./project.module.scss"

export default function ProjectView() {
  

  return <article className={styles.pageContainer}>
    
    <header className={styles.header}>
      <ProjectTitleInput variant={ INPUT_VARIANT.secondary} />
    </header>

    <section>

      <div  className={styles.workspace }>
        <section className={styles.canvas}>
          <ProjectImageInput/>
        </section>
        <aside className={styles.sidebar}>

          <ConfigBox label="View Mode" />
          <ConfigBox label="Pixelator" />
          <ConfigBox label="download"/>

        </aside>
      </div>
    </section>

  </article>
}