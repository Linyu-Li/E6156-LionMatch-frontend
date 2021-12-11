import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/Home/Home';
import Matches from './containers/Matches/Matches';
import UserDetails from './containers/User/UserDetails/UserDetails';
import UserPref from "./containers/UserPref/UserPref";
import NotFound from './containers/NotFound';
import { TimePage } from "./containers/TimeSlot";
import { Detail } from "./containers/detailView";
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route component={NotFound}/>
            </Switch>
        );
        // console.log("this.props.isAuthenticated: " + this.props.isAuthenticated);
        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path="/matches" component={Matches}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/users/:userId" component={UserDetails}/>
                    <Route path="/preference/:urlPrefId" component={UserPref}/>
                    <Route path="/preference" component={UserPref}/>
                    <Route path="/userAvail/:uid/:id" component={Detail} />
                    <Route path="/userAvail/:uid" component={TimePage} />
                    <Route path="/" exact component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            );
        }
        // console.log("routes: "+routes);

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
