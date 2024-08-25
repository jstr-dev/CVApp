import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getNavContext } from "../contexts/NavContext";
import { TAILWIND_BP } from '@/constants';

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    icon: string;
    href: string;
}

function NavItem({ name, icon, href, className,onClick }: NavItemProps) {
    const { expanded } = getNavContext();
    const navigate = useNavigate();
    const isActive: boolean = href === window.location.pathname;

    const navClick: () => void = () =>{
        if (isActive) {
            return;
        }

        navigate(href);
    }

    return (
        <div 
            className={`w-full h-8 nav-item flex flex-row items-center px-2 rounded-md gap-3 cursor-pointer ${isActive && 'nav-active'} ${className ?? ''}`}
            onClick={onClick ?? navClick}
        >
            <div className={"h-4 flex flex-shrink-0 justify-center items-center w-3 nav-icon"}>
                <i className={`text-sm text-gray-800 fa-solid ${icon}`}></i>
            </div>

            <div className={`nav-grad flex-shrink-0 text-xs font-semibold text-black leading-3 mb-[1px] ${!expanded && 'hide'}`}>{name}</div>
        </div>
    )
}

function NavSection({ title, children } : { title: string, children: React.ReactNode }) 
{
    const { expanded } = getNavContext(); 
    return (
        <div className="w-full">
            {/* <div className={`text-xxs text-gray-400 font-semibold mb-1 px-1`}>{!expanded ? title[0] : title.toUpperCase()}</div> */}
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function NavLogo()
{
    const { expanded } = getNavContext();

    return (
        expanded ? 
            <div className="logo flex px-2.5 items-center w-full">
                Logo
            </div>
        : 
            <div className="logo flex px-2.5 items-center w-full">
                L
            </div>
    )
}

export default function Navbar() {
    const { expanded, setExpanded } = getNavContext();

    const handleResize = () => {
        if (window.innerWidth < TAILWIND_BP.md) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const mouseEnter = () => {
        if (window.innerWidth < TAILWIND_BP.md) {
            setExpanded(true);
        }
    }

    const mouseLeave = () => {
        if (window.innerWidth < TAILWIND_BP.md) {
            setExpanded(false);
        }
    }

    const modalpopup = () => {
        alert('Coming Soon!')
    }

    return (
        <div className={`max-md:absolute nav-size flex-shrink-0 flex flex-col justify-between h-full ${expanded ? 'w-[250px]' : 'w-[60px]'} content-col border-r-[1px] border-grey-400 px-4 py-4`}
            onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} /*onTouchStart={mouseEnter} onTouchEnd={mouseLeave}*/>
           <div>
                <div className={`w-full flex justify-between items-center flex-col mb-6`}>
                    <NavLogo />
                </div>

                <NavItem name="Search" className="mb-6" icon="fa-magnifying-glass" href='' onClick={() => modalpopup()}/>

                <div className="flex flex-col gap-1">
                    <NavSection title="General">
                        <NavItem name="Dashboard" icon="fa-house" href="/" />
                        <NavItem name="Applications" icon="fa-check-to-slot" href="/applications" />
                    </NavSection>

                    <NavSection title="Customise">
                        <NavItem name="Resume Templates" icon="fa-file-alt" href="/templates" /> 
                        <NavItem name="Cover Letter Templates" icon="fa-envelope" href="/cover-letters" />
                    </NavSection>
                </div>
            </div>

            <div className="w-full">
                <NavItem name="Notifications" icon="fa-bell" href="/notifications" />
                <NavItem name="Settings" icon="fa-gear" href="/settings" />
                <NavItem name="Logout" icon="fa-right-from-bracket" href="/logout" />
            </div>
        </div>
    )
}