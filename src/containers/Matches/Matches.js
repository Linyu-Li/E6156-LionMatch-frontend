import React, { Component, setState } from 'react';
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
        this.state = {
            matchid: 1
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
    }

    // Get match by GET /api/matchUser/<uid>
    getMatch = function(userId) {
        if (userId !== null) {
            fetch(SCHEDULER_URL + "/matchUser/" + userId, {method: 'GET'})
                .then(response => {
                    if (response.ok) {
                        console.log(response)
                        return response.json();
                    }
                    })
                .then(response =>
                    // console.log(response)
                    // this.setState({matchid: response})
                    this.props.history.push(`/users/` + response)
                )
                .catch(() => this.props.history.push("/"));
        }
    }

  //   routeChange() {
  //       let path = `/users/` + this.state.matchid;
  //       // let path = `/users/` + this.props.match.params.userId;
  //       this.props.history.push(path);
  // }

    render() {
        return(
            <Grid>
                <ButtonGroup className="d-flex-default">
                    {/*<Button primary bsStyle="danger" bsSize="large" onClick={() => this.getMatch("5")}>Get Match</Button>*/}
                    <Button primary bsStyle="danger" bsSize="large" onClick={this.getMatch(this.props.match.params.userId)}>Get Match</Button>
                </ButtonGroup>
            </Grid>
        );
    }    
}

export default Matches;