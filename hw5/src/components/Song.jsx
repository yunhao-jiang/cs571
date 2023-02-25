import {Button, Card} from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import {useContext} from "react";

const Song = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const addToFavorites = () => {
        setFavorites(oldFavorites => [...oldFavorites, props.song.id]);
    }
    const removeFromFavorites = () => {
        setFavorites(oldFavorites => oldFavorites.filter(id => id !== props.song.id));
    }
    return <Card>
        <Card.Body>
            <Card.Img title={props.song.title} src={props.song.img} alt={props.song.title}/>
            <p/>
            <Card.Title>{props.song.title}</Card.Title>
            <Card.Subtitle>by {props.song.artist}</Card.Subtitle>
            <Card.Text>{props.song.genre} | {props.song.year} | {props.song.length}</Card.Text>
        {
            favorites.includes(props.song.id) ?
                <Button onClick={removeFromFavorites} variant={"danger"}>Remove from
                    Favorites</Button> :
                <Button onClick={addToFavorites}>Add to Favorites</Button>
        }
        </Card.Body>
    </Card>
}

export default Song;
