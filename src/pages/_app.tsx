import '@/styles/globals.scss'
import { classnames } from '@/utils/classnames'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <div className={classnames([inter.className, 'page-wrapper'])}>
    <Component {...pageProps} />
  </div>
}
