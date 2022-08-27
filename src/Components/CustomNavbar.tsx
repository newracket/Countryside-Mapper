import React from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

interface Props {
    page: string;
    sticky: boolean;
}

class CustomNavbar extends React.Component<Props> {
    render() {
        return (
            <Navbar className="nav" variant="dark" expand="lg" fixed={this.props.sticky ? "top" : undefined}>
                <Container>
                    <Navbar.Brand><img className="iconImg" src="/country.png" alt="Countryside Mapper"/></Navbar.Brand>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className={this.props.page === "home" ? "active" : ""}>Home</Nav.Link>
                            <Nav.Link href="about" className={this.props.page === "about" ? "active" : ""}>About</Nav.Link>
                            <Nav.Link href="map" className={this.props.page === "map" ? "active" : ""}>Map</Nav.Link>
                        </Nav>

                        <Nav className="ms-auto">
                            <Nav.Link href="login" className={this.props.page === "login" ? "active" : ""}>Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default CustomNavbar