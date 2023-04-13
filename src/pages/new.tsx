
import { Button, BUTTON_TYPES } from "@/components/atoms/button"
import { CenteredBox } from "@/components/atoms/centeredBox"
import { FileDrop } from "@/components/atoms/fileDrop"
import { Title } from "@/components/atoms/title"
import { Field } from "@/components/molecules/field"
import { ImageFileInputButton } from "@/components/molecules/imageFileInputButton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { imageStateActions } from "@/store/slices/imageSlice"
import { projectStateActions } from "@/store/slices/projectSlice"
import { classnames } from "@/utils/classnames"
import { fileToBlob } from "@/utils/fileToX"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./new.module.scss"

export default function NewProject() {
  
  
  const dispatch = useAppDispatch()
  const title = useAppSelector(state => state.project.title)
  const image= useAppSelector(state=>state.image.url)


  const onFileSelection = async (files?: File[]) => {
    if (!files) {
      return
    }
    const blob = await fileToBlob(files[0]) as Blob
    dispatch(imageStateActions.buildImageStateFromBlob(blob))
  }
  
  const disabledContiue=(!title || !image) 

  return <section className={classnames(styles.container)} >
    <CenteredBox
      onDragStart={e => {
        e.preventDefault()
        return false
      }}
      onDragEnd={e => {
        e.preventDefault()
        return false
      }}
      onDragOver={e => {
        e.preventDefault()
        return false
      }}
      onDrop={e => {
        e.preventDefault()
        return false
      }}
    >
        
      <header className={classnames(styles.titleInput)} >
        <Field
          label="Project Title"
          placeholder="Project Title" value={title} 
          onInput={(e: any) => dispatch(projectStateActions.setTitle(e.target.value))}
          autoFocus
        />
      </header>
      
      <FileDrop className={styles.fileBox} accept=".jpeg" keepBorders onChange={(files:File[])=>onFileSelection(files)}>
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

      <Link href="/project" className={classnames(disabledContiue && 'disabled')} >
        <Button block disabled={disabledContiue}>
          Continue
        </Button>
      </Link>
      

      </CenteredBox>
  </section>
} 