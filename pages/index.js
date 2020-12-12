import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout/layout'
import utilsStyles from '../styles/utils/utils.module.css'
import Article from '../components/article/article'
import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react'

const COUNT_PER_PAGE = 5;

export default function Home({ allPostsData, totalPages }) {
  const [page, setPage] = useState(1);
  const [currentPostDatas, setPostDatas] = useState([]);

  useEffect(async () => {
    changeDatas(page);
  }, []);

  //ページ番号をクリックしたときの処理
  const clickPage = (e, page) => {
    setPage(page);
    changeDatas(page);
  }

  const changeDatas = (page) => {
    setPostDatas(allPostsData.slice((page - 1) * COUNT_PER_PAGE, page * COUNT_PER_PAGE))
  }

  const Pagination = withStyles({
    root: {
      display: 'inline-block', 
    },
  })(MuiPagination);

  return (
    <Layout home sidebar>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {currentPostDatas.map(postData => (
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
      <div className={utilsStyles.pagination}>
        <Pagination
          count={totalPages}         //総ページ数
          color="primary"       //ページネーションの色
          onChange={clickPage}  //変更されたときに走る関数。第2引数にページ番号が入る
          page={page}           //現在のページ番号
        />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog?limit=100', key)
    .then(res => res.json())
    .catch(() => null);

  return {
    props: {
      allPostsData: data.contents,
      totalPages: Math.ceil(data.contents.length / COUNT_PER_PAGE)
    },
  };
};