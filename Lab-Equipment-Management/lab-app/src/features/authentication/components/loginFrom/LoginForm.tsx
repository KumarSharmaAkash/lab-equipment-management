import React, { useRef } from "react";
import "./LoginFrom.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { loginUser } from "../../../../redux/slices/AuthenticationSlices";

interface LoginFormProps{
    toggleRegister():void;
}

export const LoginForm: React.FC<LoginFormProps>= ({toggleRegister}) => {
    
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const auth = useSelector((state:RootState)=>state.authentication);
    const dispatch:AppDispatch = useDispatch();

    const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        if(emailRef && emailRef.current && passwordRef && passwordRef.current){
            dispatch(loginUser({
                email: emailRef.current.value,
                password: passwordRef.current.value
            }))
        } 
        
    }

    return (
        <form>
             <p className="heading text-base font-semibold leading-6 text-gray-900">Login</p>
            {auth.error ? (
                <p className="login-form-error">username or password incorrect</p>
            ) : null}
            <div className="login-form-input-group">
                <p className="lform" >Email</p>
                <input  className="login-form-input text-n-6 " type="email" id="email" placeholder="email" name="email" ref={emailRef} required/>
            </div>
            <div className="login-form-input-group">
                <p className="lform" >Password</p>
                <input  className="login-form-input text-n-6 " type="password" id="password" placeholder="password" name="password" ref={passwordRef} required />
            </div>
            <button  className="login-form-submit bg-blue-600 hover:bg-blue-500"  onClick={handleLoginUser}>Login</button>
            <p className="register-text text-base  leading-4 text-gray-900">
                Don't have an account?
                <span className="login-form-register text-base  leading-4 text-blue-700" onClick={toggleRegister}>create one here</span>
            </p>
        </form>
    );
};
