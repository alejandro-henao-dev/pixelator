import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from "next/head"
import { Title, TITLE_TYPES } from '@/components/ui/title'
import { CenteredBox } from '@/components/ui/centeredBox'
import { Button, BUTTON_TYPES } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>New Pixels Project</title>
        <meta name="description" content="Create a new Pain Pixels project" />
      </Head>

      <main>

        <CenteredBox>
          <Title align="center" >New Project</Title>
          <Button type={BUTTON_TYPES.secondary}>
            New Project
          </Button>
          <Button type={BUTTON_TYPES.secondary}>
            Open Project
          </Button>
        </CenteredBox>
      </main>
    </>
  )
}
