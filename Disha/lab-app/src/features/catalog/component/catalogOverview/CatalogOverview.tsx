import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CatalogOverview.css";
import { AppDispatch, RootState } from "../../../../redux/reduxStorage";
import { fetchAllComponents } from "../../../../redux/slices/ComponentSlice";
import { getRandomCompByTitle } from "../../utils/CatalogUtils";
import { CatalogOverviewSection } from "../catalogOverviewSection/CatalogOverviewSection";
import CircularProgress from '@mui/material/CircularProgress';



export const CatalogOverview: React.FC = () => {
    const componentState = useSelector((state: RootState) => state.component);
    const dispatch: AppDispatch = useDispatch();
    let genres = ["DIODE", "RESISTOR","LED","TRANSISTOR"]

    useEffect(() => {
        dispatch(fetchAllComponents());
    }, [dispatch]);


    return (
        <>
            {componentState.components.length > 0 && !componentState.loading ? (
                <div className="catalog-overview bg-gray-100  ">
                    {genres.map((genre) => {
                        return <CatalogOverviewSection key={genre} components={getRandomCompByTitle(genre, componentState.components)} label={genre} />
                    })}
                </div>
            ) : (
                <div className="loading-message ">
                    {componentState.loading ? 
                        <CircularProgress />
                    : " "}
                </div>
            )}



        </>
    );
};
