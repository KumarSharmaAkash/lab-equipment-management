import React from 'react';

import './CatalogSearch.css';

import { RootState } from '../../../../redux/reduxStorage';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculatePaging } from '../../utils/CatalogUtils';

export const CatalogSearchPageNavi: React.FC = () => {
    const pagingInformation = useSelector((state: RootState) => state.component.pagingInformation);

    const navigate = useNavigate();
    const { search } = useLocation();

    const navigatePrevious = () => {
        if (pagingInformation && pagingInformation.currentPage !== 1) {
            if (search.includes("&page=")) {
                let splitString = search.split("&page=");
                let newTerms = splitString[0] + `&page=${pagingInformation.currentPage - 1}`;
                navigate(`/catalog${newTerms}`);
            } else {
                let newTerms = search + `&page=${pagingInformation.currentPage - 1}`;
                navigate(`/catalog${newTerms}`);
            }
        }
    }
    const navigateToNumber = (e: React.MouseEvent<HTMLParagraphElement>) => {
        if (search.includes("&page=")) {
            let splitString = search.split("&page=");
            let newTerms = splitString[0] + `&page=${e.currentTarget.id}`;
            navigate(`/catalog${newTerms}`);
        } else {
            let newTerms = search + `&page=${e.currentTarget.id}`;
            navigate(`/catalog${newTerms}`);
        }
    }

    const navigateToNext = () => {
        if (pagingInformation && pagingInformation.currentPage !== pagingInformation.totalPage) {
            if (search.includes("&page=")) {
                let splitString = search.split("&page=");
                let newTerms = splitString[0] + `&page=${pagingInformation.currentPage + 1}`;
                navigate(`/catalog${newTerms}`);
            } else {
                let newTerms = search + `&page=${pagingInformation.currentPage + 1}`;
                navigate(`/catalog${newTerms}`);
            }
        }
    }

    return (
        <>
          <div className="catalog-search-page-navigator">
            <p className="catalog-search-page-navigator-navigate text-gray-900" onClick={navigatePrevious}>Prev</p>
            <div className="catalog-search-page-numbers">
            {pagingInformation && calculatePaging(pagingInformation).map((num)=>{
              if(num===`${pagingInformation.currentPage}`) return <p key={num} className='catalog-search-page-number number-active text-gray-900'>{num}</p> 
               
               return <p key={num} id={num} className='catalog-search-page-number text-gray-900' onClick={navigateToNumber}>{num}</p>
            })}
            </div>
            <p className="catalog-search-page-navigator-navigate text-gray-900" onClick={navigateToNext}>Next</p>
        </div>

           </>
    )
}
