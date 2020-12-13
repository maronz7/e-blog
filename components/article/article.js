import Link from 'next/link'
import utilStyles from '../../styles/utils/utils.module.css'
import styles from './article.module.css'
import { Date } from '../date'

export const Article = (props) => {

  const summaryText = props.content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').substr(0, 200);

  return (
    <Link href={`/posts/${props.id}`}>
      <a>
        <article className={`${styles.articleList} ${styles.articleList__list}`} key={props.id}>
          <div className={styles.articleList__image}>
            {props.imageUrl ? (
              <img src={props.imageUrl} />
            ) : <img src="/images/noImage.png" />}
          </div>
          <div className={styles.articleList__summary}>
            <h2>{props.title}</h2>
            <small className={utilStyles.lightText}>
              <Date dateString={props.publishedAt} />
            </small>
            {props.categoryName ? (
              <p className={utilStyles.squareText}>
                {props.categoryName}
              </p>
            ) : (<p className={utilStyles.noCategory}></p>)}
            <p>{summaryText}</p>
          </div>
        </article>
      </a>
    </Link>
  )
}