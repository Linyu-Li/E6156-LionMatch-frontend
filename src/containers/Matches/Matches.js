import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Grid from 'react-bootstrap/lib/Grid';
import '../../shared/styles.css';
import {SCHEDULER_URL} from "../../constants";
import { withRouter } from 'react-router-dom';


class Matches extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.getMatch = this.getMatch.bind(this);
        this.state = {}
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
    }

    // Get match by GET /api/matchUser/<uid>
    getMatch = function(userId) {
        if (userId !== null) {
            let matchid = fetch(SCHEDULER_URL + "/matchUser/" + userId, {method: 'GET'});
            console.log(matchid)
            return matchid;
        }
    }

    routeChange() {
        // let path = `/users/` + this.getMatch(this.props.match.params.userId);
        let path = `/users/` + this.props.match.params.userId;
        this.props.history.push(path);
  }

    render() {
        return(
            <Grid>
                <ButtonGroup className="d-flex-default">
                    {/*<Button primary bsStyle="danger" bsSize="large" onClick={() => this.getMatch("5")}>Get Match</Button>*/}
                    <Button primary bsStyle="danger" bsSize="large" onClick={this.routeChange}>Get Match</Button>
                </ButtonGroup>
            </Grid>
        );
    }    
}

export default Matches;