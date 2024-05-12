import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const TopNavbar = ({ handleLogout }) => {
    return (
        <Navbar className="background-clr border-black justify-content-center" expand="lg" variant="light">
            <Navbar.Brand href="/">Procurement Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="break-bootstrap-container" id="basic-navbar-nav">
                <Button className="accordion-button" variant="outline-primary" onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar;