import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

import crest from '../../assets/uw-crest.svg'

function BadgerLayout(props) {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="login">Login</Nav.Link>
                        <Nav.Link as={Link} to="register">Register</Nav.Link>
                        <NavDropdown title="Chatrooms">
                            {
                                props.chatrooms.map(chatroom => {
                                    return <NavDropdown.Item as={Link}
                                                             to={`chatrooms/${chatroom}`}>{chatroom}
                                    </NavDropdown.Item>
                                })
                            }
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet/>
            </div>
        </div>
    );
}

export default BadgerLayout;
