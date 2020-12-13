import Head from 'next/head'
import Link from 'next/link'
import styles from '../../components/article/article.module.css'
import utilStyles from '../../styles/utils/utils.module.css'
import { Layout } from '../../components/layout/layout'
import { Date } from '../../components/date'
import { siteTitle } from "../../components/layout/layout"

const Post = ({ postData }) => {
  return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle} - {postData.title}</title>
      </Head>
      <article className={styles.article} key={postData.id}>
        <h2>{postData.title}</h2>
        <small className={utilStyles.lightText}>
          <Date dateString={postData.publishedAt} />
        </small>
        <br />
        {postData.category ? (
          <p className={utilStyles.squareText}>
            <Link href={{
              pathname: '/category/[category]',
              query: {category: postData.category.name}
            }}><a>{postData.category.name}</a></Link>
          </p>
        ) : (<p className={utilStyles.noCategory}></p>)}
        {postData.image ? (
          <img src={postData.imageUrl} />
        ) : ``}
        <hr />
        <div
          dangerouslySetInnerHTML={{
            __html: `${postData.body}`,
          }}
        />
      </article>
    </Layout>
  );
}

export default Post

export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch(
    'https://e-blog.microcms.io/api/v1/blog/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      postData: data,
    },
  };
};

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog?limit=100', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/posts/${content.id}`);
  return { paths, fallback: false };
};