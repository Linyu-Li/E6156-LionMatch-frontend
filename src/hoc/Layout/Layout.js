import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import {instanceOf} from "prop-types";

class Layout extends Component {

    render() {
        return (            
            <div>
                <Navbar isAuth={this.props.isAuthenticated} userID={this.props.userID} userPhoto={this.props.userPhoto} usernameFirst={this.props.usernameFirst}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log(JSON.stringify(state.auth, null, 4));
    // console.log(state.auth.user);
    // console.log(JSON.parse(state.auth.user).userID);
    // console.log(state.auth.token);
    // console.log("userDetail: "+JSON.stringify(state.user.userDetail, null, 4));
    const userInfo = state.auth.user ? state.auth.user : null;
    return {
        isAuthenticated: state.auth.token !== null,
        userDetail: state.user.userDetail,
        userID: userInfo ? userInfo.userID : null,
        usernameFirst: userInfo ? userInfo.nameFirst : null
    }
}

export default connect(mapStateToProps)(Layout);