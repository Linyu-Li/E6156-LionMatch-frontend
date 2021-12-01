import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import './UserPhoto.css';

const userPhoto = (props) => {

    let userPhoto = require('../../../assets/user.png');
    if(props.userPhoto){
        userPhoto = props.userPhoto;
    }

    return (
        <Nav pullRight>   
            <NavItem>
                <Image src={userPhoto}/>     
            </NavItem>     
        </Nav>
    );
}

export default userPhoto;