import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import BadgerChatroom from '../content/BadgerChatroom';
import BadgerChatHome from '../content/BadgerChatHome';
import BadgerNoMatch from '../content/BadgerNoMatch';
import LogInStatusContext from "../../contexts/LogInStatusContext";

function BadgerApp() {

    const [chatrooms, setChatrooms] = useState([]);
    const [logInStatus, setLogInStatus] = useState(false)

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/chatroom', {
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd",
            }
        }).then(res => res.json()).then(json => {
            setChatrooms(json)
        })
        checkCookie()
    }, []);

    const checkCookie = () => {
        fetch("https://cs571.org/s23/hw6/api/whoami", {
            method: "GET",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.ok ? setLogInStatus(true) : setLogInStatus(false))
    }

    setTimeout(() => {
        checkCookie()
    }, 60000)

    return (
        <BrowserRouter>
            <LogInStatusContext.Provider value={[logInStatus, setLogInStatus]}>
                <Routes>
                    <Route path="/" element={<BadgerLayout chatrooms={chatrooms}/>}>
                        <Route index element={<BadgerChatHome/>}/>
                        <Route path="/login" element={<BadgerLogin/>}></Route>
                        <Route path="/register" element={<BadgerRegister/>}></Route>
                        <Route path="/logout" element={<BadgerLogout/>}></Route>
                        {
                            chatrooms.map(chatroom => {
                                return <Route key={chatroom} path={`chatrooms/${chatroom}`}
                                              element={<BadgerChatroom name={chatroom}/>}/>
                            })
                        }
                        <Route path="*" element={<BadgerNoMatch/>}/>
                    </Route>
                </Routes>
            </LogInStatusContext.Provider>
        </BrowserRouter>
    );
}

export default BadgerApp;
