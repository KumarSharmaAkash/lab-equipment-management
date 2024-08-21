import React from "react";

import './AditionalInfo.css';

import { Component } from "../../../../models/Component";

interface ComponentAdditionalInfoProps{
    component: Component;
}

export const ComponentAdditionalInfo:React.FC<ComponentAdditionalInfoProps>=({component})=>{
  return (
    <div className="additional-component-info bg-white">
        <p className="text-n-6">Additional Information About: {component.genre}</p>
        <div className="additional-component-info-container">
            <div className="additional-component-info-group">
                <p  className="additional-component-info-text text-n-6">Value:</p>
                <p  className="additional-component-info-text text-n-6">{component.value}</p>
            </div>
            <div className="additional-component-info-group">
                <p  className="additional-component-info-text text-n-6">Barcode:</p>
                <p  className="additional-component-info-text text-n-6">{component.barcode}</p>
                
            </div>
        </div>
        
    </div>
  )
}