import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Logout from './containers/Auth/Logout/Logout';
import AdminTool from './containers/AdminTool/AdminTool';
import Home from './containers/Home/Home';
import Lists from './containers/Lists/Lists';
import Matches from './containers/Matches/Matches';
import Messages from './containers/Messages/Messages';
import UserDetails from './containers/User/UserDetails/UserDetails';
import UserPref from "./containers/UserPref/UserPref";
import timeSlot from './containers/timeSlot/timeSlot';
import NotFound from './containers/NotFound';
import { TimePage } from "./containers/TimeSlot";
import { Detail } from "./containers/detailView";
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import Admin from './containers/AdminTool/AdminTool'
import UserList from "./containers/AdminTool/func/UserList";
import AddUser from './containers/AdminTool/func/AddUser';

class App extends Component {
    // <Route path="/AdminTool" exact component={AdminTool}/>
    // <Route path="/AdminTool/add" component={AddUser}/>
    // <Route path="/messages" component={Messages}/> -> conversation svc not deployed

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
        console.log("this.props.isAuthenticated: " + this.props.isAuthenticated);
        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path="/matches" component={Matches}/>
                    <Route path="/lists" component={Lists}/>
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
        console.log("routes: "+routes);

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }

    // render(): * {
    //   return (
    //     <BrowserRouter>
    //       <AppDiv className="app">
    //         <ScrollToTop>
    //           <Switch>
    //             {this.props.downForMaintenance ? (
    //               <Route path="/" component={SiteDownPage} />
    //             ) : (
    //               Object.keys(pages).map((pageKey): * => {
    //                 const { path, component, exact, requireAuth, requireAdmin, showNavBar } = pages[pageKey]
    //                 // Apply a middleware-style HOC wrapping algorithm to determine
    //                 // the exact component to render
    //                 let componentToRender = component
    //                 if (showNavBar) {
    //                   componentToRender = navBarWrapper(componentToRender, true)
    //                 }
    //                 // Make sure we wrap with requireAuth LAST so it is checked FIRST
    //                 if (requireAuth) {
    //                   componentToRender = authWrapper(componentToRender, { requireAdmin: Boolean(requireAdmin) })
    //                 }

    //                 const routeProps = {
    //                   exact: Boolean(exact),
    //                   path,
    //                   component: componentToRender
    //                 }

    //                 return <Route key={path} {...routeProps} />
    //               })
    //             )}
    //           </Switch>
    //         </ScrollToTop>
    //       </AppDiv>
    //     </BrowserRouter>
    //   )
    // }
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
