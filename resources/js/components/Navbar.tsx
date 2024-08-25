import React from "react";
import Button from "./Button";
import { logout } from "@/services/UserService";
import { getUserContext } from "@/contexts/UserContext";
import Search from "./Search";
import { useNavigate } from 'react-router-dom';

function NavItem({ name, icon, href }: { name: string, icon: string, href: string }) {
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
            className={"w-full h-8 nav-item flex flex-row items-center px-2 rounded-md gap-3 cursor-pointer" + (isActive ? ' nav-active' : '')}
            onClick={navClick}
        >
            <div className={"h-4 flex justify-center items-center w-3 nav-icon"}>
                <i className={"text-sm text-gray-800 fa-solid " + icon}></i>
            </div>
            <div className="text-xs font-semibold text-black leading-3 mb-[1px]">{name}</div>
        </div>
    )
}

function NavSection({ title, children } : { title: string, children: React.ReactNode }) {
    return (
        <div className="w-full">
            <div className="text-xxs text-gray-400 font-semibold mb-1 px-1">{title.toUpperCase()}</div>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

export default function Navbar() {
    return (
        <div className="nav flex flex-col justify-between h-full w-[250px] content-col border-r-[1px] border-grey-400 px-4 py-4">
           <div>
                <div className="logo mb-6">
                    Logo
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