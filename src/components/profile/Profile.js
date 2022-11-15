import styles from './Profile.module.css'
import useAuth from '../../hooks/useAuth'

export default function Profile() {
  const { user,  authIsReady} = useAuth()


  return ((authIsReady && user) &&
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.cover}>
          <img className={styles.img} src={user.photoURL} alt="avatar"/>
          <img className={styles.avatar} src={user.photoURL} alt="avatar"/>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <h1>@{user.displayName}</h1>
          <p>{user.email}</p>
          <div className={styles.equity}>
            <p>Total Assets</p>
            <h1>$5059680</h1>
          </div>
        </div>
        <div className={styles.referral}>
          <div className={styles.referralCode}>
            <p>Referral Code</p>
            <h1>{user.displayName}</h1>
          </div>
          <div className={styles.referred}>
            <div className={styles.referCount}>
              <p>Referred</p>
              <h1>123</h1>
            </div>
            <div className={styles.referEarn}>
              <p>Bonus</p>
              <h1>$123</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
