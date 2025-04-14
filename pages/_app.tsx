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
        {/* Yandex.Metrika counter */}
        <script type="text/javascript">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)
              };
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(101047105, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/101047105" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
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
