import Head from 'next/head'
import Layout from "../../components/layout/layout"
import Pager from "../../components/pager/pager"
import Article from '../../components/article/article'
import {siteTitle} from "../../components/layout/layout"
const COUNT_PER_PAGE = 4

export default function Archive(props) {
  const { posts, page, total, perPage } = props
  return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle} - Archive</title>
      </Head>
        {posts.map(postData => (
          <Article 
          id={postData.id}
          title={postData.title}
          publishedAt={postData.publishedAt}
          content={postData.body}
          categoryName={postData.category ? postData.category.name : ""}
          key={postData.id}
          />
        ))}
      <Pager
        page={page} total={total} perPage={perPage}
        href="/archive/[page]"
        asCallback={(page) => `/archive/${page}`}
      />
      </Layout>
  )
}

export const getStaticProps = async ({params}) => {
  const page = parseInt(params.page, 10)
  const end = COUNT_PER_PAGE * page
  const start = end - COUNT_PER_PAGE
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents.slice(start, end),
      page,
      total: data.contents.length,
      perPage: COUNT_PER_PAGE,
    },
  };
};

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
  const pages = range(Math.ceil(data.contents.length/ COUNT_PER_PAGE))
  const paths = pages.map((page) => ({
    params: { page: `${page}` }
  }))
  return {paths, fallback: false};
};

function range(maxPageNumber) {
  return Array.from({ length: maxPageNumber }, (_, i) => i + 1)
}