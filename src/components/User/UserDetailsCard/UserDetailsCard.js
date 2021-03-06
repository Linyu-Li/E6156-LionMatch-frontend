import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import TimeAgo from 'react-timeago';
import '../../../shared/card-syles.css';
import './UserDetailsCard.css';

const userDetailsCard = (props) => {

    let userPhoto = require('../../../assets/user.png');
    if (props.user.photoUrl) {
        userPhoto = props.user.photoUrl;
    }

    return (
        <Col md={4} className="mx-3">
            <div className="card shadow-sm mb-10">
                <Image className="card-img-top img-thumbnail border-none" src={userPhoto} alt={props.user.nameFirst} />
                <div className="card-body px-4">
                    <div>
                        <strong>First Name</strong>
                        <p>{props.user.nameFirst ? props.user.nameFirst : '(not provided)'}</p>
                    </div>
                    <div>
                        <strong>Last Name</strong>
                        <p>{props.user.nameLast ? props.user.nameLast : '(not provided)'}</p>
                    </div>
                    <div>
                        <strong>Zip Code</strong>
                        <p>{props.user.postalCode}</p>
                    </div>
                    <div>
                        <strong>Email</strong>
                        <p>{props.user.email}</p>
                    </div>
                    <div>
                        <strong>Gender</strong>
                        <p>{props.user.gender ? props.user.gender : '(not provided)'}</p>
                    </div>
                    {/*div className="mb-10">
                        <strong>Last Active</strong>
                        <br></br>
                        <TimeAgo date={props.user.lastActive}></TimeAgo>
                    </div>
                    <div className="mb-10">
                        <strong>Member Since</strong>
                        <br></br>}
                     */}   {/*{new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(props.user.created))}*/}
                    {/*</div>*/}
                </div>
                <div className="card-footer mb-10">
                    {props.children}
                </div>
            </div>
        </Col>
    );
}

export default userDetailsCard;