/* eslint-disable max-len */

import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

function Dashboard() {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      <Head>
        <title>Import Euro Car – Купить авто из Европы под заказ</title>
        <meta
          name="description"
          content="Ваш надёжный партнёр в мире автомобилей. Лучшие авто по низким ценам!"
        />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Dashboard
