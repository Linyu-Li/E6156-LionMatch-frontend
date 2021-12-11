import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Grid from 'react-bootstrap/lib/Grid';
import '../../shared/styles.css';
import {SCHEDULER_URL} from "../../constants";


class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {}

    // Get match by GET /api/matchUser/<uid>
    getMatch = (id) => {
        if (id !== null) {
            fetch(SCHEDULER_URL + "/matchUser/" + id, {method: 'GET'});
        }
    }

    render() {
        return(
            <Grid>
                <ButtonGroup className="d-flex-default">
                    <Button primary bsStyle="danger" bsSize="large" onClick={() => this.getMatch("5")}>Get Match</Button>
                </ButtonGroup>
            </Grid>
        );
    }    
}

export default Matches;