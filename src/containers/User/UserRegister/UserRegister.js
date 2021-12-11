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
            },
            movie: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Favorite Movies'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },
            book: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Favorite Books'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },
            music: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Favorite Music'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },
            sport: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Favorite Sports'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },
            hobby: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Other Hobbies'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },
            major: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your University/College Major'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            },

        },
        gender: null,
        orientation: null,
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

    handleOrientChange = orient => {
        this.setState({
            orientation: orient.target.value
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

        if (this.state.gender) {
            formData['Gender'] = this.state.gender.toLowerCase();
        }
        if (this.state.orientation) {
            formData['orientation'] = this.state.orientation.toLowerCase();
        }
        
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
                                <ControlLabel>My Gender</ControlLabel>
                                <Radio name="radioGroup" inline value="Male" checked={this.state.gender === "Male"} onChange={this.handleGenderChange}>Male</Radio>
                                <Radio name="radioGroup" inline value="Female" checked={this.state.gender === "Female"} onChange={this.handleGenderChange}>Female</Radio>
                                <Radio name="radioGroup" inline value="Other" checked={this.state.gender === "Other"} onChange={this.handleGenderChange}>Other</Radio>
                                <Radio name="radioGroup" inline value="Secret" checked={this.state.gender === "Secret"} onChange={this.handleGenderChange}>Secret</Radio>
                            </FormGroup>
                            {formFields}
                            <FormGroup>
                                <ControlLabel>My Gender Orientation</ControlLabel>
                                <Radio name="radioGroup" inline value="Heterosexual" checked={this.state.orientation === "Heterosexual"} onChange={this.handleOrientChange}>Heterosexual</Radio>
                                <Radio name="radioGroup" inline value="Bisexual" checked={this.state.orientation === "Bisexual"} onChange={this.handleOrientChange}>Bisexual</Radio>
                                <Radio name="radioGroup" inline value="Homosexual" checked={this.state.orientation === "Homosexual"} onChange={this.handleOrientChange}>Homosexual</Radio>
                                <Radio name="radioGroup" inline value="Asexual" checked={this.state.orientation === "Asexual"} onChange={this.handleOrientChange}>Asexual</Radio>
                                <Radio name="radioGroup" inline value="Secret" checked={this.state.orientation === "Secret"} onChange={this.handleOrientChange}>Secret</Radio>
                            </FormGroup>
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