import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'

const name = 'Kurihara Keisuke'
export const siteTitle = 'E-Blog'

export default function Layout({ children, home, sidebar }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="E-Blog : 技術の学びを発信するブログ"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.header__title}>
          <Link href="/"><a>E-Blog</a></Link>
        </h1>
        <nav className={styles.header__links}>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
            <li><Link href="/"><a>Category</a></Link></li>
            <li><Link href="/contact"><a>Contact</a></Link></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        {children}
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}</main>
      {sidebar && (
        <section className={styles.sidebar}>
          <Link href="/about"><a>
            <div className={styles.sidebar__profile}>
              <img src="/images/profile.jpg" className={utilStyles.borderCircle} alt={name} />
              <h1 className={utilStyles.headingMd}>{name}</h1>
              <p>学びを発信するブログです。<br />プログラミング関係が多め。</p>
            </div>
          </a></Link>
        </section>
      )}
    </div>
  )
}