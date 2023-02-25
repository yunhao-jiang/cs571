import {useContext, useEffect, useState} from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import {Col, Container, Row} from "react-bootstrap";
import Song from "./Song";

const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [songs, setSongs] = useState([])

    const loadAllSongs = () => {
        fetch("https://cs571.org/s23/hw5/api/songs", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
            }
        }).then(response => response.json())
            .then(data => {
                setSongs(data);
            });
    }

    useEffect(() => {
        loadAllSongs();
    }, []);

    return <div>
        <h1>Songs</h1>
        <Container fluid>
            <Row>
                <BadgerBeatsFavoritesContext.Provider value={[favorites, setFavorites]}>
                {
                    songs.map((song) => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Song song={song} key={song.id}/>
                        </Col>
                    })
                }
                </BadgerBeatsFavoritesContext.Provider>
            </Row>
        </Container>
    </div>
}

export default AllSongs;
