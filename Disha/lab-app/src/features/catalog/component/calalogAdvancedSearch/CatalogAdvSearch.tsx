import React, { useRef } from "react";


import "./CataLogAdvSearch.css";
import { useNavigate } from "react-router-dom";
import Heading from "../../../../components/Heading";

export const CataLogAdvSearch:React.FC=()=>{

    const navigate= useNavigate();

    const isbnRef= useRef<HTMLInputElement>(null);
    const titleRef= useRef<HTMLInputElement>(null);
    const descriptionRef= useRef<HTMLInputElement>(null);
    const valueRef= useRef<HTMLInputElement>(null);
    const genreRef= useRef<HTMLInputElement>(null);
    
    const search=()=>{
        let query="";
        if(isbnRef && isbnRef.current && isbnRef.current.value!=='') query +=`?barcode=${isbnRef.current.value}`;


        if(titleRef && titleRef.current && titleRef.current.value!==''){
            query += query===''? `?title=${titleRef.current.value}`:`&title=${titleRef.current.value}`;
        }

        if(descriptionRef && descriptionRef.current && descriptionRef.current.value!==''){
            query += query===''? `?description=${descriptionRef.current.value}`:`&description=${descriptionRef.current.value}`;
        }

        
        if(valueRef && valueRef.current && valueRef.current.value!==''){
            query += query===''? `?value=${valueRef.current.value}`:`&value=${valueRef.current.value}`;
        }

        if(genreRef && genreRef.current && genreRef.current.value!==''){
            query += query===''? `?genre=${genreRef.current.value}`:`&genre=${genreRef.current.value}`;
        }

        navigate(`/catalog${query}`)
    }

  return(
    <div className="catalog-advanced-search bg-white p-3 shadow-sm rounded-sm text-gray-800">
        <Heading
          title="Advanced component Search"
          text="Fill in as many or little fields to narrow down your search results"/>
        
        <form className="catalog-advanced-search-form">
            <div className="catalog-advanced-form-input-group">
                <p>Barcode</p>
                <input type="text" id="isbn" className="catalog-advanced-form-input" placeholder={"barcode"} ref={isbnRef} />
            </div>
            <div className="catalog-advanced-form-input-group">
                <p>Title</p>
                <input type="text" id="title" className="catalog-advanced-form-input" placeholder={"title"} ref={titleRef} />
            </div>
            <div className="catalog-advanced-form-input-group">
                <p>Description</p>
                <input type="text" id="description" className="catalog-advanced-form-input" placeholder={"description"} ref={descriptionRef} />
            </div>
            <div className="catalog-advanced-form-input-group">
                <p>Value</p>
                <input type="text" id="value" className="catalog-advanced-form-input" placeholder={"value"} ref={valueRef} />
            </div>
            <div className="catalog-advanced-form-input-group">
                <p>Type</p>
                <input type="text" id="genre" className="catalog-advanced-form-input" placeholder={"type"} ref={genreRef} />
            </div>
        </form>
        <button className="catalog-advanced-search-button" onClick={search}>search</button>
    </div>
  )

}