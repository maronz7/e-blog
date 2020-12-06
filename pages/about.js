import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout/layout'
import styles from '../styles/About.module.css'

export default function About() {
    return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.about}>
        <header className={styles.about__header}>ABOUT</header>
        <div className={styles.about__contents}>
        <p >経歴</p>
        <ul>
          <li>2018年に東京工業大学大学院を卒業し、ITベンチャーへ入社</li>
          <li>2018年〜2019年、エンジニアとしてElasticsearchや、Angularフレームワークでの画面開発経験を積みながら、採用担当として会社説明会、合同説明会や面接対応などの経験を積む</li>
          <li>2019年〜2020年、営業支援、広報などバックオフィスとしてHP作成、運用やコンテンツ作成、営業資料作成、Wantedly運用などの経験を積む。</li>
        </ul>
        <p>現在はReactなどフロントエンドを中心に勉強中。仕事の依頼は問い合わせよりお願い致します。</p>
        <p>バンド演奏、サッカーあたりが好きです。</p>
        </div>
      </div>

    </Layout>
  );
}

