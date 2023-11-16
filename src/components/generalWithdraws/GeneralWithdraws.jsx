"use client"
import { useEffect, useState } from 'react';
import styles from './GeneralWithdraws.module.css';
import dateFormat from 'dateformat';

export default function GeneralWithdraws({ withdrawals }) {
const [active, setActive] = useState(0)
const [random, setRandom] = useState(null)
const [date, setDate] = useState(null)

useEffect(() => {
  const interval = setInterval(() => {
    setActive((active + 1) % withdrawals.length);
    setRandom(Math.floor(Math.random() * (200 - 400) + 400))
    setDate(dateFormat(new Date()))
  }, 11800);
  return () => clearInterval(interval);
}, [active, withdrawals.length]);

const { name } = withdrawals[active];


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.recent}>Withdrawal</p>
        <h3>${random}, 000</h3>
        <p>{name}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  )
}
