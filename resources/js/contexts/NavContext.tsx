import React from 'react';
import { TAILWIND_BP } from '@/constants';

interface Expandable {
    expanded: boolean,
    setExpanded: (expanded: boolean) => void,
}

const NavbarContext = React.createContext<Expandable | undefined>(undefined);

const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expanded, setExpanded] = React.useState(window.innerWidth > TAILWIND_BP.lg);

    return (
        <NavbarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </NavbarContext.Provider>
    );
}

export default NavbarProvider;

export const getNavContext = (): Expandable => {
    const context = React.useContext(NavbarContext);

    if (context === undefined) {
        throw new Error('useNavContext must be used within a NavbarProvider');
    }

    return context;
};
