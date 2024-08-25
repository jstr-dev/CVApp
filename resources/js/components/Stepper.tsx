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
        <div className='w-[1px] h-[16px] bg-gray-300'></div>
    )
}

function IconBox({icon, active} : {icon: string, active: boolean}) {
    return (
        <div className='w-8 h-8 flex justify-center items-center border-[1px] border-gray-300 rounded-lg content-col'>
            <i className={"fa-solid " + icon + " text-xs " + (active ? 'text-gray-800' : 'text-gray-500')}></i>
        </div>
    )
}

function StepperItem(props : StepperItemProps) {
    return (
        <div className='flex flex-row gap-0'>
            <div className='flex flex-col gap-0 items-center mr-3'>
                {props.hasParent && <StepperLine />}
                <IconBox icon={props.icon} active={props.active}/>
                {props.hasChild && <StepperLine />}
            </div> 

            <div className={'flex flex-col gap-0'} style={{transform: props.hasParent ? 'translateY(13px)' : 'translateY(-3px)'}}>
                <div className={'text-sm font-semibold ' + (props.active ? 'text-gray-800' : 'text-gray-500')}>{props.title}</div>
                <div className='text-xs text-gray-500 mt-0.5'>{props.description}</div>
            </div>
        </div>
    );
}

export {StepperContainer, StepperItem};