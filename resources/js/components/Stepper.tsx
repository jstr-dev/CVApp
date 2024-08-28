import React from 'react';

interface StepperItemProps {
    title: string,
    description: string,
    active: boolean,
    icon: string,
    hasParent?: boolean,
    hasChild?: boolean,
}

interface StepperContainerProps extends React.PropsWithChildren<{}> {
}

function StepperContainer(props : StepperContainerProps) {
    return (
        <div className='flex flex-col gap-0'>
            {props.children}
        </div>
    )
}

function StepperLine() {
    return (
        <div className='ml-[23px] w-[2px] h-[16px] bg-gray-300'></div>
    )
}

function IconBox({icon, active} : {icon: string, active: boolean}) {
    return (
        <div className={'w-[48px] h-[48px] flex justify-center items-center border-[2px] rounded-lg content-col transition ' + (active ? 'border-blue-400' : 'border-gray-300')}>
            <i className={"transition fa-solid " + icon + " text-lg " + (active ? 'text-blue-400' : 'text-gray-500')}></i>
        </div>
    )
}

function StepperItem(props : StepperItemProps) {
    return (
        <div>
            {props.hasParent && <StepperLine />}

            <div className='flex flex-row gap-0'>
                <div className='flex flex-col gap-0 items-center mr-5'>
                    <IconBox icon={props.icon} active={props.active} />
                </div>

                <div className={'flex flex-col gap-0 justify-center'}>
                    <div className={'text-sm font-semibold ' + (props.active ? 'text-gray-800' : 'text-gray-500')}>{props.title}</div>
                    <div className='text-xs text-gray-500 mt-0.5'>{props.description}</div>
                </div>
            </div>

            {props.hasChild && <StepperLine />}
        </div>
    );
}

export {StepperContainer, StepperItem};
