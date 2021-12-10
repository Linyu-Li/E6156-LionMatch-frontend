import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faEnvelopeOpen, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Grid from 'react-bootstrap/lib/Grid';
import Table from 'react-bootstrap/lib/Table';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import Pagination from '../../components/UI/Pagination/Pagination';
import '../../shared/styles.css';
import { getPageNumber } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import './Messages.css';

library.add(faEnvelopeOpen);
library.add(faPaperPlane);
library.add(faEnvelope);

class Matches extends Component {

    state = {
        messageContainer: 'Unread'
    }

    componentDidMount() {
        this.props.onGetMessages(this.props.user.id, null, null, this.state.messageContainer);
    }

    getMessage = (message) => {
        this.props.onGetMessages(this.props.user.id, 1, this.props.pagination.itemsPerPage, message);  
        this.setState({messageContainer: message});      
    }

    pageChangeHandler = (event) => {
        let page = getPageNumber(event.target.text);  
        this.props.onGetMessages(this.props.user.id, page, this.props.pagination.itemsPerPage, this.state.messageContainer);
    }
    
    render() { 

        let messages = null;
        let messagestable = null;
        let pagination = null;    
        if (this.props.messages && this.props.messages.length > 0){
            
            messages = this.props.messages.map( (message, index) => (
                <tr key={index}>
                    <td className="text-center">{message.content}</td>                    
                    {(() => {
                        if(this.state.messageContainer !== 'Outbox'){
                            return (
                                <td className="text-center">
                                    <img src={message.senderPhotoUrl} className="rounded-circle" alt=""></img>
                                    <strong>{message.sendernameFirst}</strong>
                                </td>   
                            ); 
                        }else if(this.state.messageContainer !== 'Inbox'){
                            return (
                                <td className="text-center">
                                    <img src={message.recipientPhotoUrl} className="rounded-circle" alt=""></img>
                                    <strong>{message.recipientnameFirst}</strong>
                                </td>   
                            ); 
                        } 
                    })()}                                                                 
                    <td className="text-center"><TimeAgo date={message.messageSent}/></td>
                    <td className="text-center"><Button bsStyle="warning">Delete</Button></td>                    
                </tr>
            ) );

            messagestable = (
                <Table responsive>
                    <thead>
                        <tr>
                        <th className="w-40 text-center">Message</th>
                        <th className="w-20 text-center">From / To</th>
                        <th className="w-20 text-center">Sent / Received</th>
                        <th className="w-20 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages}
                    </tbody>
                </Table>
            );

            pagination = <Pagination pagination={this.props.pagination} changed={( event ) => this.pageChangeHandler( event )}/>;

        } else {
            messagestable = <h3>No Messages</h3>;
        }        

        return(
            <Grid>
                <ButtonGroup className="d-flex-default">
                    <Button bsStyle="danger" onClick={() => this.getMessage('Unread')}><FontAwesomeIcon icon="envelope"/>Unread</Button>
                    <Button bsStyle="danger" onClick={() => this.getMessage('Inbox')}><FontAwesomeIcon icon="envelope-open"/>Inbox</Button>
                    <Button bsStyle="danger" onClick={() => this.getMessage('Outbox')}><FontAwesomeIcon icon="paper-plane"/>Outbox</Button>
                </ButtonGroup>
                <div className="d-flex-default">
                    {messagestable}
                </div>
                {pagination}
            </Grid>
        );
    }    
}

const mapStateToProps = state => {
    return {
        pagination: state.user.pagination,
        user: JSON.parse(state.auth.user),        
        messages: state.user.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetMessages: (id, page, itemsPerPage, messageContainer) => dispatch( actions.getMessages(id, page, itemsPerPage, messageContainer) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);