import React from "react";


import { AppDispatch } from "../../../../redux/reduxStorage";
import { useDispatch } from "react-redux";
import { setDisplayLabCardId } from "../../../../redux/slices/modalSlice";
import { Modal } from "../../../../components";
import { RegisterLabCardForm } from "../RegisterLabCardForm/RegisterLabCardForm";




export const LabCardModal:React.FC=()=>{
    const dispatch:AppDispatch= useDispatch();

    const closeModal=()=>{
        dispatch(setDisplayLabCardId(false));
    }
    return <Modal content={<RegisterLabCardForm/>} toggleModal={closeModal}/>
}