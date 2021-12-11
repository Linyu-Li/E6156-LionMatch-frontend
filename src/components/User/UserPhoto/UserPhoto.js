import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
import './UserPhoto.css';

const userPhoto = (props) => {

    let userPhoto = require('../../../assets/user.png');
    if(props.userPhoto){
        userPhoto = props.userPhoto;
    }
    let url = `/users/${props.userID}`
    console.log("url: "+url);

    return (
        <Nav pullRight>
            <LinkContainer to={url}>
                <NavItem>
                    <Image src={userPhoto}/>
                </NavItem>
            </LinkContainer>     
        </Nav>
    );
}

export default userPhoto;