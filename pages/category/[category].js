// import Link from "next/link"
// import Layout from "../../components/layout/layout"
// // import Pager from "../../components/pager/pager"
// import styles from "../../styles/Home.module.css"
// // const COUNT_PER_PAGE = 4

// export default function Category(categoryPostsData) {
//   const { posts, page, total, perPage } = props
//   return (
//     <Layout>
//       {categoryPostsData.map((post) => <div
//         key={post.id}
//         className={styles.postTeaser}
//       >
//         <h2><Link href="/posts/[id]" as={`/posts/${post.id}`}><a>{post.title}</a></Link></h2>
//         <div><span>{post.publishedAt}</span></div>
//       </div>)}
//       {/* <Pager
//         page={page} total={total} perPage={perPage}
//         href="/archive/[page]"
//         asCallback={(page) => `/archive/${page}`}
//       /> */}
//       </Layout>
//   )
// }

// export const getStaticProps = async (selectedCategory) => {
//   const key = {
//     headers: { 'X-API-KEY': process.env.API_KEY },
//   };
//   const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
//     .then(res => res.json())
//     .catch(() => null);

//   const catagoryData =  data.contents.filter(content => content.category.name === selectedCategory)
  
//   return {
//     props: {
//       categoryPostsData: catagoryData,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const key = {
//     headers: {'X-API-KEY': process.env.API_KEY},
//   };
//   const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
//     .then(res => res.json())
//     .catch(() => null);

//   const catagoryData =  data.contents.filter(content => content.category === selectedCategory)

//   const paths = catagoryData.map(content => `/category/${content.category.name}`);
//   return {paths, fallback: false};
// };


// export const getStaticPaths = async () => {
//   const key = {
//     headers: {'X-API-KEY': process.env.API_KEY},
//   };
//   const data = await fetch('https://e-blog.microcms.io/api/v1/blog', key)
//     .then(res => res.json())
//     .catch(() => null);
//   const pages = range(Math.ceil(data.contents.length/ COUNT_PER_PAGE))
//   const paths = pages.map((page) => ({
//     params: { page: `${page}` }
//   }))
//   return {paths, fallback: false};
// };

// function range(maxPageNumber) {
//   return Array.from({ length: maxPageNumber }, (_, i) => i + 1)
// }