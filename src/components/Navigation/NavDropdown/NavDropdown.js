import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import './NavDropdown.css';

library.add(faUser);
library.add(faSignOutAlt);

const navDropdown = ({ usernameFirst }) => {
    console.log(usernameFirst);
    let message = 'Welcome ' + usernameFirst;
    return (
        <Nav pullRight>            
            <NavDropdown title={message} id="basic-nav-dropdown">
                <MenuItem><FontAwesomeIcon icon="user"/>Edit Profile</MenuItem>
                <MenuItem divider />
                <LinkContainer to="/logout">
                    <MenuItem><FontAwesomeIcon icon="sign-out-alt"/>Logout</MenuItem>
                </LinkContainer>                
            </NavDropdown>     
        </Nav>
    );
}
  
export default navDropdown;