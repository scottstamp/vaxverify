import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {

    render() {
        return (
            <Navbar bg="primary" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand href="/">VaxVerify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="nav" />
                    <Navbar.Collapse id="nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/" exact={true} as={NavLink}>Home</Nav.Link>
                            <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}