import {useContext, useEffect, useState} from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import {Col, Container, Row} from "react-bootstrap";
import Song from "./Song";

const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [songs, setSongs] = useState([])
    const [summary, setSummary] = useState([0, 0, 0]);

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

    const calculateSummary = () => {
        let totalDuration = 0;
        let genres = songs.reduce((acc, song) => {
            const time = song.length.split(":");
            totalDuration += parseInt(time[0]) * 60 + parseInt(time[1]);
            if (acc.includes(song.genre)) {
                return acc;
            } else {
                localStorage.getItem("favStore") === null ? setFavorites({}) : setFavorites(JSON.parse(localStorage.getItem("favStore")));
                return [...acc, song.genre];
            }
        }, []);
        setSummary([songs.length, genres.length, totalDuration])
    }

    useEffect(() => {
        loadAllSongs();
    }, []);

    useEffect(() => {
        calculateSummary()
    }, [songs]);

    return <div>
        <h1>Songs</h1>
        <p>We have {summary[0]} songs in {summary[1]} genres for a total of {summary[2]} seconds of
            music!</p>
        <Container fluid>
            <Row>
                <BadgerBeatsFavoritesContext.Provider value={[favorites, setFavorites]}>
                    {
                        songs.map((song) => {
                            return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
                                <Song song={song}/>
                            </Col>
                        })
                    }
                </BadgerBeatsFavoritesContext.Provider>
            </Row>
        </Container>
    </div>
}

export default AllSongs;
