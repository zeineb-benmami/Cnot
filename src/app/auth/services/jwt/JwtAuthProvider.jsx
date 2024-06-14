import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from './jwtAuthConfig';

const defaultAuthContext = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    updateUser: null,
    signIn: null,
    signUp: null,
    signOut: null,
    refreshToken: null,
    setIsLoading: () => {},
    authStatus: 'configuring'
};

export const JwtAuthContext = createContext(defaultAuthContext);

function JwtAuthProvider(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStatus, setAuthStatus] = useState('configuring');
    const { children } = props;

    const handleSignInSuccess = useCallback((userData, accessToken) => {
        console.log('Sign-in success:', userData);
        setSession(accessToken);
        setIsAuthenticated(true);
        setUser(userData);
    }, []);

    const handleSignInFailure = useCallback((error) => {
        console.error('Sign-in failure:', error);
        resetSession();
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    const handleError = useCallback((error) => {
        console.error('Error:', error);
        resetSession();
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    const setSession = useCallback((accessToken) => {
        if (accessToken) {
            console.log('Setting session with token:', accessToken);
            localStorage.setItem(config.tokenStorageKey, accessToken);
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }
    }, []);

    const resetSession = useCallback(() => {
        console.log('Resetting session');
        localStorage.removeItem(config.tokenStorageKey);
        delete axios.defaults.headers.common.Authorization;
    }, []);

    const getAccessToken = useCallback(() => {
        return localStorage.getItem(config.tokenStorageKey);
    }, []);

    const isTokenValid = useCallback((accessToken) => {
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;
                console.log('Token valid check:', decoded.exp > currentTime);
                return decoded.exp > currentTime;
            } catch (error) {
                console.error('Token decode error:', error);
                return false;
            }
        }
        return false;
    }, []);

    useEffect(() => {
        const attemptAutoLogin = async () => {
            const accessToken = getAccessToken();
            if (isTokenValid(accessToken)) {
                try {
                    console.log('Attempting auto login with token:', accessToken);
                    setIsLoading(true);
                    const response = await axios.get(config.getUserUrl, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                    const userData = response?.data;
                    console.log('Auto login success, user data:', userData);
                    handleSignInSuccess(userData, accessToken);
                } catch (error) {
                    console.error('Auto login failed:', error);
                    handleSignInFailure(error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                resetSession();
                setIsLoading(false);
                setAuthStatus('unauthenticated');
            }
        };

        if (!isAuthenticated) {
            attemptAutoLogin();
        }
    }, [isTokenValid, setSession, handleSignInSuccess, handleSignInFailure, getAccessToken, resetSession, isAuthenticated]);

    const handleRequest = async (url, data, handleSuccess, handleFailure) => {
        try {
            console.log('Sending request to:', url);
            console.log('Payload:', data);
            const response = await axios.post(url, data);
            console.log('Response:', response);
            const userData = response?.data?.user;
            const accessToken = response?.data?.token;
            handleSuccess(userData, accessToken);
            return userData;
        } catch (error) {
            handleFailure(error);
            return error;
        }
    };

    const signIn = (credentials) => {
        return handleRequest(config.signInUrl, credentials, handleSignInSuccess, handleSignInFailure);
    };

    const signUp = useCallback((data) => {
        return handleRequest(config.signUpUrl, data, handleSignInSuccess, handleSignInFailure);
    }, [handleSignInSuccess, handleSignInFailure]);

    const signOut = useCallback(() => {
        console.log('Sign out');
        resetSession();
        setIsAuthenticated(false);
        setUser(null);
    }, [resetSession]);

    const updateUser = useCallback(async (userData) => {
        try {
            const response = await axios.put(config.updateUserUrl, userData);
            const updatedUserData = response?.data;
            setUser(updatedUserData);
            return null;
        } catch (error) {
            handleError(error);
            return error;
        }
    }, [handleError]);

    const refreshToken = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(config.tokenRefreshUrl);
            const accessToken = response?.headers?.['New-Access-Token'];
            if (accessToken) {
                setSession(accessToken);
                return accessToken;
            }
            return null;
        } catch (error) {
            handleError(error);
            return error;
        }
    };

    useEffect(() => {
        if (user) {
            setAuthStatus('authenticated');
        } else {
            setAuthStatus('unauthenticated');
        }
    }, [user]);

    const authContextValue = useMemo(
        () => ({
            user,
            isAuthenticated,
            authStatus,
            isLoading,
            signIn,
            signUp,
            signOut,
            updateUser,
            refreshToken,
            setIsLoading
        }),
        [user, isAuthenticated, isLoading, signIn, signUp, signOut, updateUser, refreshToken, setIsLoading]
    );

    return <JwtAuthContext.Provider value={authContextValue}>{children}</JwtAuthContext.Provider>;
}

export default JwtAuthProvider;

