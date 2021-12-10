import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

const navbarItems = (props) => {

    return (
        <Nav>
            <LinkContainer to="/matches">
                <NavItem>Matches</NavItem>
            </LinkContainer>
            <LinkContainer to="/lists">
                <NavItem>Lists</NavItem>
            </LinkContainer>
        </Nav>
    );
}
  
export default navbarItems;