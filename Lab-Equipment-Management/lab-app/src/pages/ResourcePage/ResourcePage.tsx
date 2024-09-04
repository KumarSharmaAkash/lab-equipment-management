import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reduxStorage";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoadComponentByBarcode } from "../../redux/slices/ComponentSlice";
import { ComponentOverview } from "../../features/component";
import Section from "../../components/Section";

export default function ResourcePage(){

    const dispatch:AppDispatch=useDispatch();

    const componentState=useSelector((state:RootState)=>state.component);

    const {barcode}= useParams();

    const navigate= useNavigate();

    useEffect(()=>{
        if(barcode){
            dispatch(LoadComponentByBarcode(barcode));
        }
        if(componentState.error) navigate('/catalog');
    },[componentState.error, barcode]);


    return (
        <Section className="page_r bg-gray-100">
            <div className="page-container_r mt-4 ml-20 mr-20">
                <ComponentOverview/>
            </div>
        </Section>
    )

}