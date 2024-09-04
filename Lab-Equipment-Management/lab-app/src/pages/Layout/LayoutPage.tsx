import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../redux/reduxStorage";
import { LabCardModal, LoginRegisterModal } from "../../features/authentication";
import { Navbar } from "../../features/navigation";
import { LoanComponentModel } from "../../features/component";
import Footer from "../../components/Footer";

export default function LayoutPage() {
    const state = useSelector((state: RootState) => state.modal);

    return (
       
        
           <>
            {state.displayLogin && <LoginRegisterModal />}
            {state.displayLabcardId && <LabCardModal />}
            {state.displayLoan && <LoanComponentModel />}
            <Navbar />
            <Outlet />
            <Footer/>
           </>
            
    
       
    );
}
