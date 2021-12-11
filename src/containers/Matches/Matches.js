import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Grid from 'react-bootstrap/lib/Grid';
import '../../shared/styles.css';
import {SCHEDULER_URL} from "../../constants";


class Matches extends Component {
    constructor(props) {
        super(props);
        this.getMatch = this.getMatch.bind(this);
    }

    componentDidMount() {}

    // Get match by GET /api/matchUser/<uid>
    getMatch(userId) {
        if (userId !== null) {
            fetch(SCHEDULER_URL + "/matchUser/" + userId, {method: 'GET'})
                .then(response => {
                    if (response.ok) {
                        console.log(response)
                        return response.json();
                    }
                    })
                .then(response => {
                        if (response > 0) {
                            this.props.history.push(`/users/` + response);
                        } else {
                            window.alert('Cannot find any user who has common available time slots!');
                        }
                    }
                )
                .catch(() => this.props.history.push("/"));
        }
    }

    render() {
        return(
            <Grid>
                <ButtonGroup className="d-flex-default">
                    <Button
                        primary
                        bsStyle="danger"
                        bsSize="large" 
                        onClick={(ev) => { ev.preventDefault(); this.getMatch(this.props.match.params.userId); }}
                    >
                        Get Match!
                    </Button>
                </ButtonGroup>
            </Grid>
        );
    }    
}

export default Matches;