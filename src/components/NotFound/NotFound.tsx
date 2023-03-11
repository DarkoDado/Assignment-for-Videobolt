import styles from './notfound.module.scss'
import { BsExclamationTriangle } from 'react-icons/bs'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const NotFound = () => {
  return (
    <div className={styles.cont}>
      <div className={styles.coverImg}>
      </div>
      <div className={styles.notfoundText}>I think I ate this page...
        <span><BsExclamationTriangle /></span>
        <span>404 - Not Found</span>

          <button><IoIosArrowRoundBack />Home</button>

      </div>

    </div>
  )
}
