import React, {useCallback} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function BadgerLogin() {
    const navigate = useNavigate();

    const login = useCallback(()=>{
        const userName = document.getElementById("userName").value;
        const password = document.getElementById("password").value;
        if (userName.length === 0 || password.length === 0) {
            alert("You must provide both a username and password!")
            return
        }
        fetch('https://www.cs571.org/s23/hw6/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CS571-ID': 'bid_7d85b4cff564a5dc11dd'
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        }).then(res => {
            if (res.status === 200) {
                alert('You have successfully registered!');
                sessionStorage.setItem("loggedIn", true);
                navigate('/')
                return
            }
            return res.json()
        }).then(json => {
            if (json && json.msg) alert(json.msg);
        })
    },[])

    return <>
        <h1>Login</h1>
        <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" id="userName"/>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password"/>
        </Form>
        <Button onClick={login}>Login</Button>
    </>
}
