import styles from './BalCard.module.css';

// importing icons
import { SiCashapp } from "react-icons/si";
import { MdCircle, MdOutlineShowChart } from 'react-icons/md';

// importing components
import DashboardNav from '../../components/dashboardNav/DashboardNav';

//import useCollection hook
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

export default function BalCard({document}) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if(document[0]){
      const { bal } = document[0];
      const bals = [
        {title: "Balance", bal: bal.balance},
        {title: "Investment", bal: bal.investment},
        {title: "Profit", bal: bal.profit},
        {title: "Savings", bal: bal.savings},
        {title: "Withdrawal", bal: bal.withdrawal},
      ]
    
      setBalance(bals)
      console.log(bals)
    }
  }, [document])


  return ((document[0] && balance) &&
    <div className={styles.container}>
      <DashboardNav />
        <Carousel partialVisibilityGutter itemClass="wrapper" responsive={responsive} className={styles.carousel}>
        {balance.map((bal, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardheader}>
              <div className={styles.cardtitle}>
                <SiCashapp className={styles.icon} />
                <h3>{bal.title}</h3>
              </div>
  
              <div className={styles.isactive}>
                <p>Active</p>
                <MdCircle className={styles.circle} />
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>${bal.bal}</h1>
              <MdOutlineShowChart className={styles.chart} />
            </div>
          </div>
        ))}
        </Carousel>
    </div>
  )
}


export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};