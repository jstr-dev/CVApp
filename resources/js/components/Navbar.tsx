import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getNavContext } from "../contexts/NavContext";
import { TAILWIND_BP } from '@/constants';
import Logo from "./Logo";
import Search from "./Search";
import Button from "./Button";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    icon: string;
    href?: string;
    isOpen?: boolean;
}

function NavItem({ name, icon, href, className, onClick, isOpen }: NavItemProps) {
    const { expanded } = getNavContext();
    const navigate = useNavigate();
    const isActive: boolean = href === window.location.pathname;

    const navClick: () => void = () =>{
        if (isActive) {
            return;
        }

        if (href) {
            navigate(href);
        }
    }

    return (
        <div
            className={`nav-item w-full h-10 nav-item flex flex-row items-center rounded-md cursor-pointer ${isActive && 'nav-active'} ${className ?? ''}`}
            onClick={onClick ?? navClick}
        >
            <div className={"flex flex-shrink-0 justify-center items-center nav-icon text-inherit"}>
                <i className={`text-lg text-gray-800 fa-solid ${icon} text-inherit`}></i>
            </div>

            <div className={`flex-shrink-0 text-sm font-semibold leading-3 mb-[2px] ${expanded || !isOpen && 'hide'}`}>{name}</div>
        </div>
    )
}

function NavSection({ title, children }: { title: string, children: React.ReactNode })
{
    const { expanded } = getNavContext();

    return (
        <div className="w-full flex flex-col gap-3">
            <div className={'flex flex-col w-full'}>
                <span className={`line ${expanded && 'hide'}`}></span>
                <div className={`text-xs text-gray-500 font-bold nav-title ${!expanded && 'hide'}`}>{title}</div>
            </div>

            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function NavLogo()
{
    return (
        <div className={`${window.innerWidth < TAILWIND_BP.sm ? 'mb-3' : 'mb-5'} nav-icon`}>
            <Logo />
        </div>
    );
}

function NavbarTop() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const modalpopup = () => {
        alert('Coming Soon!')
    }

    return (
        <div className="nav-top w-full flexjustify-center">
            <div className="w-full flex flex-row justify-between mt-5">
                <NavLogo />

                <div className="flex flex-row gap-1">
                    <NavItem name="" className="mb-5" icon="fa-magnifying-glass" onClick={() => modalpopup()} />                           
                    <NavItem name="" icon="fa-bell" href="/notifications" />
                    <div className="relative">
                        <NavItem name = "" icon="fa-bars" onClick={toggleMenu}/>
                        {isOpen &&
                        <div className={`absolute z-50 right-2 barmenu rounded-md shadow-md${isOpen ? 'block' : 'hide'}`}>
                            <ul className="py-3 pl-2 pr-2 flex flex-col">
                                <NavSection title="General">
                                <li>
                                    <NavItem name="Dashboard" icon="fa-house" href="/" isOpen={isOpen} />
                                </li>
                                <li>
                                    <NavItem name="Applications" icon="fa-check-to-slot" href="/applications" isOpen={isOpen} />  
                                </li>
                                </NavSection>
                                <NavSection title="Customise">
                                <li>
                                    <NavItem name="Resume Templates" icon="fa-file-alt" href="/templates" isOpen={isOpen} />
                                </li>
                                <li>
                                    <NavItem name="Cover Letter Templates" icon="fa-envelope" href="/cover-letters" isOpen={isOpen} />
                                </li>
                                </NavSection>
                                <span className="nav-top-line"></span>
                                <li>
                                    <NavItem name="Settings" icon="fa-gear" href="/settings" isOpen={isOpen} />
                                </li>                                    
                                <li>
                                    <NavItem name="Logout" icon="fa-right-from-bracket" href="/logout" isOpen={isOpen} />
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavbarSide() {
    const { expanded, setExpanded } = getNavContext();

    const handleResize = () => {
        if (window.innerWidth < TAILWIND_BP.lg) {
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
        if (window.innerWidth < TAILWIND_BP.lg) {
            setExpanded(true);
        }
    }

    const mouseLeave = () => {
        if (window.innerWidth < TAILWIND_BP.lg) {
            setExpanded(false);
        }
    }

    const modalpopup = () => {
        alert('Coming Soon!')
    }

    return (
        <div className={`nav nav-size flex-shrink-0 flex flex-col justify-between h-full ${expanded ? 'w-[250px]' : 'w-[80px]'} content-col py-4 items-center`}
            onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} /*onTouchStart={mouseEnter} onTouchEnd={mouseLeave}*/>
            <div className="w-full">
                <NavLogo />

                <NavItem name="Search" className="mb-5" icon="fa-magnifying-glass" onClick={() => modalpopup()} />

                <div className="flex flex-col gap-3 w-full">
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

            <div className="w-full flex flex-col gap-1 mt-5">
                <NavItem name="Notifications" icon="fa-bell" href="/notifications" />
                <NavItem name="Settings" icon="fa-gear" href="/settings" />
                <NavItem name="Logout" icon="fa-right-from-bracket" href="/logout" />
            </div>
        </div>
    )
}

export { NavbarSide, NavbarTop };