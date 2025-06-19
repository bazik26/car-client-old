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
        <title>Import Euro Car – авто из Европы, США и Кореи под заказ</title>
        <meta
          name="description"
          content="OOO `Велес` - Импорт автомобилей из Европы в Россию под ключ. Подбор, проверка, доставка, растаможка и оформление. Только проверенные авто. Гарантия юридической чистоты."
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
