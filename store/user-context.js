import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
})

function UserProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    // when user successfully logged in
    function login(token) {
        setAuthToken(token);
        // react native async storage
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }



const value = {
    token: authToken,
    isLoggedIn: !!authToken,
    login: login,
    logout: logout,
}

return (
    <UserContext.Provider value={value}>
        { children }
    </UserContext.Provider>
)
}

export default UserProvider;