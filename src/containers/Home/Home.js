import React, { Component } from 'react';
// import Button from 'react-bootstrap/lib/Button';
import Button from '../../components/Button'
import { connect } from 'react-redux';
import UserRegister from '../User/UserRegister/UserRegister';
import './Home.css';

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
            registerMessage = (<div className="register_text">
                                    <div className="text-center">
                                        <h1 className="text">Find your match</h1>
                                        <h4 className="text">All you need to do is sign up!</h4>
                                        <Button primary bsStyle="danger" bsSize="large" onClick={this.registerToggle}>Register</Button>
                                        <Button primary>Hello world!</Button>
                                    </div>                                    
                                </div>);
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