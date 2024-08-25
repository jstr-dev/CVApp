import React from 'react';

interface Expandable {
    expanded: boolean,
    forceExpand: boolean,
    setExpanded: (expanded: boolean) => void,
    setForceExpand: (forceExpand: boolean) => void
}

const NavbarContext = React.createContext<Expandable | undefined>(undefined);

const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expanded, setExpanded] = React.useState(window.innerWidth > 640);
    const [forceExpand, setForceExpand] = React.useState(false);

    return (
        <NavbarContext.Provider value={{ expanded, setExpanded, forceExpand, setForceExpand }}>
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
