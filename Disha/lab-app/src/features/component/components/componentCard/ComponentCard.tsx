import { useNavigate } from "react-router-dom";


import "./ComponentCard.css";
import { Component } from "../../../../models/Component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { useEffect, useState } from "react";
import { setCurrentComponent } from "../../../../redux/slices/ComponentSlice";
import { setDisplayLoan } from "../../../../redux/slices/modalSlice";

interface ComponentCardProps{
    component:Component
}
export const ComponentCard:React.FC<ComponentCardProps>=({component})=>{
    const user= useSelector((state:RootState)=>state.authentication.loggedInUser);
    const dispatch:AppDispatch= useDispatch();
    

    const [available, setAvailable]= useState<boolean>(()=>{
        if(component.records.length===0) return true;

        return component.records[0].status==='AVAILABLE';
    })
    const [buttonclass, setButtonClass]= useState<string>("");
    const [UserforLoan,SetuserForLoan]=useState<string>("");


    const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (user?.type === `${UserforLoan}`) {
            dispatch(setCurrentComponent(component));
                dispatch(setDisplayLoan(true));
                
        }
    };

    const navigate = useNavigate();

    const displayComponent=()=>{
        navigate(`/resource/${component.barcode}`);
    }

    useEffect(()=>{
        if(user?.type==='EMPLOYEE'){
            SetuserForLoan("EMPLOYEE");
        }else{
            SetuserForLoan("PATRON");
        }
        let c= "component-card-loan-button";

        if(available){
            c +=" available"
        }else{
            c += " unavailable"
        }

        if(user && user.type==='PATRON' ||'EMPLOYEE' && available){
            c+= ' checkout';
        }else if(user && user.type==='EMPLOYEE' && !available){
            c +=" checkin";
        }

        setButtonClass(c);
    },[available, user?.type, component.records]);

    return(
       
        <div  className="firstCard space-y-2 flex flex-col justify-center items-center bg-white p-3 shadow-sm rounded-sm" onClick={displayComponent}>
        <img className=" h-40 w-40  mt-6 object-cover object-center" src={component.imageUrl}/>
        <div className="component-card-info">
            <p className="component-card-title text-gray-700">{component.genre}</p>
            <p className="component-card-Value mt-4 text-base font-semibold text-gray-900">{component.value}</p>
        </div>
        <button className={buttonclass} onClick={handleLoan}>{available? "AVAILABLE":"UNAVAILABLE"}</button>

    </div>
    )

}