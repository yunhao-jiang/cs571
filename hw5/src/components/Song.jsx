import {Card, Image} from "react-bootstrap";

const Song = (props) => {
    return <Card>
        <Card.Img title={props.song.title} src={props.song.img} alt={props.song.title}/>
        <Card.Body>
            <Card.Title>{props.song.title}</Card.Title>
            <Card.Subtitle>by {props.song.artist}</Card.Subtitle>
            <Card.Text>{props.song.genre} | {props.song.year} | {props.song.length}</Card.Text>
        </Card.Body>
    </Card>
}

export default Song;
