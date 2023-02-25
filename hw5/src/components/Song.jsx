import {Button, Card} from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import {useContext} from "react";

const Song = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const addToFavorites = () => {
        // add new song to the dictionary with key as song id and value as song object
        setFavorites(oldFavorites => ({...oldFavorites, [props.song.id]: props.song}));
    }
    const removeFromFavorites = () => {
        const newFavorites = {...favorites};
        delete newFavorites[props.song.id];
        setFavorites(newFavorites);
    }
    return <Card>
        <Card.Body>
            <Card.Img title={props.song.title} src={props.song.img} alt={props.song.title}/>
            <p/>
            <Card.Title>{props.song.title}</Card.Title>
            <Card.Subtitle>by {props.song.artist}</Card.Subtitle>
            <Card.Text>{props.song.genre} | {props.song.year} | {props.song.length}</Card.Text>
        {
            props.song.id in favorites ?
                <Button onClick={removeFromFavorites} variant={"danger"}>Remove from
                    Favorites</Button> :
                <Button onClick={addToFavorites}>Add to Favorites</Button>
        }
        </Card.Body>
    </Card>
}

export default Song;
