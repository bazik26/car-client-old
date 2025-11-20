import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { withFork } from 'effector-next'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* Яндекс.Метрика */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(98765432, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
                });
              `,
            }}
          />
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/98765432"
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>

          {/* Preconnect для быстрой загрузки */}
          <link rel="preconnect" href="https://mc.yandex.ru" />
          <link rel="preconnect" href="https://car-api-production.up.railway.app" />
          <link rel="dns-prefetch" href="https://mc.yandex.ru" />
          
          {/* Яндекс.Вебмастер верификация - ЗАМЕНИТЕ НА ВАШ КОД */}
          <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
          
          {/* Общие мета-теги для всего сайта */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="format-detection" content="telephone=yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

const enhance = withFork({ debug: false })

export default enhance(MyDocument as any)
