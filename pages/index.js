import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout/layout'
import styles from '../styles/Home.module.css'
import utilsStyles from '../styles/utils.module.css'
import Article from '../components/article/article'
import { FaAngleDoubleRight } from 'react-icons/fa'

export default function Home({ allPostsData, hasArchive }) {
  return (
    <Layout home sidebar>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {allPostsData.map(postData => (
        <Article
          id={postData.id}
          title={postData.title}
          publishedAt={postData.publishedAt}
          content={postData.body}
          imageUrl={postData.image ? postData.image.url : ""}
          categoryName={postData.category ? postData.category.name : ""}
          key={postData.id}
        />
      ))}
      {hasArchive ? (
        <div className={styles.homeArchive}>
          <Link href="/archive/[page]" as="/archive/2"><a><FaAngleDoubleRight className={utilsStyles.doubleRight} />NEXT PAGE</a></Link>
        </div>
      ) : ``}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const MAX_COUNT = 4;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
  const hasArchive = data.contents.length > MAX_COUNT;

  return {
    props: {
      allPostsData: data.contents.slice(0, MAX_COUNT),
      hasArchive
    },
  };
};