import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { setDisplayLoan } from "../../../../redux/slices/modalSlice";
import { Modal } from "../../../../components";
import { determineLoanModelContent } from "../../utils/Computils";





export const LoanComponentModel:React.FC=()=>{
    const currentComponent= useSelector((state:RootState)=>state.component.currentComponent);
    const dispatch:AppDispatch= useDispatch();

    const closeModel=()=>{
        dispatch(setDisplayLoan(false));
    }

    return(
        <Modal content={ currentComponent ? determineLoanModelContent(currentComponent):<> </>} toggleModal={closeModel}/>
    )
}
