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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto">
            <div className="absolute inset-0 bg-grey_color_bg"></div>
            <div className="relative bg-white rounded-lg shadow-lg bg-white_color md:w-[71%] max-h-[90vh] overflow-auto pb-4">
                <button onClick={close} className="sticky top-0 bg-white z-10 flex justify-end p-4">
                    <img src={IconClose} alt="Arrow Icon" className="ml-auto"/>
                    Cerrar
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalBase;
