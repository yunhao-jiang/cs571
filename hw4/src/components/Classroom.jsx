import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Student from "./Student";
import {useEffect, useState} from "react";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [displayStudents, setDisplayStudents] = useState([]);

    //let displayStudents;

    function loadStudents() {
        console.log("loading stu")
        fetch("https://cs571.org/s23/hw4/api/students",
            {
                method: "GET",
                headers: {
                    "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
                }
            }).then(response => response.json())
            .then(data => {
                data.map((student) => {
                        const name = student.name;
                        const studentId = student.id;
                        const major = student.major;
                        const interests = student.interests;
                        const credits = student.numCredits;
                        const isWisconsinite = student.fromWisconsin;
                        setStudents(oldStudents => [...oldStudents, {
                            name,
                            major,
                            interests,
                            credits,
                            isWisconsinite,
                            studentId
                        }]);
                    }
                )
            });
    }

    function filterStudents(name, major, interest) {
        setDisplayStudents([]);
        console.log("filtering")
        students.every((stud) => {
            //console.log(stud)
            if (name !== "" && !nameIncludes(stud.name.first, stud.name.last, name)) {
                //console.log("returning: " + stud.name.first + " " + stud.name.last)
                return true;
            }
            if (major !== "" && !stud.major.toLowerCase().includes(major)) {
                return true;
            }
            if (interest !== "" && !stud.interests.some(inter => inter.toLowerCase().includes(interest))) {
                return true;
            }
            setDisplayStudents(oldStudents => [...oldStudents, stud])
            return true;
        });
    }

    function nameIncludes(firstName, lastName, toSearch) {
        let found = false;
        toSearch.split(" ").every(name => {
            if (firstName.toLowerCase().includes(name) || lastName.toLowerCase().includes(name)) {
                found = true;
                return false; // break
            }
        });
        return found;
    }

    useEffect(() => {
        loadStudents()
    }, [])

    useEffect(() => {
        filterStudents(searchName.trim().toLowerCase(), searchMajor.trim().toLowerCase(), searchInterest.trim().toLowerCase())
    }, [searchName, searchMajor, searchInterest, students])

    function resetSearch() {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");

    }


    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor}
                          onChange={(e) => setSearchMajor(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest}
                          onChange={(e) => setSearchInterest(e.target.value)}/>
            <br/>
            <Button variant="neutral" onClick={resetSearch}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>{
                displayStudents.map((student) => {
                    return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={student.studentId}>
                        <Student name={student.name} major={student.major} credit={student.credits}
                                 wisc={student.isWisconsinite} interests={student.interests}/>
                    </Col>
                })
            }
            </Row>
        </Container>
    </div>

}

export default Classroom;
