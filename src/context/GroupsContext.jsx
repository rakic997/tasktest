import { createContext, useContext, useState } from "react";

const GroupsContext = createContext();

export const GroupsContextProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [activeGroup, setActiveGroup] = useState(null);

    return (
        <GroupsContext.Provider value={{ groups, setGroups, activeGroup, setActiveGroup }}>
            {children}
        </GroupsContext.Provider>
    )
}

export const useGroups = () => useContext(GroupsContext);