import React, { createContext, useState, useContext, useEffect } from 'react';

const LayoutContext = createContext();

export function useLayoutDetails({ title, filter }) {
    const { setTitle, setFilter } = useContext(LayoutContext);

    useEffect(() => {
        if (title !== undefined) setTitle(title);
        if (filter !== undefined) setFilter(filter);

        // Reset filter when component unmounts
        return () => {
            setFilter(null);
        };
    }, [title, filter, setTitle, setFilter]);
}

export function LayoutProvider({ children }) {
    const [title, setTitle] = useState('Listify');
    const [filter, setFilter] = useState(null);

    return (
        <LayoutContext.Provider value={{ title, setTitle, filter, setFilter }}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutContext;
