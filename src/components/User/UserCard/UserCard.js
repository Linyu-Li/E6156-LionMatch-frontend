import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import './UserCard.css';
import '../../../shared/card-syles.css';
import { LinkContainer } from 'react-router-bootstrap';

library.add(faHeart);
library.add(faUser);
library.add(faEnvelope);

const userCard = (props) => {

    let userPhoto = require('../../../assets/user.png');
    if (props.user.photoUrl) {
        userPhoto = props.user.photoUrl;
    }

    return (
        <Col xs={10} sm={6} md={4} lg={2}>
            <div className="card mb-4 shadow-sm">
                <div className="card-img-wrapper">
                    <img className="card-img-top" src={userPhoto} alt={props.user.knownAs}/>
                    <ul className="list-inline member-icons animate text-center">
                        <li><LinkContainer to={`/users/${props.user.id}`}><Button bsStyle="danger"><FontAwesomeIcon icon="user"/></Button></LinkContainer></li>
                        <li><Button bsStyle="danger" onClick={props.likeUser}><FontAwesomeIcon icon="heart"/></Button></li>
                        <li><Button bsStyle="danger"><FontAwesomeIcon icon="envelope"/></Button></li>
                    </ul>
                </div>
                <div className="card-body">
                    <h6 className="card-title text-center my-1">
                        <i className="fa fa-user"></i>
                        {props.user.knownAs}, {props.user.age}
                    </h6>
                    <p className="card-text text-muted text-center">{props.user.city}</p>
                </div>
            </div>
        </Col>        
    );
}

export default userCard;