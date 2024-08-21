import React, {useEffect, useRef} from 'react';

import './RegisterForm.css';

import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch,RootState } from '../../../../redux/reduxStorage';
import { registerUser, resetRegisterSuccess } from '../../../../redux/slices/AuthenticationSlices';


interface RegisterFormProps {
    toggleLogin():void;
}

export const RegisterForm:React.FC<RegisterFormProps>= ({toggleLogin})=>{
    const authState  = useSelector((state:RootState)=>state.authentication);
    const dispatch:AppDispatch= useDispatch();

    const firstRef= useRef<HTMLInputElement>(null);
    const lastRef= useRef<HTMLInputElement>(null);
    const emailRef= useRef<HTMLInputElement>(null);
    const passwordRef= useRef<HTMLInputElement>(null);


    const handleRegisterUser = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(
            firstRef && firstRef.current &&
            lastRef && lastRef.current &&
            emailRef && emailRef.current &&
            passwordRef && passwordRef.current
         ){
            dispatch(
                registerUser({
                    type:"PATRON",
                    firstName:firstRef.current.value,
                    lastName:lastRef.current.value,
                    email:emailRef.current.value,
                    password:passwordRef.current.value
                })

            );
         }
    }
    useEffect(()=>{
        return(()=>{
            dispatch(resetRegisterSuccess());
        });
    },[])

    return(
        <form className='register-form'>
            <h3 className='heading text-base font-semibold leading-6 text-gray-900'>Register</h3>
            {authState.error ? <p className='register-form-error'>There was an error</p>:<></>}
            <div className="register-form-name-group">
                <div className="register-form-name-input-group">
                    <p className='dataform'>First Name</p>
                    <input type="text" placeholder='first' name='first' className="register-form-input-name text-n-6 " required ref={firstRef} />
                </div>
                <div className="register-form-name-input-group">
                    <p className='dataform'>Last Name</p>
                    <input type="text" className="register-form-input-name text-n-6 " placeholder='last' name='last' required ref={lastRef} />
                </div>
            </div>
            <div className="register-form-input-group">
                <p className='dataform'>Email</p>
                <input type="text"placeholder='email' name='email' required ref={emailRef} className="register-form-input text-n-6 " />
            </div>
            <div className="register-form-input-group">
                <p className='dataform'>Password</p>
                <input type="password"placeholder='password' name='password' required ref={passwordRef} className="register-form-input text-n-6 " />
            </div>
            <button className="register-form-submit bg-blue-600 hover:bg-blue-500" onClick={handleRegisterUser}>Register</button>
            {authState.registersuccess ? <> <p className='register_successfully'>Registered Successfully.</p>
                <span className="register-form-login text-base font-semibold leading-6 text-blue-200" onClick={toggleLogin}>Login here</span>

            </>:<></>}

        </form>
    )



}