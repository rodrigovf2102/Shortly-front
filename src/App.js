import { GlobalStyle } from './assets/styles/GlobalStyle.js';
import LoginPage from './pages/LoginPage.js';
import UserContext from './context/UserContext';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import SignupPage from './pages/SignupPage.js';

export default function App() {
    const [tasks, setTasks] = useState({})

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={{ tasks, setTasks }}>
                    <Routes>
                        <Route path={"/"} element={<HomePage />} />
                        <Route path={"/signin"} element={<LoginPage/>}/>
                        <Route path={"/signup"} element={<SignupPage/>}/>
                    </Routes>
                    
                </UserContext.Provider>
            </BrowserRouter>

        </>
    )
}

