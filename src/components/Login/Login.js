import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/auth-context';
import Input from '../UI/INPUT/Input';

const emailReducer = (state, action) => {

  if(action.type === 'USEREMAIL_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value : state.value, isValid : state.value.includes('@')}
  }
  return {
    value : '',
     isValid : false,
    }
};

const pswdReducer= (state, action) => {

  if(action.type === 'USERPSWD_INPUT'){
    return {value:action.val, isValid:action.val.trim().length > 6}
  }

  // if(action.type === 'INPUT_BLUR'){
  //   return {value: state.value, isValid : state.value.trim().length > 6}
  // }
  return {value:'', isValid:false}
};


const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value : '', isValid : null})
  const [pswdState, dispatchPswd] = useReducer(pswdReducer, {value : '', isValid : null})

  const {isValid : emailIsValid} = emailState;
  const {isValid : PswdIsValid} = pswdState;

  const authCxt = useContext(AuthContext);

  const inputEmailRef = useRef();
  const inputPswdRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('validating');
      setFormIsValid(
        emailIsValid && PswdIsValid
      );
    } ,500)
    
    return () => {
      console.log('clearing timeout');
      clearTimeout(identifier);
    }
  }, [emailIsValid, PswdIsValid])

  

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({type : 'USEREMAIL_INPUT', val:event.target.value})
    setFormIsValid(
      emailState.value.includes('@') && pswdState.isValid
    );

  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPswd({type:'USERPSWD_INPUT',val:event.target.value})

    setFormIsValid(
      pswdState.value.trim().length>6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type : 'INPUT_BLUR'});
    // setEmailIsValid(emailState.value.includes('@'));

  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPswd({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCxt.onLogin(emailState.value, pswdState.value);
    }else if(!emailIsValid){
      inputEmailRef.current.focus();
    }else {
      inputPswdRef.current.focus();
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}

        <Input ref={inputEmailRef} label='email' type='email' id='email' value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />

        <Input ref={inputPswdRef} label='password' type='password' id='password' value={pswdState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />

        {/* <div
          className={`${classes.control} ${
            pswdState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pswdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
