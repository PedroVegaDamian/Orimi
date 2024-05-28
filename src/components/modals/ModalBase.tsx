import React from 'react';
import IconClose from '@/assets/icons/icon_close_line_color.svg';


export interface ModalBaseProps {
    isOpen: boolean;
    close: () => void;
    children?: React.ReactNode;
}

const ModalBase = ({ isOpen, close, children }: ModalBaseProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="absolute inset-0 bg-grey_color_bg"></div>
            <div className="relative bg-white p-4 rounded-lg shadow-lg bg-white_color w-[71%]">
                <button onClick={close} className="absolute mt-4 mr-4 flex items-center">
                    <img src={IconClose} alt="Arrow Icon" className="ml-auto"/>
                    Cerrar
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalBase;
