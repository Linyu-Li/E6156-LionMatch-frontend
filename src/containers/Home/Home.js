import React, { Component } from 'react';
// import Button from 'react-bootstrap/lib/Button';
import Button from '../../components/Button'
import { connect } from 'react-redux';
import UserRegister from '../User/UserRegister/UserRegister';
// import GoogleLogin from 'react-google-login';
import './Home.css';
// import {
//     GoogleButton,
//     GoogleAuthConsumer,
//     IAuthorizationOptions,
//     isLoggedIn,
//     IOAuthState,
//     createOAuthHeaders,
//     logOutOAuthUser,
//     GoogleAuth,
// } from "react-google-oauth2";

// const responseGoogle = (response) => {
//     console.log("response: "+response);
// };

// const options = {
//     clientId: "1093327178993-kbj68ghvsopafunmdk8rt1r6upt0oqdo.apps.googleusercontent.com",
//     redirectUri: "http://localhost:3000",
//     scopes: ["openid", "profile", "email"],
//     includeGrantedScopes: true,
//     accessType: "offline"
// };

class Home extends Component {

    state = {
        registerMode: false
    };
    
    cancelRegisterMode = () => {
        this.setState({registerMode: false});
    }

    registerToggle = () => {
        this.setState({registerMode: true});
    }


    
    render() {

        let registerMessage = null;
        if(!this.props.isAuthenticated && !this.state.registerMode) {        
            registerMessage = (
                <div className="register_text">
                    <div className="text-center">
                        <h1 className="text">Find your match</h1>
                        <h4 className="text">All you need to do is sign up!</h4>
                        <Button primary bsStyle="danger" bsSize="large" onClick={this.registerToggle}>Register</Button>
                        {/*<Button primary>Hello world!</Button>*/}
                        {/*<GoogleButton*/}
                        {/*    options={options}*/}
                        {/*    apiUrl="http://localhost:3000/"*/}
                        {/*    defaultStyle={true} // Optional*/}
                        {/*/>*/}

                        {/*<GoogleAuth>*/}
                        {/*    <GoogleAuthConsumer>*/}
                        {/*        {({responseState, isAuthenticated}) => {*/}
                        {/*            if (!isAuthenticated) {*/}
                        {/*            return <GoogleButton*/}
                        {/*                // placeholder="demo/search.png" // Optional*/}
                        {/*                options={options}*/}
                        {/*                apiUrl="http://localhost:3000"*/}
                        {/*                defaultStyle={true} // Optional*/}
                        {/*                displayErrors={true}>Sign in with google</GoogleButton>;*/}
                        {/*            } else {*/}
                        {/*                if (responseState.accessToken) { // You can also use isLoggedIn()*/}
                        {/*                    // Now send a request to your server using  createOAuthHeaders() function*/}
                        {/*                    let url = 'http://localhost:5000';*/}
                        {/*                    fetch(url, {*/}
                        {/*                        headers: createOAuthHeaders(),*/}
                        {/*                    })*/}
                        {/*                    .then(data => console.log("Horay We're logged in!"))*/}
                        {/*                    .catch(err => console.error("Just because you have a gmail account doesn't mean you have access!"))*/}
                        {/*                }*/}
                        {/*            }*/}
                        {/*        }}*/}
                        {/*    </GoogleAuthConsumer>*/}
                        {/*</GoogleAuth>*/}
                    </div>
                </div>
            );
        }

        let register = null;
        if(this.state.registerMode) {
            register = <UserRegister canceled={this.cancelRegisterMode}/>
        }

        return(
            <div className="background">
                {registerMessage}
                {register}
            </div>
        );
    }    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Home);