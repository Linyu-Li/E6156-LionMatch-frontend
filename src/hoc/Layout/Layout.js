import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import {instanceOf} from "prop-types";

class Layout extends Component {
    render() {
        return (            
            <div>
                <Navbar isAuth={this.props.isAuthenticated} userID={this.props.userID} usernameFirst={this.props.usernameFirst}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const userInfo = state.auth.user ? state.auth.user : null;
    console.log(userInfo);
    return {
        isAuthenticated: state.auth.token !== null,
        userDetail: state.user.userDetail,
        userID: userInfo ? userInfo.userID : null,
        usernameFirst: userInfo ? userInfo.nameFirst : null
    }
}

export default connect(mapStateToProps)(Layout);