import React, {useState} from "react";

import "./ComponentCarousel.css";
import { Component } from "../../../../models/Component";
import { ComponentCard } from "../componentCard/ComponentCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ComponentCarouselProps{
    component: Component[];
}

export const ComponentCarousel:React.FC<ComponentCarouselProps>=({component})=>{
    const [order, setOrder]= useState<Component[]>(component);
    const moveLeft=()=>{
        let item = order[0];

        let reordered= order.slice(1,order.length);

        reordered.push(item);
        setOrder(reordered);
    }
    const moveRight=()=>{
        let item= order[order.length-1];
        let reordered = order.slice(0, order.length-1);
        reordered= [item, ...reordered];
        setOrder(reordered);
    }

    return(
        <div className="component-carousel">
            <div className="component-carousel-left-button z-15" onClick={moveLeft}>
                <FaChevronLeft/>
            </div>
            <div className="component-carousel-right-button z-15" onClick={moveRight}>
                <FaChevronRight/>
            </div>
            {order.map((item)=><ComponentCard key={item.barcode} component={item}/>)}
        </div>
    )
}