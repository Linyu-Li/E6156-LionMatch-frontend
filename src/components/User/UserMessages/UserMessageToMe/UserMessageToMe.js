import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import TimeAgo from 'react-timeago';
import '../../../../shared/styles.css';
import '../UserMessages.css';

library.add(faClock);

const userMessageToMe = (props) => {

    let isRead = <span className="text-danger"> (unread)</span>
    if(props.message.isRead) {
        isRead = <span> (Read <TimeAgo date={props.message.dateRead} />)</span>
    }

    return (
        <div>
          <span className="chat-img float-right">
            <Image src={props.message.senderPhotoUrl} alt={props.message.sendernameFirst} className="rounded-circle" />
          </span>
          <div className="chat-body">
            <div className="header">
              <small className="text-muted">
                <FontAwesomeIcon icon="clock"/>
                <TimeAgo date={props.message.messageSent} />
                {isRead}
              </small>
            </div>
            <p>{props.message.content}</p>
          </div>
        </div>
    );
}

export default userMessageToMe;