import Head from 'next/head'
import Link from "next/link"
import Layout from "../../components/layout/layout"
import styles from "../../styles/Category/Category.module.css"
import {siteTitle} from "../../components/layout/layout"

export default function CategoryList(props) {
  return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle} - Category List</title>
      </Head>
      <div className={styles.container}>
      <ul className={styles.categoryList}>
        {Object.keys(props.allCategory).map(category => 
        (
        <li className={styles.categoryList__item} key={category}>
          <Link href={{
              pathname: '/category/[category]',
              query: {category: category}
            }}><a>{category} ({props.allCategory[category]})</a>
          </Link>
          </li>
          )
        )}
        </ul>
        </div>
      </Layout>
  )
}

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog?limit=100', key)
    .then(res => res.json())
    .catch(() => null);

  let allCategory = {}
  data.contents.forEach(content => {
    if(content.category){
      const categoryName = content.category.name
      if(categoryName in allCategory){
        allCategory[categoryName] += 1
      } else{
        allCategory[categoryName] = 1
      }
    }
  })

  return {
    props: {
      allCategory: allCategory 
    },
  };
};
