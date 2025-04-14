// import AuthPage from '@/components/templates/AuthPage/AuthPage'
// import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
// import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
// import Head from 'next/head'

// function Auth() {
//   const { shouldLoadContent } = useRedirectByUserCheck(true)

//   return (
//     <>
//       <Head>
//         <title>Аква Термикс | {shouldLoadContent ? 'Авторизация' : ''}</title>
//         <meta charSet="UTF-8" />
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
//       </Head>
//       {shouldLoadContent && <AuthPage />}

//     </>
//   )
// }

// export default Auth

/* eslint-disable max-len */

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

function Dashboard({
  metaTitle,
  metaDescription,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      {shouldLoadContent && (
        <Layout>
          <main>
            {/* <Breadcrumbs
              getDefaultTextGenerator={() => ''}
              getTextGenerator={() => ''}
            /> */}
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Dashboard

// 🚀 Теперь страница будет рендериться на сервере (SSR)
// eslint-disable-next-line arrow-body-style
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      metaTitle: 'Купить авто из Европы под заказ – Cars Euro',
      metaDescription:
        'Ваш надёжный партнёр в мире автомобилей. Лучшие авто по низким ценам!',
    },
  }
}
