import React, {useCallback, useEffect, useState} from "react"

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    const getFullDateString = useCallback((timestamp) => {
        const date = new Date(timestamp);
        let ampm = date.getHours() < 12 ? "AM" : "PM"
        let hour = date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
        let minute = date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
        let sec = date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds()
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " at " + hour + ":" + minute + ":" + sec + " " + ampm
    })
    return <>
        <h1>{props.name} Chatroom</h1>
        {/* TODO: Allow an authenticated user to create a post. */}
        <hr/>
        {messages.length > 0 ? <>
            {messages.map((message) => {
                return <div key={message.id}>
                    <h3>{message.title}</h3>
                    <p><small>Posted on {getFullDateString(message.created)}</small></p>
                    <i>{message.poster}</i>
                    <p>{message.content}</p>
                </div>
            })}
        </> : <>
            <p>There are no messages in this chatroom yet!</p>
        </>}
    </>
}
