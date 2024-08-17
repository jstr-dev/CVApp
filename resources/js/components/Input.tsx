import React, { ChangeEventHandler } from 'react';
import Error from './Error';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean,
    info?: string,
    label?: string,
}

/**
 *
 * <div class="relative">
    <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floating outlined</label>
</div>
 *
 */

const inputStyles = "block px-2.5 pb-2.5 pt-2.5 w-full text-sm " +
    "text-gray-900 bg-transparent border-gray-300 focus:border-blue-600 " +
    "rounded-lg border border-1 appearance-none focus:outline-none focus:ring-0 peer";

const labelStyles = "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 " +
    "text-gray-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 " +
    "origin-[0] px-2 peer-focus:px-1 peer-focus:mx-1" +
    "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3.5 peer-placeholder-shown:top-1/2 peer-focus:top-2 " +
    "peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 content-col";

export default function Input(props: InputProps) {
    return (
        <div className='relative'>
            <input
                {...props}
                className={inputStyles + " " + props.className}
                placeholder={props.placeholder ? props.placeholder : ''}
            />

            {props.label &&
                <label htmlFor={props.id} className={labelStyles}>{props.label}</label>
            }
        </div>
    );
}
