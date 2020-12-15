import Head from 'next/head'
import utilsStyles from '../../styles/utils/utils.module.css'
import { Layout } from "../../components/layout/layout"
import { Article } from "../../components/article/article"
import { siteTitle } from "../../components/layout/layout"
import { useEffect, useState } from 'react'
import { COUNT_PER_PAGE, Pagination } from '../../components/pagination'

const Category = ({ categoryPostsData, totalPages }) => {
  const [page, setPage] = useState(1);
  const [currentPostDatas, setPostDatas] = useState([]);

  useEffect(async () => {
    changeDatas(page);
  }, []);

  const clickPage = (e, page) => {
    setPage(page);
    changeDatas(page);
  }

  const changeDatas = (page) => {
    setPostDatas(categoryPostsData.slice((page - 1) * COUNT_PER_PAGE, page * COUNT_PER_PAGE))
  }

  return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle} - Category</title>
      </Head>
      {currentPostDatas.map((postData) =>
        <Article
          id={postData.id}
          title={postData.title}
          publishedAt={postData.publishedAt}
          content={postData.body}
          imageUrl={postData.image ? postData.image.url : ""}
          categoryName={postData.category ? postData.category.name : ""}
          key={postData.id}
        />
      )}
      <div className={utilsStyles.pagination}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={clickPage}
          page={page}
        />
      </div>
    </Layout>
  )
}

export default Category

export const getStaticProps = async (context) => {
    const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog?limit=100', key)
    .then(res => res.json())
    .catch(() => null);

  let categoryData = []
  data.contents.forEach(content => {
    if (content.category) {
      if (content.category.name === context.params.category) {
        categoryData.push(content)
      }
    }
  })

  return {
    props: {
      categoryPostsData: categoryData,
      totalPages: Math.ceil(categoryData.length / COUNT_PER_PAGE)
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

  let paths = []
  data.contents.forEach(content => {
    if (content.category) {
        paths.push(`/category/${content.category.name}`)
    }
  });

  return { paths, fallback: false };
};