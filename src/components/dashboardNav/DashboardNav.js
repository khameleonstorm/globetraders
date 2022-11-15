import styles from './DashboardNav.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"
import useCollection from '../../hooks/useCollection';
import { TextField } from '@mui/material';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function DashboardNav() {
  const { authIsReady, user } = useAuth()
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const { document } = useCollection('profile', false, true);
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(null);
  const ref = doc(db, "profile", user.email);



  const handleClick = () => {
    if (menu) {
      setMenu(false)
    }
    if (!menu) {
      setMenu(true)
    }
  }



  const handleContact = () => {
    const input = prompt("Are you sure you want to contact me?", "Type 'yes' for confirmation")
    if (input === "yes") {
      window.location.assign("https://wa.me/17025189205")
    }
  }



  const handleWithdraw = () => {
    setShowModal(true)
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(document){
      if(amount && address){
        // parse amount to number
        const amountNumber = Number(amount);
        const { bal } = document[0];
        if(bal.profit >= amountNumber){
          const newProfit = bal.profit - amountNumber;
          const newWithdraw = bal.withdrawal + amountNumber;
          const newBalances = {
            balance: bal.balance,
            investment: bal.investment,
            profit: newProfit,
            savings: bal.savings,
            withdrawal: newWithdraw
          }

          await updateDoc(ref, {
            "bal": newBalances
          });
          setModalSuccess('Withdrawal successful')
          setTimeout(() => {
            setShowModal(false)
            setAmount(null)
            setAddress(null)
            setModalError(null)
            setModalSuccess(null)
          }, 3000)
        } else {
          setModalError('Insufficient funds')
          setTimeout(() => {
            setModalError(null)
          }, 3000)
        }
      } else {
        setModalError('Please fill all fields')
        setTimeout(() => {
          setModalError(null)
        }, 3000)
      }
    }
  }


  return ((authIsReady && user) &&
  <>
      {showModal &&
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            {!modalSuccess && <h1>Enter Amount & Address</h1>}
            {modalSuccess && <h1 style={{color: "#00ff00"}}>{modalSuccess}</h1>}
            <TextField 
              id="Amount" 
              label="Amount" 
              variant="outlined" 
              fullWidth
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField 
              id="Address" 
              label="Wallet Address" 
              variant="outlined" 
              fullWidth
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className={styles.btns}>
              <Button 
              variant="contained"
              type="submit"
              className={styles.submit}
              >Withdraw</Button>
              <p className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className={styles.error}>{modalError}</p>}
          </form>
        </div>
      </div>
    }


    <div className={styles.container}>
      <div className={styles.hello}>
        <p>Hello! </p>
        <p>{user.displayName}</p>
      </div>
      <div className={styles.logo}>
        <div className={styles.image}>
          <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="Avatar!" />
        </div>
        <MdKeyboardArrowDown size="1.8em" style={{cursor: 'pointer'}} onClick={handleClick}/>
        {menu && 
          <div className={styles.menu} onClick={handleClick}>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/stocks">Plans</Link>
            <Link to="#" onClick={handleContact}>Contact</Link>
            <Link to="#" onClick={handleWithdraw}>Withdraw</Link>
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
