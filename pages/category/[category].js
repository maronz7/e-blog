import Head from 'next/head'
import Layout from "../../components/layout/layout"
import Article from "../../components/article/article" 
import {siteTitle} from "../../components/layout/layout"


export default function Category(props) {
  return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle} - Category</title>
      </Head>
      {props.categoryPostsData.map((postData) =>
      <Article 
          id={postData.id}
          title={postData.title}
          publishedAt={postData.publishedAt}
          content={postData.body}
          categoryName={postData.category ? postData.category.name : ""}
          key={postData.id}
          />
      )}
      </Layout>
  )
}

export const getStaticProps = async (context) => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
    
    let categoryData = []
    data.contents.forEach(content => {
      if(content.category){
        if(content.category.name === context.params.category){
          categoryData.push(content)
        }
      }})
  
  return {
    props: {
      categoryPostsData: categoryData
    },
  };
};

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);

  let paths = []
  data.contents.forEach(content =>{
    if(content.category){
      paths.push(`/category/${content.category.name}`)
    }});

    return { paths, fallback: false };
};