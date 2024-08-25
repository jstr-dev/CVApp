import React, { useEffect } from "react";
import Search from "./Search";
import { useNavigate } from 'react-router-dom';
import { getNavContext } from "../contexts/NavContext";

function NavItem({ name, icon, href }: { name: string, icon: string, href: string }) {
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
            className={`w-full h-8 nav-item flex flex-row items-center px-2 rounded-md gap-3 cursor-pointer ${isActive && 'nav-active'}`}
            onClick={navClick}
        >
            <div className={"h-4 flex justify-center items-center w-3 nav-icon"}>
                <i className={"text-sm text-gray-800 fa-solid " + icon}></i>
            </div>

            <div className={`transition text-xs font-semibold text-black leading-3 mb-[1px] ${!expanded && 'hidden'}`}>{name}</div>
        </div>
    )
}

function NavSection({ title, children } : { title: string, children: React.ReactNode }) 
{
    const { expanded } = getNavContext(); 
    return (
        <div className="w-full">
            <div className={`${!expanded && 'hidden '} text-xxs text-gray-400 font-semibold mb-1 px-1`}>{title.toUpperCase()}</div>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function ExpandButton()
{
    const { expanded, setExpanded, forceExpand, setForceExpand } = getNavContext();

    const click: () => void = () => {
        setForceExpand(true);
        setExpanded(!expanded);
    }

    return (
        <div className={`h-6 w-8 flex justify-center items-center cursor-pointer nav-item rounded-md`} onClick={click}>
            <i className={`fa-solid ${expanded ? 'fa-chevron-left' : 'fa-chevron-right'} text-sm text-gray-800`}></i>
        </div>
    )
}

function NavLogo()
{
    const { expanded } = getNavContext();

    return (
        expanded ? 
            <div className="logo flex items-center w-full">
                Logo
            </div>
        : 
            <div className="logo flex justify-center items-center w-full mb-4">
                L
            </div>
    )
}

export default function Navbar() {
    const { expanded, setExpanded, forceExpand, setForceExpand } = getNavContext();

    const handleResize = () => {
        if (forceExpand) return;

        if (window.innerWidth < 640) {
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
    }, [forceExpand]);

    return (
        <div className={`nav-size flex flex-col justify-between h-full ${expanded ? 'w-[250px]' : 'w-[60px]'} content-col border-r-[1px] border-grey-400 px-4 py-4`}>
           <div>
                <div className={`w-full flex justify-between items-center ${expanded ? 'flex-row' : 'flex-col'} mb-6`}>
                    <NavLogo />
                    <ExpandButton />
                </div>

                <Search className="mb-6" />

                <div className="flex flex-col gap-4">
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