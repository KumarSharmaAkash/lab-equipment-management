import React from 'react';
import './m.css';
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
    toggleModal(): void;
    content: JSX.Element;
}

export const MLOGIN: React.FC<ModalProps> = ({ toggleModal, content }) => {
   

    

    return (
        <div className="modalm-bg fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className=" modalm rounded-lg bg-white shadow-xl transition-all " >
                <p className="modal-exit text-gray-900" onClick={toggleModal}><RxCross2 /></p>
                {content}
            </div>
        </div>
    );
}


 