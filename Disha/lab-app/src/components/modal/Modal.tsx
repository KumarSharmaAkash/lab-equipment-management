import React from 'react';
import './Modal.css';

interface ModalProps {
    toggleModal(): void;
    content: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, content }) => {
   

    

    return (
       
        <div className="modal-bg fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ">
            <div className=" modal rounded-lg bg-white backdrop-blur border border-n-1/10 " >
                {content}
                <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-40 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500  sm:w-auto"
              onClick={toggleModal}
            >
              Cancel
            </button>
            </div>
        </div>
    );
}


