import styles from './SignUp.module.css';
import Nav from '../../components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useState } from 'react';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import {AiFillCamera} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { countries } from '../../utils/countries';
import axios from 'axios';
import { useSignup } from '../../hooks/useSignup';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';


export default function SignUp() {
  const { authIsReady, user } = useAuth()
  const navigate = useNavigate()
  const {signUp, isPending, error} = useSignup()
  const [countryName, setCountryName] = useState("")
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    country: countryName,
    image: {},
    referral: '',
    gender: '',
    emailChecked: false,
    policyChecked: false,
    showPassword: false,
  });

  const [formError, setFormError] = useState({
    fullName: null,
    username: null,
    email: null,
    country: null,
    image: null,
    gender: null,
    referral: null,
    emailChecked: null,
    policyChecked: null,
  })


  // handling change for input fields
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling password toggle mode
  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword });
  };

  // handling mouse event 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handling image upload
  const handleImageUpload = (e) => {
    setValues({...values, image: e.target.files[0] });
  };

  // handling checkbox
  const handleCheckBox = (prop) => (e) => {
    setValues({...values, [prop]: e.target.checked});
    setFormError({ ...formError, [prop]: null })
  };


  // handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      country: values.country,
      image: values.image,
      referral: values.referral,
      password: password,
      gender: values.gender
    };

    // validating form
    if(values.fullName === "") {
      setFormError({...formError, fullName: "Full name is invalid"});
      return
    }

    if(values.fullName.length < 3) {
      setFormError({...formError, fullName: "Full name is too short"});
      return
    }

    if(values.username === "") {
      setFormError({...formError, username: "Username is invalid"});
      return
    }

    if(values.username.length < 3) {
      setFormError({...formError, username: "Username is too short"});
      return
    }

    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }

    if(values.country === "") {
      setFormError({...formError, country: "Select Your Country"});
      return
    }

    if(values.gender === "") {
      setFormError({...formError, gender: "Select Your Gender"});
      return
    }

    if(values.image === {} || values.image === undefined) {
      setFormError({...formError, image: "Image is invalid"});
      return
    }

    if(values.image.size > 5000000) {
      setFormError({...formError, image: "Image size is too large"});
      return
    }

    if(password === "") {
      setFormError({...formError, password: "Password is invalid"});
      return
    }

    if(password.length < 6) {
      setFormError({...formError, password: "Password is too short"});
      return
    }

    if(values.policyChecked === false) {
      setFormError({...formError, policyChecked: "Please agree to the terms and conditions"});
      return
    }

    if(values.emailChecked === false) {
      setFormError({...formError, emailChecked: "Please agree to receive emails"});
      return
    }

    // sending data to server
    signUp(data);


    console.log(data);
  };


  useEffect(() => {
  axios.get('https://ipapi.co/json/').then((response) => {
      setCountryName(response.data.country_name);
  }).catch((error) => {
      console.log(error);
  });

  if(user) {
    navigate('/dashboard')
  }
  }, [user, navigate]);


  return ((authIsReady && !user) &&
    <div className={styles.container}>
      <Nav black={true}/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Create An Account</h1>
        <TextField 
        id="full_name" 
        label="Full Name" 
        variant="outlined" 
        type="text" 
        {...(formError.fullName && {error: true, helperText: formError.fullName})}
        autoComplete='off'
        onChange={handleChange("fullName")}/>

        <TextField 
        id="username" 
        label="Username" 
        variant="outlined" 
        type="text" 
        autoComplete='off'
        {...(formError.username && {error: true, helperText: formError.username})}
        onChange={handleChange("username")}/>

        <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        type="email" 
        autoComplete='off'
        {...(formError.email && {error: true, helperText: formError.email})}
        onChange={handleChange("email")}/>

        <FormControl fullWidth>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select country"
          value={values.country}
          label="Country"
          {...(formError.country && {error: true})}
          onChange={handleChange('country')}
        >
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.name}>{country.name}</MenuItem>
            ))}
        </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select gender"
          value={values.gender}
          label="Gender"
          {...(formError.gender && {error: true})}
          onChange={handleChange('gender')}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        </FormControl>

        {/* password input and event */}
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            inputProps={{
              autoComplete: 'new-password',
            }}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...(formError.password && {error: true, helperText: formError.password})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className={styles.upload}>
          <p>{values.image.name === undefined? "Upload Profile Picture" : `${values.image.name}`}</p>
          {formError.image && <p className={styles.error}>{formError.image}</p>}
          <input accept="image/*" type="file" onChange={handleImageUpload}/>
          <AiFillCamera />
        </div>
        <TextField 
        id="referral_code" 
        label="Referral Code(Optional)" 
        variant="outlined" 
        onChange={handleChange("referral")}/>

        <div className={styles.checkbox}>
          <input type="checkbox" onClick={handleCheckBox("policyChecked")}/>
          <p>I agree to the <Link to="/policy">Terms and Condition</Link></p>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" onClick={handleCheckBox("emailChecked")}/>
          <p>I agree to receive GLOBETRADERS and third party email</p>
        </div>
        {formError.policyChecked && <p className={styles.error}>{formError.policyChecked}</p>}
        {formError.emailChecked && <p className={styles.error}>{formError.emailChecked}</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!isPending && <button className={styles.btn}>Sign Up</button>}
        {isPending && <button disabled className={styles.btn} style={{opacity: "50%"}}><PulseLoader color='#000000' size={10}/> </button>}
        
      <Link to="/login" className={styles.link}>Already have an account? Login</Link>
      </form>

    </div>
  );
}
