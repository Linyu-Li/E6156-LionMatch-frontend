import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/lib/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import './Logo.css';

library.add(faHeart);

const logo = () => (
    <Navbar.Brand>
        <LinkContainer to="/">
        {/* <FontAwesomeIcon icon="heart"/> */}
            <a href="/">&#129409; LionMatch</a>
        </LinkContainer>        
    </Navbar.Brand>
);

export default logo;