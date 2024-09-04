import React, { useRef, useEffect } from "react";
import './ComponetCheckOut.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { CheckoutComponent, setCurrentComponent } from "../../../../redux/slices/ComponentSlice";
import { setDisplayLoan } from "../../../../redux/slices/modalSlice";
import { getLabCard } from "../../../../redux/slices/AuthenticationSlices";


export const ComponetCheckOut: React.FC = () => {
    const user = useSelector((state: RootState) => state.authentication.loggedInUser);
    const component = useSelector((state: RootState) => state.component.currentComponent);
    const userState = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();
  
    const LabCardRef = useRef<HTMLInputElement>(null);
  
    const handleCreateLabCard = () => {
        if (userState.loggedInUser) {
            dispatch(getLabCard(userState.loggedInUser._id));
        }
    }

    useEffect(() => {
        if (LabCardRef.current) {
            LabCardRef.current.value = userState.labcard || "";
        }
    }, [userState.labcard]);
  
    const CheckOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleCreateLabCard();
        
        setTimeout(async () => {
            if (component && user && LabCardRef.current) {
                await dispatch(CheckoutComponent({
                    component,
                    employee: user,
                    labCard: LabCardRef.current.value
                }));
                dispatch(setCurrentComponent(undefined));
                dispatch(setDisplayLoan(false));
              
                
            }
        }, 1000); 
    }

    return (
        <div className="component-checkout">
            {
                component && user && (
                    <form className="component-checkout-form">
                        <p className="text-base font-semibold leading-6 text-gray-900 h3"> item : {component.genre.toLocaleLowerCase()}</p>
                        <p className="text-sm text-gray-500">Student Labcard</p>
                        <input 
                            type="text" 
                            className="component-checkout-input" 
                            placeholder="enter labcard Id" 
                            ref={LabCardRef} 
                        />
                        <button 
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        
                            data-autofocus
                            onClick={CheckOut}
                        >
                            Loan
                        </button>
                    </form>
                )
            }
        </div>
    )
}
