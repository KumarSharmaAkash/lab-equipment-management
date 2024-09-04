import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./CatalogSearch.css";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { useLocation } from "react-router-dom";
import { queryComponents } from "../../../../redux/slices/ComponentSlice";
import { ComponentCard } from "../../../component";
import { CataLogAdvSearch } from "../calalogAdvancedSearch/CatalogAdvSearch";
import { CatalogSearchPageNavi } from "../CatalogSearchPageNavigator/CatalogSearchPageNavi";


export const CatalogSearch: React.FC = () => {
    const ComponentState = useSelector((state: RootState) => state.component);
    const dispatch: AppDispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        dispatch(queryComponents(location.search));
    }, [location.search, dispatch]);

    return (
        <div className="search h-full mt-20 bg-gray-100">
            <div className="search-advanced-search-section">
                <CataLogAdvSearch />
            </div>
            {ComponentState.pagingInformation?.pageCount === 0 ? <><div className="search-item-area">
                <p className="text-gray-700 h4 mb-4">No component available</p>
            </div>
                <div className="search-pages">
                    <CatalogSearchPageNavi />
                </div></> : <><div className="search-item-area">
                    {ComponentState.components.map((component) => <ComponentCard key={component.barcode} component={component} />)}
                </div>
                <div className="search-pages">
                    <CatalogSearchPageNavi />
                   
                </div></>}
        </div>
    )
}