import { useDispatch, useSelector } from "react-redux";
import './LoginRegisterModal.css';
import { AppDispatch,RootState } from "../../../../redux/reduxStorage";
import { useEffect,useState } from "react";
import { setDisplayMLogin } from "../../../../redux/slices/modalSlice";
import { LoginForm } from "../loginFrom/LoginForm";
import { RegisterForm } from "../registerForm/RegisterForm";
import { MLOGIN } from "../../../../components/modal/MLOGIN";


export const LoginRegisterModal:React.FC=()=>{
    const authState = useSelector((state:RootState)=>state.authentication);
    const dispatch:AppDispatch = useDispatch();

    const [login, setLogin]= useState<Boolean>(true);

    const closeModal=()=>{
        dispatch(setDisplayMLogin(false));
    }

    const toggleLogin=()=>{
        setLogin(!login);
    }

    useEffect(()=>{
        if(authState.loggedInUser){
            closeModal();
        }

        return(()=>{
            if(authState.loggedInUser){
                localStorage.setItem('userId', authState.loggedInUser._id);
            }
        })
    },[authState.loggedInUser]);


    return(
        <MLOGIN
        toggleModal={closeModal}
        content={login? <LoginForm toggleRegister={toggleLogin}/>:<RegisterForm toggleLogin={toggleLogin}/>}/>
        
    )
}