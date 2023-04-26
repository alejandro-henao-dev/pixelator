import { BUTTON_TYPES } from "@/components/atoms/button"
import { CenteredBox } from "@/components/atoms/centeredBox"
import { FileDrop } from "@/components/atoms/fileDrop"
import { Title } from "@/components/atoms/title"
import { ImageFileInputButton } from "@/components/molecules/imageFileInputButton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { imageStateActions } from "@/store/slices/imageSlice"
import { classnames } from "@/utils/classnames"
import { fileToBlob } from "@/utils/fileToX"
import styles from "./index.module.scss"

export const ProjectImageInput = () => {
  const dispatch = useAppDispatch()

  const onFileSelection = async (files?: File[]) => {
    if (!files) {
      return
    }
    const blob = await fileToBlob(files[0]) as Blob
    dispatch(imageStateActions.buildImageStateFromBlob(blob))
  }
  

  return <>
      <FileDrop className={styles.fileBox} accept=".jpeg" keepBorders onChange=   {(files:File[])=>onFileSelection(files)}>
        <CenteredBox className={classnames(styles.fileSectionContainer)}>

          <Title>
            Drop your next Art work!
          </Title>
          <ImageFileInputButton
            onChange={(files,e)=>onFileSelection(files)}
            buttonProps={{type:BUTTON_TYPES.tertiary}}
          >
            Or select an file
          </ImageFileInputButton>

        </CenteredBox>
      </FileDrop>
  </>
}