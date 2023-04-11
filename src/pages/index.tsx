import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Head from "next/head"
import { Title } from '@/components/title'
import { CenteredBox } from '@/components/centeredBox'
import { Button } from '@/components/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>New Pixels Project</title>
        <meta name="description" content="Create a new Pain Pixels project" />
      </Head>

      <main className={styles.main}>
        


        <CenteredBox>
        <Title align="center" >New Project</Title>
          <Title align="center" >new / Load</Title>
          <Button  >New Project</Button>
          <Button >Open Project</Button>
        </CenteredBox>
      </main>
    </>
  )
}
