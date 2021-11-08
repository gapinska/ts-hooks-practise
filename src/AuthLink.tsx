import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuthContext} from "./context/AuthProvider";

interface Props {
    children: React.ReactNode
}

export const AuthLink = ({ children }: Props) => {
    const {isAuthenticated, setAuthInfo} = useAuthContext()
    const navigate = useNavigate();

    const handleSignOut = async () => {
        // await signOutUser(); --> dodać
        setAuthInfo({ userData: null });
        navigate("/auth/sign-in");
    };

    return isAuthenticated ? (
        <Link onClick={handleSignOut} to="#">
            Sign Out
        </Link>
    ) : (
        <Link to="/auth/sign-in">{children}</Link>
    );
};