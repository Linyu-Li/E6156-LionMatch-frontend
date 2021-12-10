import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navigation/Navbar/Navbar';

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
    console.log(state.auth.user);
    console.log(state.auth.token);
    return {
        isAuthenticated: state.auth.token !== null,
        userID: state.auth.user? state.auth.user.userID : null
        // userPhoto: state.auth.user ? JSON.parse(state.auth.user).photoUrl : null,
        // usernameFirst: state.auth.user ? JSON.parse(state.auth.user).nameFirst : null
    }
    
}

export default connect(mapStateToProps)(Layout);