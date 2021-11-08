import React, {createContext, useState, useContext} from "react";

interface AuthContextValues {
    authInfo: AuthInfo
    isAuthenticated: boolean
    setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>
    isAdmin: boolean
}

export const AuthContext = createContext<undefined | AuthContextValues>(undefined)
const Provider = AuthContext.Provider

interface Props {
    children: React.ReactNode;
}

interface UserData {
    role: 'USER' | 'ADMIN'
}

interface AuthInfo {
    userData: UserData | null
}

export const AuthProvider = ({children}: Props) => {
    const [authInfo, setAuthInfo] = useState<AuthInfo>({userData: null})

    const isAuthenticated = authInfo.userData !== null
    const isAdmin = authInfo.userData?.role === 'ADMIN'

    return (
        <Provider value={{authInfo, isAuthenticated, setAuthInfo, isAdmin}}>
            {children}
        </Provider>
    )
}

export function useAuthContext(){
    const context = useContext(AuthContext)
    if(context===undefined) {
        throw new Error('useAuthContext should be used within an AuthProvider')
    }
    return context
}