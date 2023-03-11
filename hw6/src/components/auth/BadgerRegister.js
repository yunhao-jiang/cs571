import React, {useCallback, useContext} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import LogInStatusContext from "../../contexts/LogInStatusContext";

export default function BadgerRegister() {

    const [userName, setUserName] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [logInStatus, setLogInStatus] = useContext(LogInStatusContext)
    const navigate = useNavigate();

    const register = useCallback(() => {
        if (userName.length === 0 || password1.length === 0) {
            alert('You must provide both a username and password!');
            return;
        }
        if (password1 !== password2) {
            alert('Your passwords do not match!');
            return;
        }
        fetch('https://www.cs571.org/s23/hw6/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CS571-ID': 'bid_7d85b4cff564a5dc11dd'
            },
            body: JSON.stringify({
                username: userName,
                password: password1
            })
        }).then(res => {
            if (res.status === 200) {
                alert('You have successfully registered!');
                setLogInStatus(true)
                navigate('/')
                return
            }
            return res.json()
        }).then(json => {
            if (json && json.msg) alert(json.msg);
        })
    },[]);

        return <>
            <h1>Register</h1>
            <Form>
                <Form.Label htmlFor="userName">Username</Form.Label>
                <Form.Control type="text" value={userName}
                              onChange={e => setUserName(e.target.value)}/>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" value={password1}
                              onChange={e => setPassword1(e.target.value)}/>
                <Form.Label htmlFor="passwordRepeat">Repeat Password</Form.Label>
                <Form.Control type="password" value={password2}
                              onChange={e => setPassword2(e.target.value)}/>
            </Form>
            <Button onClick={register}>Register</Button>
        </>
    }
