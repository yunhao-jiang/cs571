import React, { useEffect } from 'react';
import LogInStatusContext from "../../contexts/LogInStatusContext";

export default function BadgerLogout() {
    const [loggedIn, setLoggedIn] = React.useContext(LogInStatusContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoggedIn(false)
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
