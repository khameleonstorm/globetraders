import { useState } from 'react';
import Users from '../../components/allUsers/Users';
import styles from './Admin.module.css';
import useAuth from '../../hooks/useAuth';
import useCollection from '../../hooks/useCollection';
import { TextField } from '@mui/material';
import { db } from '../../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const { document, error, isPending } = useCollection('profile', true, false);
  const { user, authIsReady } = useAuth();
  const [singleDoc, setSingleDoc] = useState(null);
  const [balance, setBalance] = useState(null);
  const [profit, setProfit] = useState(null);
  const [investment, setInvestment] = useState(null);
  const [withdrawal, setWithdrawal] = useState(null);
  const [savings, setSavings] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const ref = doc(db, "profile", user.email);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);


  
const filter = (email) => {
  let filteredDoc = document.filter((doc) => doc.email === email)
  setSingleDoc(filteredDoc[0])
  setBalance(filteredDoc[0].bal.balance)
  setProfit(filteredDoc[0].bal.profit)
  setInvestment(filteredDoc[0].bal.investment)
  setWithdrawal(filteredDoc[0].bal.withdrawal)
  setSavings(filteredDoc[0].bal.savings)
  setDisplayName(filteredDoc[0].displayName)
  setEmail(filteredDoc[0].email)

  console.log(singleDoc, balance, profit, investment, withdrawal, savings)
}

const handleSubmit = async(e) => {
  setPending(true)
  e.preventDefault()

  const newBalances = {
    balance: Number(balance),
    investment: Number(investment),
    profit: Number(profit),
    savings: Number(savings),
    withdrawal: Number(withdrawal),
  }

  await updateDoc(ref, {
    "bal": newBalances
  });

  setMessage("Updated successfully")
  setPending(false)
  setTimeout(() => {
    setMessage(null)
  }, 2000)
}




  return ((authIsReady && user) && 
    <div className={styles.container}>
      <Users document={document} error={error} isPending={isPending} filter={filter}/>

      {singleDoc &&
      <div className={styles.singleUser}>
        <form onSubmit={handleSubmit} className={styles.card}>
          <h1>{displayName}</h1>
          <p>{email}</p>
          <TextField 
          type="number" 
          fullWidth 
          label="Balance" 
          value={balance} 
          onChange={(e) => setBalance(e.target.value)}/>
          <TextField 
          type="number" 
          fullWidth 
          label="Profit" 
          value={profit} 
          onChange={(e) => setProfit(e.target.value)}/>
          <TextField 
          type="number" 
          fullWidth 
          label="Investment" 
          value={investment} 
          onChange={(e) => setInvestment(e.target.value)}/>
          <TextField 
          type="number" 
          fullWidth 
          label="Withdrawal" 
          value={withdrawal} 
          onChange={(e) => setWithdrawal(e.target.value)}/>
          <TextField 
          type="number" 
          fullWidth 
          label="Savings" 
          value={savings} 
          onChange={(e) => setSavings(e.target.value)}/>
          <button 
          className={styles.btn}
          type='submit'>
            {pending? "Updating...": message? `${message}`: "Update"}
          </button>
        </form>
      </div>
      }
    </div>
  )
}
