import React, { ChangeEventHandler } from 'react';
import Error from './Error';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FormError,
    label?: string,
    buttonClasses?: string
}

export default function Input(props: InputProps) {
    let inputStyles =
        "block px-2.5 pb-2.5 pt-2.5 w-full text-sm " +
        "text-gray-900 bg-transparent border-gray-300 focus:border-blue-600 " +
        "rounded-lg border border-1 appearance-none focus:outline-none focus:ring-0 peer";

    let labelStyles =
        "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 " +
        "text-gray-500 peer-focus:text-blue-600 " +
        "origin-[0] px-2 peer-focus:px-2 " +
        "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 " +
        "peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 content-col";

    if (props.error) {
        inputStyles += " border-red-500 focus:border-red-500";
        labelStyles += " text-red-500 peer-focus:text-red-500";
    }

    return (
        <div className={props.className}>
            <div className={'relative'}>
                <input
                    {...props}
                    className={inputStyles + " " + props.buttonClasses}
                    placeholder={props.placeholder ? props.placeholder : ''}
                />

                {props.label &&
                    <label htmlFor={props.id} className={labelStyles}>{props.label}</label>
                }
            </div>

            {props.error &&
                <Error error={props.error} />
            }
        </div>
    );
}
