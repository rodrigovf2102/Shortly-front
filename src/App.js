import {GlobalStyle} from './assets/styles/GlobalStyle.js';
import LoginPage from './pages/LoginPage.js';
import UserContext from './context/UserContext';
import { useState } from 'react';

export default function App() {
    const [tasks, setTasks] = useState({})

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{ tasks, setTasks }}>
                <LoginPage />
            </UserContext.Provider>
            
        </>
    )
}

