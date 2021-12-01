import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import UserMessages from '../../../components/User/UserMessages/UserMessages';
import '../../../shared/card-syles.css';
import '../../../shared/styles.css';
import { updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import './UserDetails.css';
import UserDetailsCard from '../../../components/User/UserDetailsCard/UserDetailsCard';

class UserDetails extends Component {

    state = {
        message: '',
        key: 1
    };

    componentDidMount() {
        const userId = +this.props.match.params.userId;
        this.props.onGetUser(userId);
    }

    sendMessageHandler = (event) => {
        event.preventDefault();
        let message = {
            content: this.state.message,
            recipientId: this.props.userDetail.id
        }
        this.props.onSendMessage(this.props.user.id, message);
    }

    sendLike = () => {
        this.props.onSendLike(this.props.user.id, this.props.userDetail.id);
    }

    handleMessageChange = (message) => {
        this.setState(updateObject(this.state, {message: message.target.value}));    
    }

    handleTabChange(key) {
        if(key === 4){
            this.props.onGetMessageThread(this.props.user.id, this.props.userDetail.id);
        }
        this.setState(updateObject(this.state, {key: key}));    
    }

    render() {

        let userInfo = null;
        if (this.props.userDetail) {

            // const images = this.props.userDetail.photos.map(photo => {
            //     return {
            //         original: photo.url,
            //         thumbnail: photo.url
            //     }
            // });

            userInfo = (
                <Row>
                    <h1 className="mb-4 text-position">{this.props.userDetail.knownAs}'s Profile</h1>
                    <Row>
                        <UserDetailsCard user={this.props.userDetail}>
                            <ButtonGroup className="d-flex">
                                <Button bsStyle="danger" className="w-100" onClick={this.sendLike}>Like</Button>
                                <Button bsStyle="success" className="w-100" onClick={this.handleTabChange.bind(this, 4)}>Message</Button>
                            </ButtonGroup>
                        </UserDetailsCard>
                        <Col md={8} className="mx-3">
                            <div className="bg-light card shadow-sm mb-10">
                                <Tabs defaultActiveKey={1} 
                                    id="tab" 
                                    activeKey={this.state.key} 
                                    onSelect={(key) => this.handleTabChange(key)}>
                                    <Tab eventKey={1} title="About">
                                        <h4 className="font-weight-bold">Description</h4>
                                        <p className="mb-10">{this.props.userDetail.introduction}</p>
                                        <h4 className="font-weight-bold">Looking For</h4>
                                        <p>{this.props.userDetail.lookingFor}</p>
                                    </Tab>
                                    <Tab eventKey={2} title="Interests">
                                        <h4 className="font-weight-bold">Interests</h4>
                                        <p>{this.props.userDetail.interests}</p>
                                    </Tab>
                                    <Tab eventKey={3} title="Photos">
                                        <div className="img-wrapper">
                                            {/*<ImageGallery items={images}/>*/}
                                        </div>                                    
                                    </Tab>
                                    <Tab eventKey={4} title="Messages">
                                        <UserMessages 
                                            recipientId={this.props.userDetail.id} 
                                            messages={this.props.messageThread} 
                                            sendMessage={(event) => this.sendMessageHandler(event)} 
                                            onMessageChanged={(event) => this.handleMessageChange(event)}/>
                                    </Tab>
                                </Tabs>
                            </div>                            
                        </Col>
                    </Row>
                </Row>
            );
        }

        return (
            <Grid>
                {userInfo}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDetail: state.user.userDetail,
        user: JSON.parse(state.auth.user),
        messageThread: state.user.messageThread
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUser: (userId) => dispatch(actions.getUser(userId)),
        onGetMessageThread: (id, recipientId) => dispatch(actions.getMessageThread(id, recipientId)),
        onSendMessage: (id, message) => dispatch(actions.sendMessage(id, message)),
        onSendLike: (id, recipientId) => dispatch( actions.sendLike(id, recipientId) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);