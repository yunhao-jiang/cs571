import React from "react"
import {Button} from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const deletePost = () => {
        props.deletePost(props.id)
    }

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            props.currentUser === props.poster ?
                <><Button onClick={deletePost} variant="danger">Delete Post</Button>
                    <hr/>
                </> : <hr/>
        }
    </>
}

export default BadgerMessage;
