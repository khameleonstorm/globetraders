import styles from './Dashboard.module.css';
import useAuth from '../../hooks/useAuth';
import useCollection from '../../hooks/useCollection';

// importing components
import SideNav from '../../components/sideNav/SideNav';
import BalCard from '../../components/balCard/BalCard';
import Charts from '../../components/charts/Charts';
import Funding from '../../components/funding/Funding';
import InvestmentCard from '../../components/investmentCard/InvestmentCard';

// importing router functions
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

// importing plans
import { investment } from '../../utils/investText';
import Profile from '../../components/profile/Profile';
import ReferralText from '../../components/referralText/ReferralText';



export default function Dashboard() {
  const { document } = useCollection('profile', false, true);
  const { authIsReady, user } = useAuth()
  const [spinner, setSpinner] = useState(true)
  const { page } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if(authIsReady){
      if(!user){
        navigate('/login')
      }
    }
    setTimeout(() => setSpinner(false), 1000)
  }, [authIsReady, user, navigate])



  if(spinner){
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }




  return ((authIsReady && user && document) &&
    <div className={styles.container}>
      <div className={styles.side}>
        <SideNav />
      </div>
      {(page === undefined || page === 'home') &&
      <div className={styles.main}>
        <BalCard />
        <ReferralText />
        <Charts />
      </div>
      }


      {page === 'fund' &&
      <div className={styles.main}>
        <Funding />
      </div>
      }


      {page === 'invest' &&
      <div className={styles.main}>
        <InvestmentCard title={investment.title2} subtitle={investment.subtitle2} plans={investment.plans}/>
      </div>
      }


      {page === 'profile' &&
      <div className={styles.main}>
        <Profile document={document}/>
      </div>
      }
      
    </div>
  )
}
