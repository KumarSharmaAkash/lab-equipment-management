import React from "react";

import './ComponentOverview.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reduxStorage";
import { ComponentInfo } from "../componentInformation/ComponentInfo";
import { ComponentAdditionalInfo } from "../Aditionalinfo/AditionalInfo";
import { ComponentHistory } from "../ComponentHistory/ComponentHistory";


export const ComponentOverview:React.FC=()=>{

    const componentState=useSelector((state:RootState)=>state.component);
    const user= useSelector((state:RootState)=>state.authentication.loggedInUser);

    return (
        <div className="component-overview">

            {
                componentState.currentComponent && !componentState.loading &&
                <>
                <ComponentInfo component={componentState.currentComponent}/>
                <ComponentAdditionalInfo component={componentState.currentComponent}/>
                {user?.type==='EMPLOYEE' && <ComponentHistory component={componentState.currentComponent}/>}
                </>
            }
        </div>
    )
}