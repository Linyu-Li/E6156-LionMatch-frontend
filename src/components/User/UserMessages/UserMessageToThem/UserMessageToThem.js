import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import TimeAgo from 'react-timeago';
import '../../../../shared/styles.css';
import '../UserMessages.css';

library.add(faClock);

const userMessageToThem = (props) => {

    return (
        <div>
          <span className="chat-img float-left">
            <Image src={props.message.senderPhotoUrl} alt={props.message.senderKnownAs} className="rounded-circle" />
          </span>
          <div className="chat-body">
            <div className="header">
              <small className="text-muted float-right">
                <FontAwesomeIcon icon="clock"/>
                <TimeAgo date={props.message.messageSent} />
              </small>
            </div>
            <br></br>
            <p className="message-padding">{props.message.content}</p>
          </div>
        </div>
    );
}

export default userMessageToThem;