import { Component } from "../../../models/Component";
import { ComponentCheckIn } from "../components/ComponentCheckIn/ComponentCheckIn";
import { ComponetCheckOut } from "../components/ComponentCheckout/ComponetCheckOut";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reduxStorage";

export function determineLoanModelContent(component: Component): JSX.Element {
    const user = useSelector((state: RootState) => state.authentication.loggedInUser);

    if ((user?.type === 'EMPLOYEE' && component.records[0]?.status === 'LOANED')||(user?.type === 'EMPLOYEE' && component.records[0]?.status ===null)) {
        return <ComponentCheckIn />;
    }
    if (component.records.length === 0 || component.records[0].status === 'AVAILABLE') {
        return <ComponetCheckOut />;
    }

    return <div className="text-base font-semibold leading-6 text-gray-900 h3 mt-4 mb-8">
          Only Admin Allowed To Check-In
         </div>;
}


