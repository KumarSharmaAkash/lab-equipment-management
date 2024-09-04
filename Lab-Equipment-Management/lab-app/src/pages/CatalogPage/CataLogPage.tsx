import { useLocation } from "react-router-dom";
import { CatalogOverview, CatalogSearch } from "../../features/catalog";
import './CataLogPage.css';
export default function CatalogPage(){
    const location = useLocation();

    return(
            <div className="overView  bg-gray-100">
                {
                location.search===""?<CatalogOverview/>:<CatalogSearch/>
                }
            </div>
    )
}