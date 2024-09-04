import React from "react";


import'./ComponentInfo.css';

import { Component } from "../../../../models/Component";

interface CompInfoProps{
    component:Component;
}

export const ComponentInfo:React.FC<CompInfoProps>=({component})=>{
    return(
        <div className="comp-info bg-white mt-8">
            <div className="comp-info-container ">
                <img className="comp-info-cover" src={component.imageUrl}/>
                <div>
                    <p className=" text-n-8">Name: <span className="spanName">{component.genre}</span></p>
                    <p className=" text-n-6">Value: <span  className="spanName">{component.value}</span></p>
                    <p className=" text-n-6">Description:</p>
                    <p className="description text-n-6">{component.description}</p>
                </div>
            </div>
        </div>
    )
}