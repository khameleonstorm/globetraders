import styles from './InvestmentCard.module.css';
import { BsCheck } from "react-icons/bs";
import useAuth from '../../hooks/useAuth';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import useCollection from '../../hooks/useCollection';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";

export default function InvestmentCard({ title, subtitle, plans, showHeader }) {
  const { user, authIsReady } = useAuth()
  const [amount, setAmount] = useState(null);
  const [plan, setPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { document } = useCollection('profile', true, false);
  const [filteredDoc, setFilteredDoc] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(null);

  useEffect(() => {
    if(user){
      if(document){
        setFilteredDoc(document.filter((doc) => doc.email === user.email))
      }
    }
  }, [document, user])

  const resetInput = () => {
    setModalSuccess('Investment successful')
    setTimeout(() => {
      setShowModal(false)
      setAmount(null)
      setPlan(null)
      setModalError(null)
      setModalSuccess(null)
    }, 3000)
  }

  const errorManager = (error) => {
    setModalError(error)
    setTimeout(() => {
      setModalError(null)
    }, 3000)
  }
  

  const handleInvest = (plan) => {
    setPlan(plan)
    setShowModal(true)
  }

  
  const sendMessage = (amount, name) => {
    var templateParams = {
      amount,
      name,
      email: user.email,
      date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
      title: "Investment"
    };
 
    emailjs.send('service_wsdp3tb', 'template_pd29tan', templateParams, '74R_DDLz3jQ-9BmyI')
    .then((result) => {
        console.log("result", result.text);
    }, (error) => {
        console.log("error", error.text);
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const ref = doc(db, "profile", user.email);
    if(filteredDoc){
      if(amount && plan){
        // parse amount to number
        const amountNumber = Number(amount);
        const { bal, fullName } = filteredDoc[0];

        // Trial plan investment
        if(plan === "Trial"){
          if(amountNumber === 100){
              if(bal.balance >= amountNumber){
              const newBal = bal.balance - amountNumber;
              const newInvest = bal.investment + amountNumber;
              const newBalances = {
                balance: newBal,
                investment: newInvest,
                profit: bal.profit,
                savings: bal.savings,
                withdrawal: bal.withdrawal,
              }

              await updateDoc(ref, {"bal": newBalances});
              resetInput();
            } else {
              errorManager('Insufficient balance')
            }
          } else {
            errorManager('Amount must be 100')
          }
        }


        // Promotion plan investment
        if(plan === "Promotion"){
          if(amountNumber === 1500){
            if(bal.balance >= amountNumber){
              const newBal = bal.balance - amountNumber;
              const newInvest = bal.investment + amountNumber;
              const newBalances = {
                balance: newBal,
                investment: newInvest,
                profit: bal.profit,
                savings: bal.savings,
                withdrawal: bal.withdrawal,
              }

              await updateDoc(ref, {"bal": newBalances });
              resetInput();
            } else {
              errorManager('Insufficient balance')
            }
          } else {
            errorManager('Amount must be 1500')
          }
        }

        // Expert plan investment
        if(plan === "Expert"){
          if(amountNumber === 3000){
            if(bal.balance >= amountNumber){
              const newBal = bal.balance - amountNumber;
              const newInvest = bal.investment + amountNumber;
              const newBalances = {
                balance: newBal,
                investment: newInvest,
                profit: bal.profit,
                savings: bal.savings,
                withdrawal: bal.withdrawal,
              }

              await updateDoc(ref, {"bal": newBalances });
              resetInput();
            } else {
              errorManager('Insufficient balance')
            }
          } else {
            errorManager('Amount must be 3000')
          }
        }


        // Exclusive plan investment
        if(plan === "Exclusive"){
          if(amountNumber === 5000){
            if(bal.balance >= amountNumber){
              const newBal = bal.balance - amountNumber;
              const newInvest = bal.investment + amountNumber;
              const newBalances = {
                balance: newBal,
                investment: newInvest,
                profit: bal.profit,
                savings: bal.savings,
                withdrawal: bal.withdrawal,
              }

              await updateDoc(ref, {"bal": newBalances });
              resetInput();
            } else {
              errorManager('Insufficient balance')
            }
          } else {
            errorManager('Amount must be 5000')
          }
        }


        // Premium plan investment
        if(plan === "Premium"){
          if(amountNumber === 10000){
            if(bal.balance >= amountNumber){
              const newBal = bal.balance - amountNumber;
              const newInvest = bal.investment + amountNumber;
              const newBalances = {
                balance: newBal,
                investment: newInvest,
                profit: bal.profit,
                savings: bal.savings,
                withdrawal: bal.withdrawal,
              }

              await updateDoc(ref, {"bal": newBalances });
              resetInput();
            } else {
              errorManager('Insufficient balance')
            }
          } else {
            errorManager('Amount must be 10000')
          }
        }


        //Company plan investment
        if(plan === "Company"){
          if(amountNumber === 20000){
            if(bal.balance >= amountNumber){
              const newBal = bal.balance - amountNumber;
              const newInvest = bal.investment + amountNumber;
              const newBalances = {
                balance: newBal,
                investment: newInvest,
                profit: bal.profit,
                savings: bal.savings,
                withdrawal: bal.withdrawal,
              }

              await updateDoc(ref, {"bal": newBalances });
              resetInput();
            } else {
              errorManager('Insufficient balance')
            }
          } else {
            errorManager('Amount must be 20000')
          }
        }

        sendMessage(amountNumber, fullName)
      }
    }


    setTimeout(() => {
    }, 3000)
  }




  return (authIsReady &&
    <>
    {showHeader && 
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    }

    {showModal &&
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            {!modalSuccess && <h1>Enter Amount</h1>}
            {modalSuccess && <h1 style={{color: "#00ff00"}}>{modalSuccess}</h1>}
            <TextField 
              id="Amount" 
              label="Amount" 
              variant="outlined" 
              fullWidth
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className={styles.btns}>
              <Button 
              variant="contained"  
              type="submit"
              className={styles.submit}
              >Invest</Button>
              <p className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className={styles.error}>{modalError}</p>}
          </form>
        </div>
      </div>
    }
    <div className={styles.container} id="pricing">
      {plans.map((plan)  =>
          <div className={styles.card} key={plan.id}>
            <div className={styles.content3}>
            </div>
            <div className={styles.content1}>
              <h2>{plan.title}</h2>
              <h3>{plan.amount}</h3>
              <p>{plan.desc}</p>
              <span></span>
            </div>
            <button onClick={() => handleInvest(plan.desc, plan.title)}>Invest</button>
            <div className={styles.content2}>
              {plan.truepoints.map((truepoint) => <div key={truepoint} className={styles.fact1}><span><BsCheck /><p>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
    </div>
    </>
  )
}
