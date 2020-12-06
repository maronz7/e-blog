import Link from "next/link"
import styles from './pager.module.css'

const Pager = (props) => {
  const { total, page, perPage, href, asCallback } = props
  const prevPage = page > 1 ? page - 1 : null
  let nextPage = null
  if (page < Math.ceil(total / perPage)) {
    nextPage = page + 1
  }
  return (
    <div className={styles.pager}>
      <span className={styles.pagerItem}>
        {prevPage ? (
          <Link href={href} as={asCallback(prevPage)}>
            <a>{prevPage}</a>
          </Link>
        ) : ``}
      </span>
      <span className={styles.pagerItem}>{page}</span>
      <span className={styles.pagerItem}>
        {nextPage ? (
          <Link href={href} as={asCallback(nextPage)}>
            <a>{nextPage}</a>
          </Link>
        ) : ``}
      </span>
    </div>
  )
}
export default Pager