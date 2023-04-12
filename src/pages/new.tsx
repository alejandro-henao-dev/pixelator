
import { BUTTON_TYPES } from "@/components/atoms/button"
import { CenteredBox } from "@/components/atoms/centeredBox"
import { FileDrop } from "@/components/atoms/fileDrop"
import { FileInput } from "@/components/atoms/fileInput"
import { Title } from "@/components/atoms/title"
import { ImageFileInputButton } from "@/components/molecules/imageFileInputButton"
import { classnames } from "@/utils/classnames"
import styles from "./new.module.scss"

export default function newProject() {
  
  return <FileDrop className={classnames(styles.container,"Asdasd")} accept=".jpeg">
      <CenteredBox>
        
        <Title>
          Drop your next Art work!
        </Title>
        <ImageFileInputButton
          
          buttonProps={{type:BUTTON_TYPES.tertiary}}
        >
          Or select File
          </ImageFileInputButton>
      </CenteredBox>
  </FileDrop>
} 