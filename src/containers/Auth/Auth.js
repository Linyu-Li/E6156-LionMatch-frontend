import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import { checkValidity, updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation )
            })
        });
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value );
    }

    render() {

        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <Navbar.Form pullRight>
                {form}
                <Button type="submit" bsStyle="success" onClick={this.submitHandler}>Log in</Button>
            </Navbar.Form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password ) => dispatch( actions.auth( email, password ) ),
    };
};

export default connect(null, mapDispatchToProps)(Auth);