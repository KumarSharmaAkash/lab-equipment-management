import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./RegisterLabCardForm.css";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { getLabCard } from "../../../../redux/slices/AuthenticationSlices";
import { setDisplayLabCardId, setDisplayLogin } from "../../../../redux/slices/modalSlice";


export const RegisterLabCardForm: React.FC = () => {

    const userState = useSelector((state: RootState) => state.authentication);
    const [copy, setCopy]= useState<string>("copy");
    const dispatch: AppDispatch = useDispatch();

    const handleCreateLabCard = () => {
        if (userState.loggedInUser) {
            dispatch(
                getLabCard(userState.loggedInUser?._id)
            )
        }
    }
    const handleLoginClick = () => {
        dispatch(setDisplayLabCardId(false));
        dispatch(setDisplayLogin(true))

    }
    const copyToClipboard = () => {
        if (userState.labcard) {
            navigator.clipboard.writeText(userState.labcard).then(() => {
                setCopy("copied");
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        }
    }

    return (
        <>
            {
                userState.loggedInUser ?

                    <div className="register-lab-card-container p-5">
                        <p className="register-lab-card-text text-sm text-gray-500">Welcome {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}!</p>
                        <p className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto text-sm text-gray-500">To signup for a new lab card, or you forgot the ID number on your card, use the button below.</p>
                        {
                            userState.labcard ? (
                                <>
                                    <p className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto text-sm text-gray-500">Your lab card number: {userState.labcard}</p>
                                    <button 
                                    type="button"
                                    data-autofocus
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-4 sm:w-auto" onClick={copyToClipboard}>{copy}</button>
                                    
                                </>
                            ) : (
                                <button 
                                type="button"
                                    data-autofocus
                                    className="register-lab-modal-button mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-50 sm:mt-4 sm:w-auto "
                                
                                 onClick={handleCreateLabCard}>Get Lab Card</button>
                            )
                        }
                    </div>
                    :

                    <div className="register-lab-card-container">
                        <p className="register-lab-card-text text-sm text-gray-500 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto text-sm text-gray-500 ">You must be a member of the lab to obtain a lab card. </p>
                        <p className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto text-sm text-gray-500">Use the button below to login to your account or register for free.</p> <button className=" mt-8  inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-4 sm:w-auto " onClick={handleLoginClick}>Login Here</button>
                    </div>
            }

        </>
    )



  }