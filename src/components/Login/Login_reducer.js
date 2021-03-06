import React, { useState,useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value:action.val, isValid: action.val.includes('@') };
  };
  if(action.type === 'USER_BLUR'){
    return { value:state.value, isValid: state.value.includes('@') };
  };
  return {value:'', isValid: false};
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value:action.val, isValid: action.val.trim().length > 6};
  };
  if(action.type === 'USER_BLUR'){
    return {value:state.value, isValid: state.value.trim().length > 6};
  };
  return {value:'', isValid: false};
};

const collegeReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value:action.val, isValid: action.val.trim().length > 0};
  };
  if(action.type === 'USER_BLUR'){
    return {value:state.value, isValid: state.value.trim().length > 0};
  };
  return {value:'', isValid: false};
};


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid: null});
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value:'', isValid: null});

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  const {isValid: collegeIsValid} = collegeState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid && collegeIsValid
      );
    },500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value); 
    dispatchEmail({type:'USER_INPUT', val: event.target.value});
    setFormIsValid(
       event.target.value.includes('@') && passwordState.value.trim().length > 6 && collegeState.value.trim().length > 0
     );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6 && collegeState.value.trim().length > 0
    // );
  };

  const collegeChangeHandler = (event) => {
    // setEnteredCollege(event.target.value);
    dispatchCollege({type:'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   passwordState.isValid && emailState.isValid && event.target.value.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid.includes('@'));
   // dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    //dispatchPassword({type:'INPUT_BLUR'});
  };

  const validateCollegeHandler = () => {
    // setCollegeIsValid(enteredCollege.trim().length > 6);
   // dispatchCollege({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        id="email" 
        label='E-mail' 
        type='email' 
        isValid={emailIsValid} 
        value={emailState.value}
        onChange = {emailChangeHandler}
        onBlur ={validateEmailHandler}
        ></Input>
        <Input 
        id="password" 
        label='Password' 
        type='password' 
        isValid={passwordIsValid} 
        value={passwordState.value}
        onChange = {passwordChangeHandler}
        onBlur ={validatePasswordHandler}
        ></Input>
        <Input 
        id="college" 
        label='College-Name' 
        type='text' 
        isValid={collegeIsValid} 
        value={collegeState.value}
        onChange = {collegeChangeHandler}
        onBlur ={validateCollegeHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;