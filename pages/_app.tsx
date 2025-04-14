/* eslint-disable @next/next/no-img-element */

import type { AppProps } from 'next/app'
import { withHydrate } from 'effector-next'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NextNProgress from 'nextjs-progressbar'
import Script from 'next/script'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Добавляем JivoChat динамически, если еще не загружен
    if (!document.getElementById('jivo-chat')) {
      const script = document.createElement('script')
      script.src = '//code.jivosite.com/widget/gNbKuWhZqe'
      script.async = true
      script.id = 'jivo-chat'
      document.body.appendChild(script)
    }

    return () => {
      const jivoScript = document.getElementById('jivo-chat')
      if (jivoScript) {
        jivoScript.remove() // Очистка при размонтировании (если нужно)
      }
    }
  }, [])

  return (
    mounted && (
      <>
        <NextNProgress />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App as React.FC<AppProps>)
