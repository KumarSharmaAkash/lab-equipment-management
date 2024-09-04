import React from "react";

import './ComponentCHeckIn.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { CheckInComponent, setCurrentComponent } from "../../../../redux/slices/ComponentSlice";
import { setDisplayLoan } from "../../../../redux/slices/modalSlice";


export const ComponentCheckIn:React.FC=()=>{
    const component= useSelector((state:RootState)=>state.component.currentComponent);
    const user=useSelector((state:RootState)=>state.authentication.loggedInUser);

    const dispatch:AppDispatch= useDispatch();

    const CheckIn=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(component && user?.type==='EMPLOYEE'){
            dispatch(CheckInComponent({
                component,
                employee:user,
               
            }));
        
        dispatch(setDisplayLoan(false));
        dispatch(setCurrentComponent(undefined));
        }

       

    }

    return(
        <div className="component-checkin">
            {
                component && user&& <form  className="component-checkout-form">

                     <p className="text-gray-500 mt-2">Check in component : {component.genre.toLocaleLowerCase()}</p>
                     <p className="text-gray-500">value : {component.value}</p>

                    <p className="text-gray-500">Check In Admin Id : </p>
                    <p className="text-gray-500">{user._id}</p>

                   
                    
                    <button 
                    type="button"
                    className="mt-4 mb-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  sm:w-auto"
                
                    data-autofocus
                    
                    onClick={CheckIn}>
                        check in
                        </button>
                </form>
            }
        </div>
    )
}