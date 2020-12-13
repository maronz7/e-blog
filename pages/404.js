import Head from 'next/head'
import utilStyles from '../styles/utils/utils.module.css'
import { Layout, siteTitle } from '../components/layout/layout'

const Custom404 = ()=>  {
    return (
    <Layout>
      <Head>
        <title>{siteTitle} - Not Found</title>
      </Head>
      <div className={utilStyles.notFound}>
        <header className={utilStyles.notFound__header}>ページが見つかりません。</header>
      </div>
    </Layout>
  );
}

export default Custom404