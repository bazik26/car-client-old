import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/components/layout/Layout'
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import YandexMapС from '@/components/elements/YandexMap/YandexMapС'

function Contacts() {
  const getDefaultTextGenerator = useCallback(() => 'Контакты', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title> Cars Euro | Контакты</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png" />
        <meta
          name="description"
          content="Свяжитесь с нами для консультаций и вопросов.
        Контактная информация Cars Euro — мы всегда рады помочь вам."
        />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <ContactsPage />
          <YandexMapС />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default Contacts
