import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import '../../../shared/card-syles.css';
import './UserMessages.css';
import UserMessageToMe from './UserMessageToMe/UserMessageToMe';
import UserMessageToThem from './UserMessageToThem/UserMessageToThem';

const userMessages = (props) => {

    let messages = 'No messages yet... say hi by using the message box below';
    if(props.messages && props.messages.length !== 0) {
        let userMessages = props.messages.map((message, index) => {

            let userMessage = null;
            if(message.senderId === props.recipientId){
                userMessage = <UserMessageToThem message={message}/>
            }else{
                userMessage = <UserMessageToMe message={message}/>
            }
            
            return (
                <ListGroupItem key={index} className="border-none">
                    {userMessage}
                </ListGroupItem>
            );
        });

        messages = (
            <ListGroup className="chat">
                {userMessages}
            </ListGroup>
        );
    }
    return (
        <div className="card border-none">
            <div className="card-body">
                {messages}            
            </div >
            <div className="card-footer">
                <Form className="d-flex">
                    <FormControl type="text" placeholder="send a private message" onChange={props.onMessageChanged}/>
                    <Button type="submit" bsStyle="danger" onClick={props.sendMessage}>Send</Button>
                </Form>
            </div>
        </div >
    );
}

export default userMessages;