import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout/layout'
import utilStyles from '../styles/utils.module.css'

export default function Custom404() {
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

