import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from "next/head"
import { Title, TITLE_TYPES } from '@/components/atoms/title'
// import { CenteredBox } from '@/componesnts/atoms/centeredBox'
import { Button, BUTTON_TYPES } from '@/components/atoms/button'
import styles from "./index.module.scss"
import { SITE_DATA } from '@/constants/siteData'
import { FileInput } from '@/components/atoms/fileInput'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Paint Pixels</title>
        <meta name="description" content="Create a new Pain Pixels project" />
      </Head>

      <main className={styles.container}>

        <header className={styles.header}>
          <Title align="center" >Welcome to Paint Pixels!!</Title>
          <Title align="center" type={TITLE_TYPES.caption} >Your favorite web app for paiting references preparation.</Title>
        </header>

        <section className={styles.actions}>
          <Button type={BUTTON_TYPES.secondary}>
            New Project
          </Button>
          <FileInput
            Container={({ children }) =>
              <Button type={BUTTON_TYPES.secondary} >
                {children}
              </Button>
            }
          >
              Open Project
          </FileInput>
          
        </section>

        <section className={styles.data}>
          <p>{SITE_DATA.version}</p>
        </section>
      </main>
    </>
  )
}
