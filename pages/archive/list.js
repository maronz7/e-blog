import Head from 'next/head'
import Link from "next/link"
import styles from "../../styles/Archive/Archive.module.css"
import { Layout } from "../../components/layout/layout"
import { siteTitle } from "../../components/layout/layout"

const ArchiveList = (props) => {
  return (
    <Layout sidebar>
      <Head>
        <title>{siteTitle} - Archive List</title>
      </Head>
      <div className={styles.container}>
      <ul className={styles.archiveList}>
        {Object.keys(props.archives).map(archive => 
        (
        <li className={styles.archiveList__item} key={archive}>
          <Link href={{
              pathname: '/archive/[archive]',
              query: {archive: archive}
            }}><a>{archive} ({props.archives[archive]})</a>
          </Link>
          </li>
          )
        )}
        </ul>
        </div>
      </Layout>
  )
}

export default ArchiveList

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://e-blog.microcms.io/api/v1/blog?limit=100', key)
    .then(res => res.json())
    .catch(() => null);

  let archives = {}
  data.contents.forEach(content => {
      const archiveDate = content.createdAt.slice(0,7)
      if(archiveDate in archives){
        archives[archiveDate] += 1
      } else{
        archives[archiveDate] = 1
      }
    
  })

  return {
    props: {
      archives: archives 
    },
  };
};
