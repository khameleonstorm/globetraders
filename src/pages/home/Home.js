// Import css modules stylesheet as styles
import styles from './Home.module.css';
import useAuth from '../../hooks/useAuth';

// Import components
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Clients from '../../components/clients/Clients';
import HomeSec1 from '../../components/homeSec1/HomeSec1';
import HomeSec2 from '../../components/homeSec2/HomeSec2';
import HomeSec3 from '../../components/homeSec3/HomeSec3';
import InvestmentCard from '../../components/investmentCard/InvestmentCard';
import AppleChart from '../../components/appleChart/AppleChart';
import Learning from '../../components/learning/Learning';
import Testimonials from '../../components/testimonials/Testimonials';
import Footer from '../../components/footer/Footer';
import Copyright from '../../components/copyright/Copyright';

// import texts from utils 
import { homeSec1Text, homeSec2Text, homeSec3Text, homeSec4Text, homeSec5Text, homeSec6Text, services, heroText, copyright, testimonies, withdrawals } from '../../utils/homeText';
import ContactForm from '../../components/contactForm/ContactForm';
import { MoonLoader } from 'react-spinners';
import GeneralWithdraws from '../../components/generalWithdraws/GeneralWithdraws';



export default function Home() {
  const { authIsReady } = useAuth();


  if(!authIsReady){
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }


  if(authIsReady){
    return (authIsReady &&
      <div className={styles.container}>
        <Nav />
        <Hero title={heroText.title} subtitle={heroText.subtitle} image={heroText.image} link={heroText.link}/>
        <Clients home={true}/>
        <HomeSec1 title={homeSec1Text.title} subtitle={homeSec1Text.subtitle} card={homeSec1Text.card} />
        <HomeSec2 title={homeSec2Text.title} subtitle={homeSec2Text.subtitle} image={homeSec2Text.image} accordions={homeSec2Text.accordions} />
        <HomeSec3 title={homeSec3Text.title} subtitle={homeSec3Text.subtitle} image={homeSec3Text.image} bars={homeSec3Text.bars} withdrawals={withdrawals}/>
        <InvestmentCard title={homeSec4Text.title} subtitle={homeSec4Text.subtitle} plans={homeSec4Text.plans} showHeader={true} />
        <AppleChart />
        <HomeSec1 title={services.title} subtitle={services.subtitle} card={services.card} />
        <Learning />
        <Testimonials data={testimonies}/>
        <HomeSec2 title={homeSec5Text.title} subtitle={homeSec5Text.subtitle} image={homeSec5Text.image} accordions={homeSec5Text.accordions} reverse={true}/>
        <HomeSec2 title={homeSec6Text.title} subtitle={homeSec6Text.subtitle} image={homeSec6Text.image} accordions={homeSec6Text.accordions} />
        <ContactForm />
        <Footer />
        <Copyright copyright={copyright}/>
        <GeneralWithdraws withdrawals={withdrawals}/>
      </div>
    )

  }
}
