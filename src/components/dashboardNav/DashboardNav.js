import s from './DashboardNav.module.css';
import { MdKeyboardArrowDown, MdOutlinePendingActions, MdPending, MdCheckCircle, MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"
import useCollection from '../../hooks/useCollection';
import { updateDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { MoonLoader } from 'react-spinners';
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";

export default function DashboardNav({admin}) {
  const { authIsReady, user } = useAuth()
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const [coinName, setCoinName] = useState(null);
  const [coinNetwork, setCoinNetwork] = useState("BITCOIN");
  const { document } = useCollection('profile', false, true);
  const { document: Doc2 } = useCollection('transactions', true, false);
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const ref = doc(db, "profile", user.email);
  


  const sendMessage = (amount, name, email) => {
    var templateParams = {
      amount,
      name,
      email,
      date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
      title: "Withdrawal"
    };
 
    emailjs.send('service_wsdp3tb', 'template_pd29tan', templateParams, '74R_DDLz3jQ-9BmyI')
    .then((result) => {
        console.log("result", result.text);
    }, (error) => {
        console.log("error", error.text);
    });
  }


  const handleTransaction = async (id, amount, fullName, email) => {
    const newRef = doc(db, "transactions", id);
    const response = prompt("Input 'yes' if you want to approve this transaction?")
    if(response === 'yes'){
      sendMessage(amount, fullName, email)
      updateDoc(newRef, {
        status: 'approved'
      })
    }
  }



  const handleWithdraw = () => {
    setShowModal(true)
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsPending(true)

    if(document){
      if(amount && address){
        // parse amount to number
        const amountNumber = Number(amount);
        const { bal, fullName } = document[0];
        const availableWithdraw = bal.investment + bal.profit + bal.balance
        
        if(availableWithdraw >= amountNumber){
          const newInvestment = bal.balance - amountNumber;
          let newBalances = bal
          if(newInvestment <= 0) {
            const newBal = bal.profit + bal.investment + newInvestment;
            newBalances = {...bal, balance: newBal, profit: 0, investment: 0}
          }

          if(newInvestment >= 0) {
            newBalances = {...bal, balance: newInvestment}
          }

          const mailDetails = {
            amount: amountNumber,
            address,
            coinName,
            coinNetwork,
            date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
            status: "pending",
            email: user.email,
            fullName
          }
        
          try{
            await updateDoc(ref, {
              "bal": newBalances
            });

            await addDoc(collection(db, "transactions"), mailDetails);
            
            const res = await fetch(`https://globe-mail.vercel.app/send-email`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(mailDetails),
            })
          
            const data = await res.json()
            
            if(res.ok){
              setIsPending(false)
              setModalSuccess("Success")
            } 
            else throw new Error(data.message)
          } catch (err) { 
            setModalError('Something went wrong, try again later...') 
            setIsPending(false)
          }
          
          setModalSuccess(true)
          setTimeout(() => setIsPending(false), 3000)
        } else {
          setModalError('Insufficient funds')
          setTimeout(() => setModalError(null), 3000)
        }
      } else {
        setModalError('Please fill all fields')
        setTimeout(() => setModalError(null), 3000)
      }
    }
  }

  const backToDashboard = () => {
    setModalSuccess(false)
    setShowModal(false)
    setAmount(null)
    setAddress(null)
    setModalError(null)
  }


  return ((authIsReady && user) &&
  <>
  {showTransactions && 
  <div className={s.transaction}>
    <MdArrowBack className={s.exit} onClick={() => setShowTransactions(false)}/>
    {Doc2?.map((doc, i) => (
      <div key={i} className={s.transaction_item} onClick={() => handleTransaction(doc.id, doc.amount, doc.fullName, doc.email)}>
        <div className={s.transaction_item_left}>
          <p>{doc.email}</p>
          <p>Address: {doc.address}</p>
          <p>{doc.date}</p>
        </div>
        <div className={s.transaction_item_right}>
          <h3>${doc.amount}</h3>
          {doc.status === "pending" && <p>{doc.status}<MdPending color='#ffa200'/></p>}
          {doc.status === "approved" && <p>{doc.status}<MdCheckCircle color='#62ff00'/></p>}
        </div>
      </div>
    ))}

  </div>  
  }
      {(modalSuccess && isPending) && 
      <div className={s.modalSuccess}>
        <div className={s.modalSuccessContainer}>
          <MoonLoader color="#ffd016"/>
          <h1>Processing Your Withdrawal</h1>
        </div>
      </div>
      }

      {(modalSuccess && !isPending) && 
      <div className={s.modalSuccess}>
        <div className={s.modalSuccessContainer}>
          <MdOutlinePendingActions size="4rem" color="#ffd016"/>
          <h1>Withdrawal Is Pending</h1>
          <p>Contact Us For More Info!</p>
          <button className={s.back} onClick={backToDashboard}>Back To Dashboard</button>
        </div>
      </div>
      }

      {showModal &&
      <div className={s.modal}>
        <div className={s.modalcontent}>
          <form onSubmit={handleSubmit}>
            <h1>Enter Withdrawal Details</h1>
            
            <div className={s.formGroup}>
            <div className={s.full}>
              <label>Amount</label>
              <input 
                value={amount}  
                className='formInput' type='number' 
                placeholder='Enter Amount' 
                onChange={(e) => setAmount(e.target.value)}/>
            </div>

              <div>
                <label>Select Coin</label>
                <select value={coinName} onChange={(e) => setCoinName(e.target.value)} className='formInput'>
                  <option value='BITCOIN'>BITCOIN</option>
                  <option value='USDT'>USDT</option>
                </select>
              </div>

              <div>
                <label>Select Coin Network</label>
                <select value={coinNetwork} onChange={(e) => setCoinNetwork(e.target.value)} className='formInput'>
                  <option value='BITCOIN'>BITCOIN</option>
                  <option value='ERC20'>ERC20</option>
                  <option value='TRC20'>TRC20</option>
                </select>
              </div>

              <div className={s.full}>
                <label>Wallet Address</label>
                <input 
                  value={address}  
                  className='formInput' type='text' 
                  placeholder='Enter Address' 
                  onChange={(e) => setAddress(e.target.value)}/>
              </div>
            </div>

            <div className={s.btns}>
              <button  type="submit" className={s.submit} >{isPending? "Loading...": "withdraw"}</button>
              <p className={s.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className={s.error}>{modalError}</p>}
          </form>
        </div>
      </div>
    }


    <div className={s.container}>
      <div className={s.hello} style={admin && {paddingLeft: "80px"}}>
        <p>Hello! </p>
        <p>{user.displayName}</p>
      </div>
      <div className={s.logo}>
        <div className={s.image} style={{cursor: 'pointer'}} onClick={() => setMenu(!menu)}>
          <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="Avatar!" />
        </div>
        <MdKeyboardArrowDown size="1.8em" style={{cursor: 'pointer'}} onClick={() => setMenu(!menu)}/>
        {menu && 
          <div className={s.menu} onClick={() => setMenu(!menu)}>
            {(user?.email !== "worldofhydras@gmail.com") && 
            <>
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/stocks">Plans</Link>
              <Link to="#" onClick={handleWithdraw}>Withdraw</Link>
            </>
            }
            {(user?.email === "worldofhydras@gmail.com") && <Link to="#" onClick={() => setShowTransactions(true)}>Transactions</Link>}
            <Button variant="outlined" color="error" size="small" style={{fontSize: "0.7rem"}} onClick={logout}> Logout <HiOutlineLogout size="1.3em"
            style={{marginLeft: "1rem"}}
            /></Button>
          </div>
        }
      </div>
    </div>
  </>
  )
}
