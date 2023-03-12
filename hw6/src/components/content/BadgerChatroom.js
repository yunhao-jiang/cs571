import React, {useContext, useEffect, useState} from "react"
import LogInStatusContext from "../../contexts/LogInStatusContext";
import {Button, Form} from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [logInStatus] = useContext(LogInStatusContext)
    const [currentUser, setCurrentUser] = useState('')
    const [loadStatus, setLoadStatus] = useState(false)

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            setLoadStatus(true)
        })
    };

    const checkUser = () => {
        fetch('https://cs571.org/s23/hw6/api/whoami', {
            method: "GET",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(json => {
            if (json) setCurrentUser(json.user.username)
        })
    }

    useEffect(() => {
        loadMessages()
    }, [props]);

    useEffect(()=>{
        checkUser()
    },[loadStatus])

    setTimeout(loadMessages,5000) // Load all message every minute

    const createPost = () =>{
        if (postTitle.length === 0 || postContent.length === 0) {
            console.log(postTitle.length +" " + postContent.length)
            alert("You must provide both a title and content!")
            return
        }
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-CS571-ID': 'bid_7d85b4cff564a5dc11dd'
            },
            body: JSON.stringify({
                title: postTitle,
                content: postContent
            })
        }).then(res => {
            if (res.status === 200) {
                alert('Successfully posted message!');
                loadMessages()
                return
            }
            return res.json()
        }).then(json => {
            if (json && json.msg) alert(json.msg);
        })

    }

    const deletePost= (id) =>{
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'X-CS571-ID': 'bid_7d85b4cff564a5dc11dd'
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Successfully deleted the post!');
                loadMessages()
                return
            }
            return res.json()
        }).then(json => {
            if (json && json.msg) alert(json.msg);
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            logInStatus ?
                <><Form>
                    <Form.Label htmlFor='post-title'>Post Title</Form.Label>
                    <Form.Control type='text' id='post-title'
                                  onChange={(e) => setPostTitle(e.target.value)}/>
                    <Form.Label htmlFor='post-content'>Post Content</Form.Label>
                    <Form.Control type='text' id='post-content'
                                  onChange={(e) => setPostContent(e.target.value)}/>
                </Form>
                    <Button onClick={createPost}>Create Post</Button>
                </> :
                <p>You must be logged in to post!</p>
        }
        <hr/>
        {messages.length > 0 ? <>
            {messages.map((message) => {
                return <div key={message.id}>
                    <BadgerMessage {...message} deletePost={deletePost} currentUser={currentUser}/>
                </div>
            })}
        </> : <>
            <p>There are no messages in this chatroom yet!</p>
        </>}
    </>
}
