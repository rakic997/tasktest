import { createContext, useContext, useState } from "react"

const GroupsContext = createContext()

export const GroupsContextProvider = ({ children }) => {
    const [groups, setGroups] = useState([])
    const [activeGroupId, setActiveGroupId] = useState(null)

    return (
        <GroupsContext.Provider value={{
            groups,
            setGroups,
            activeGroupId,
            setActiveGroupId,
        }}>
            {children}
        </GroupsContext.Provider>
    )
}

export const useGroups = () => useContext(GroupsContext)