import { store } from '@/store'
import '@/styles/globals.scss'
import { classnames } from '@/utils/classnames'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <div className={classnames(inter.className, 'page-wrapper')}>
      <Component {...pageProps} />
    </div>
  </Provider>
}
