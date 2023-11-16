import s from './ContactForm.module.css';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

export default function ContactForm() {

  const handleSubmit = (e) => {
    e.preventDefault();
  }



  return (
    <div className={s.container} id="contact">
      <h1 className={s.title}>Contact</h1>
      <p className={s.subtitle}>Get In Touch</p>
      <div className={s.formContainer}>
        <div className={s.left}>
          <div className={s.address}>
            <div className={s.loc}>
              <div className={s.iconWrapper}>
                <IoLocationSharp size="1.2rem" className={s.icon}/>
              </div>
              <div className={s.locText}>
                <h3>Location</h3>
                <p>Evri ParcelShop, 28-30 W Ham Ln, London E15 4SA, United Kingdom</p>
              </div>
            </div>
            <div className={s.email}>
            <div className={s.iconWrapper}>
              <MdEmail size="1.2rem" className={s.icon}/>
            </div>
              <div className={s.emailText}>
                <h3>Email</h3>
                <p>help@trustsolidinvestment.com</p>
              </div>
            </div>
          </div>
          <div className={s.map}>
          <iframe style={{filter: "invert(90%)"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2746.3701215884003!2d0.002015165224205466!3d51.53872738954454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7b80ce62653%3A0xe40dc1e14447fb14!2sEvri%20ParcelShop!5e0!3m2!1sen!2sng!4v1667830223793!5m2!1sen!2sng" allowFullScreen="yes" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='officeAddress' className={s.iframe}></iframe>
          </div>
        </div>
        <div className={s.right}>
          <form onSubmit={handleSubmit}>
            <div className={s.formGroup}>
              <input placeholder="Full Name" variant="outlined" className={s.input1}/>
              <input placeholder="Email" variant="outlined" className={s.input1}/>
            </div>
            <input placeholder="Subject" variant="outlined" className={s.input}/>
            <textarea rows={10} placeholder="Message" variant="outlined" className={s.input}/>
            <button className={s.btn}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
