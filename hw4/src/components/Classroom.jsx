import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Student from "./Student";
import {useEffect, useState} from "react";

const Classroom = () => {
    function addStudent() {
        fetch("https://cs571.org/s23/hw4/api/students",
            {
                method: "GET",
                headers: {
                    "X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
                }
            }).then(response => response.json()).then(data => {
            data.map((student) => {
                    const name = student.name;
                    const studentId = student.id;
                    // const major = student.major;
                    // const interests = student.interests;
                    setStudents(oldStudents => [...oldStudents, {name, studentId}]);
                }
            )
        });
    }


    const [students, setStudents] = useState([]);
    useEffect(() => {
        addStudent();
    }, [])
    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"/>
            <br/>
            <Button variant="neutral">Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>{
                students.map((student) => {
                    return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={student.studentId}>
                        <Student name={student.name}/>
                    </Col>
                })
            }
            </Row>
        </Container>
    </div>

}

export default Classroom;
