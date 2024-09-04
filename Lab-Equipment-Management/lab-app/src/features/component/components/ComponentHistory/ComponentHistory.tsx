import React from "react";

import './ComponentHistory.css';
import { Component } from "../../../../models/Component";
import { ComponentHistoryItem } from "../ComponentHistoryItem/ComponentHistoryItem";

interface ComponentHistoryProps {
    component: Component;
}


export const ComponentHistory:React.FC<ComponentHistoryProps>=({component})=>{

    return (

        <div className="component-history">
            <p className="text-n-6">Loan History</p>
            <div className="component-history-box">
                {
                    component.records.map((record)=>{
                        return(
                            <ComponentHistoryItem key={record._id} record={record}/>
                        )
                    })
                }
            </div>
        </div>
    )
}