import React, { useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { getNavContext } from "../contexts/NavContext";
import { TAILWIND_BP } from '@/constants';
import Logo from "./Logo";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    icon: string;
    href?: string;
}

function NavItem({ name, icon, href, className, onClick }: NavItemProps) {
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
            className={`w-full h-10 nav-item flex flex-row items-center rounded-md cursor-pointer ${isActive && 'nav-active'} ${className ?? ''}`}
            onClick={onClick ?? navClick}
        >
            <div className={"h-4 flex flex-shrink-0 justify-center items-center w-3 nav-icon"}>
                <i className={`text-lg text-gray-800 fa-solid ${icon}`}></i>
            </div>

            <div className={`nav-grad flex-shrink-0 text-sm font-semibold text-black leading-3 mb-[2px] ${!expanded && 'hide'}`}>{name}</div>
        </div>
    )
}

function NavSection({ title, children }: { title: string, children: React.ReactNode })
{
    const { expanded } = getNavContext();

    return (
        <div className="w-full flex flex-col">
            <div className={'flex flex-col w-full'}>
                <span className={`line ${expanded && 'hide'}`}></span>
                <div className={`text-xs text-gray-500 font-bold mb-2 nav-title ${!expanded && 'hide'}`}>{title}</div>
            </div>

            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function NavLogo()
{
    return (
        <div className="mb-5 nav-icon">
            <Logo />
        </div>
    );
}

export default function Navbar() {
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

                {/* md:background-col */}
                <NavItem name="Search" className="mb-5" icon="fa-magnifying-glass" onClick={() => modalpopup()} />

                <div className="flex flex-col gap-5 w-full">
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
