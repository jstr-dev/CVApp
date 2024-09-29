import React from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement>
{
    title?: string,
    onClose?: () => void
}

export default function Modal({ children, className, title, onClose }: ModalProps) {
    return (
        <div>
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={onClose}
            ></div>
            <div className={`Modal mx-[25%] rounded-md z-50 flex flex-col justify-center items-center ${className ?? ''}`}>
                <div className={"w-full flex flex-row my-1 pl-3 pr-3 justify-between items-center text-inherit"}>
                    <p className="text-xl text-gray-800 font-light">{title}</p>
                    <i className={`text-sm cursor-pointer font-light text-gray-800 fa-solid fa-x text-inherit hover:text-gray-300`} onClick={onClose}></i>
                </div>
                <span className="modal-line mb-2"></span>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}