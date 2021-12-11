import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Grid from 'react-bootstrap/lib/Grid';
import Radio from 'react-bootstrap/lib/Radio';
import Row from 'react-bootstrap/lib/Row';
import { connect } from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import { checkValidity, updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import './UserRegister.css';


class UserRegister extends Component {

    state = {
        userData: {
            nameFirst: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First name'
                },
                value: null,
                validation: {
                    required: true
                },
                valid: false
            },
            nameLast: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last name'
                },
                value: null,
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'University Email (Required)'
                },
                value: null,
                validation: {
                    required: true
                },
                valid: false
            },
            // affiliatedCollege: {
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'affiliated school/college'
            //     },
            //     value: null,
            //     validation: {
            //         required: false  // for debug purpose
            //     },
            //     valid: false
            // },
            // dateOfBirth: {
            //     elementConfig: {
            //         type: 'date',
            //         placeholder: 'Date Of Birth'
            //     },
            //     value: null,
            //     validation: {
            //         required: false  // for debug purpose
            //     },
            //     valid: false
            // },
            // city: {
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'City'
            //     },
            //     value: null,
            //     validation: {
            //         required: false  // for debug purpose
            //     },
            //     valid: false
            // },
            // country: {
            //     elementConfig: {
            //         type: 'text',
            //         placeholder: 'Country'
            //     },
            //     value: null,
            //     validation: {
            //         required: false  // for debug purpose
            //     },
            //     valid: false
            // },
            address: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },
            postcode: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code (Required)'
                },
                value: null,
                validation: {
                    required: true
                },
                valid: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password (Required)'
                },
                value: null,
                validation: {
                    required: true
                },
                valid: false
            },
            confirmPassword: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password (Required)'
                },
                value: null,
                validation: {
                    required: true
                },
                valid: false
            }
        },
        gender: 'Male'
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(this.state.userData, {
            [controlName]: updateObject(this.state.userData[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.userData[controlName].validation )
            })
        });
        this.setState( { userData: updatedControls } );
    }

    handleGenderChange = gender => {
        this.setState({
          gender: gender.target.value
        });
    };

    submitHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.userData) {
            if (formElementIdentifier === 'confirmPassword')  continue;
            if (this.state.userData[formElementIdentifier].value) {
                formData[formElementIdentifier] = this.state.userData[formElementIdentifier].value;
            }
        }

        formData['Gender'] = this.state.gender.toLowerCase();
        this.props.onRegister( formData )
            .then(() => {
                // back to non-registration mode after registration step
                window.alert('User registered! Please log in to continue!');
                this.props.canceled();
            });
    }

    render() {

        const formElementsArray = [];
        for ( let key in this.state.userData ) {
            formElementsArray.push( {
                id: key,
                config: this.state.userData[key]
            } );
        }

        let formFields = formElementsArray.map( formElement => (
            <>
                <ControlLabel>{formElement.config.elementConfig.placeholder}</ControlLabel>
                <Input
                    key={formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
            </>

        ) );

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={10} lg={6}>
                        <h2>Sign Up</h2>
                        <hr/>
                        <form>
                            <FormGroup>
                                <ControlLabel>My gender</ControlLabel>
                                <Radio name="radioGroup" inline value="Male" checked={this.state.gender === "Male"} onChange={this.handleGenderChange}>Male</Radio>
                                <Radio name="radioGroup" inline value="Female" checked={this.state.gender === "Female"} onChange={this.handleGenderChange}>Female</Radio>
                                <Radio name="radioGroup" inline value="Other" checked={this.state.gender === "Other"} onChange={this.handleGenderChange}>Other</Radio>
                                <Radio name="radioGroup" inline value="Secret" checked={this.state.gender === "Secret"} onChange={this.handleGenderChange}>Secret</Radio>
                            </FormGroup>
                            {formFields}
                            <ButtonToolbar className="float-right">
                                <Button bsStyle="success" onClick={this.submitHandler}>Register</Button>
                                <Button onClick={this.props.canceled}>Cancel</Button>
                            </ButtonToolbar>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: ( user ) => {
            return new Promise((resolve, reject) => {
                dispatch(actions.register(user))
                resolve()
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(UserRegister);