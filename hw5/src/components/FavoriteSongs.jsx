import {useContext, useEffect, useState} from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import {Col, Container, Row} from "react-bootstrap";
import Song from "./Song";

const FavoriteSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [summary, setSummary] = useState([0, 0, 0]);

    const getSongs = Object.keys(favorites).map((key) => {
        return favorites[key];
    });

    const calculateSummary = () => {
        let totalDuration = 0;
        let genres = getSongs.reduce((acc, song) => {
            const time = song.length.split(":");
            totalDuration += parseInt(time[0]) * 60 + parseInt(time[1]);
            if (acc.includes(song.genre)) {
                return acc;
            } else {
                return [...acc, song.genre];
            }
        }, []);
        setSummary([getSongs.length, genres.length, totalDuration])
    }

    useEffect(() => {
        calculateSummary()
    }, [favorites]);

    return <div>
        <h1>Favorites</h1>
        <p>We have {summary[0]} songs in {summary[1]} genres for a total of {summary[2]} seconds of
            music!</p>
        <Container fluid>
            <Row>
                <BadgerBeatsFavoritesContext.Provider value={[favorites, setFavorites]}>
                    {getSongs.map((song) => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
                            <Song song={song}/>
                        </Col>
                    })}
                </BadgerBeatsFavoritesContext.Provider>
            </Row>
        </Container>
    </div>
}

export default FavoriteSongs;
