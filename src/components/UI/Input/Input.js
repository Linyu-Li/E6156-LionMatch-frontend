import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

const input = (props) => (
    <FormGroup>
        <FormControl {...props.elementConfig} value={props.value} onChange={props.changed} disabled={props.disabled}/>
    </FormGroup>
);

export default input;