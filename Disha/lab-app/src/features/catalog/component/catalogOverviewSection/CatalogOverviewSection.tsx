import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Component } from "../../../../models/Component";
import { RootState } from "../../../../redux/reduxStorage";
import { ComponentCarousel } from "../../../component";

interface CatalogOverviewSectionProps{
    components: Component[];
    label:string;
}


export const CatalogOverviewSection:React.FC<CatalogOverviewSectionProps>=({components, label})=>{
    const ComponentState= useSelector((state:RootState)=>state.component)

    const navigate= useNavigate();

    const handleViewMore=()=>{
        navigate(`/catalog?genre=${label}&subject=${label}`);

    }
    return (
    <div className="bg-gray-100 w-full h-128">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-2 sm:py-4 lg:max-w-none lg:py-8">
          <button className="text-2xl font-bold text-gray-900 float-left" >{label}</button> 
          <button className="float-right text-blue-600"onClick={handleViewMore}>Browse all categories →</button>
        </div>
        
        {components.length > 0 && !ComponentState.loading && <ComponentCarousel component={components}/>}
      </div>
      <hr style={{ border: '0', height: '1px', background: 'linear-gradient(to right, #fff, #ccc, #fff)', margin: '20px 0', width: '100%' }} />
    </div>
    

       
    )
}




