import React from "react";
import { useParams } from "react-router-dom";
import {checkValidity, updateObject} from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Radio from "react-bootstrap/lib/Radio";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Button from "react-bootstrap/lib/Button";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import "./UserPref.css";


const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
}

const UserPref = ({ prefId, onGetPref, onUpdatePref, curPref, canceled }) => {
    let { urlPrefId } = useParams();
    prefId = urlPrefId || prefId;

    React.useEffect(() => {
        if (prefId !== undefined && prefId !== null) {
            onGetPref(prefId);
        }
    }, [prefId])

    const [state, setState] = React.useState({
        major: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your academic major'
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
                placeholder: 'Your hobbies in general (e.g. video games)'
            },
            value: null,
            validation: {
                required: false
            },
            valid: false
        },
        movie: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your favorite movies'
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
                placeholder: 'Your favorite books'
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
                placeholder: 'Your favorite music genres'
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
                placeholder: 'Your favorite sports'
            },
            value: null,
            validation: {
                required: false
            },
            valid: false
        },
        orientation: {
            value: 'Heterosexual'
        },
    });

    React.useEffect(() => {
        if (curPref !== undefined && curPref !== null) {
            let update = {};
            for (let formElementIdentifier in state) {
                update[formElementIdentifier] = {...state[formElementIdentifier], value: curPref[formElementIdentifier] };
            }
            setState(updateObject(state, update));
        }
    }, [curPref]);

    const orientOptions = ['Heterosexual', 'Bisexual', 'Homosexual', 'Asexual', 'Secret'];

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject(state, {
            [controlName]: updateObject(state[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, state[controlName].validation)
            })
        });
        setState(updatedControls);
    }

    const handleOrientChange = orient => {
        setState({
            ...state,
            orientation: { value: orient.target.value }
        });
    };

    const submitHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in state) {
            formData[formElementIdentifier] = state[formElementIdentifier].value;
        }
        formData.prefId = prefId;
        onUpdatePref( formData );
    }

    let formElementsArray = [];
    for (let key in state) {
        if (state[key].elementConfig !== undefined) {
            formElementsArray.push({
                id: key,
                config: state[key]
            });
        }
    }

    const formFields = formElementsArray.map(formElement => (
        <>
            <ControlLabel>{capitalize(formElement.id)}</ControlLabel>
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={( event ) => inputChangedHandler( event, formElement.id )}
            />
        </>
    ));

    const orientRadio = orientOptions.map(o => (
        <Radio
            name="radioGroup"
            inline
            value={o}
            checked={state.orientation.value === o}
            onChange={handleOrientChange}
        >
            {o}
        </Radio>
    ));

    return (
        <Grid>
            <Row>
                <Col xs={12} md={10} lg={6}>
                    <h2>Edit Profile</h2>
                    <hr />
                    <Form>
                        <FormGroup>
                            <ControlLabel>Sexual Orientation</ControlLabel>
                            <br/>
                            {orientRadio}
                        </FormGroup>
                        {formFields}
                        <ButtonToolbar className="float-right">
                            <Button bsStyle="success" onClick={submitHandler}>Update</Button>
                            <Button onClick={canceled}>Cancel</Button>
                        </ButtonToolbar>
                    </Form>
                </Col>
            </Row>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        curPref: state.pref.curPref,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetPref: ( pref_id ) => dispatch(actions.getPref(pref_id)),
        onUpdatePref: ( pref ) => dispatch(actions.updatePref(pref))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPref);
