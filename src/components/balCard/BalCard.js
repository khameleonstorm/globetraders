import styles from './BalCard.module.css';

// importing icons
import { MdOutlineShowChart, MdSavings } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { GiCash, GiReceiveMoney } from 'react-icons/gi';
import { TiChartBar } from 'react-icons/ti';

// importing components
import DashboardNav from '../../components/dashboardNav/DashboardNav';

//import useCollection hook
import useCollection from '../../hooks/useCollection';
import { useState, useEffect } from 'react';

//user and update
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import CountUp from 'react-countup';
import useAuth from '../../hooks/useAuth';
import { useCallback } from 'react';

export default function BalCard() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(null);
  const [interest, setInterest] = useState(0);
  const { document } = useCollection('profile', false, true);
  const ref = doc(db, "profile", user.email);

  const handleProfit = useCallback((bal) => {
    if(bal.investment < 100){
      console.log("less")
      setDuration(null)
    }
    if(bal.investment === 100){
      console.log("100")
      setDuration(86400)
      setInterest(5)
      setTimeout(() => {
        updateDoc(ref, { "bal.profit": 5})
      }, 86400000)
    }

    if(bal.investment === 1500){
      setDuration(86400)
      setInterest(150)
      setTimeout(() => {
        updateDoc(ref, { "bal.profit": 150})
      }, 86400000)
    }

    if(bal.investment === 3000){
      setDuration(172800)
      setInterest(900)
      setTimeout(() => {
        updateDoc(ref, { "bal.profit": 900})
      }, 172800000)
    }

    if(bal.investment === 5000){
      setDuration(172800)
      setInterest(2500)
      setTimeout(() => {
        updateDoc(ref, { "bal.profit": 2500})
      }, 172800000)
    }

    if(bal.investment === 10000){
      setDuration(604800)
      setInterest(4500)
      setTimeout(() => {
        updateDoc(ref, { "bal.profit": 4500})
      }, 604800000)
    }
  }, [ref])



  useEffect(() => {
    if(document){
      const doc = {...document[0]}
      const { bal } = doc
      const bals = [
        {title: "Balance", bal: bal?.balance},
        {title: "Investment", bal: bal?.investment},
        {title: "Profit", bal: bal?.profit},
        {title: "Savings", bal: bal?.savings},
        {title: "Withdrawal", bal: bal?.withdrawal},
      ]
      setBalance(bals)
      console.log(bals)

      if(bal?.balance > 0){
        setIsActive(true)
      } else {
        setIsActive(false)
      }

      if(bal?.investment === 0){
        setDuration(null)
      }

      if(bal?.investment > 0){
        setDuration(60)
        handleProfit(bal)
      }
      
    }
  }, [document])




  return ((balance && balance !== undefined) &&
    <div className={styles.container}>
      <DashboardNav />
      <div className={styles.balCard}>
        {balance.map((bal, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardheader}>
              <div className={styles.cardtitle}>
                <h3>{bal.title}</h3>
              </div>
  
              <div className={styles.isactive}>
                {bal.title === "Balance" && <FaCoins className={styles.circle}/>}
                {bal.title === "Profit" && <GiCash className={styles.circle}/>}
                {bal.title === "Savings" && <MdSavings className={styles.circle}/>}
                {bal.title === "Withdrawal" && <GiReceiveMoney className={styles.circle}/>}
                {bal.title === "Investment" && <TiChartBar className={styles.circle}/>}
              </div>
            </div>
  
            <div className={styles.cardbody}>
              {bal.title !== "Profit" && <h1>${bal.bal}</h1>}
              {(bal.title === "Profit" && !duration) && <h1>${bal.bal}</h1>}
              {(bal.title === "Profit" && duration) && 
              <h1>$<CountUp delay={2} decimals={3} end={interest} duration={duration}/></h1>}
              <MdOutlineShowChart className={styles.chart} style={isActive ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}