import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import { connect } from 'react-redux';
import Pagination from '../../components/UI/Pagination/Pagination';
import UserCard from '../../components/User/UserCard/UserCard';
import UserFilter from '../../components/User/UserFilter/UserFilter';
import '../../shared/styles.css';
import { updateObject, getPageNumber } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Lists extends Component {

    state = {
        controls: {
            maxAge: 99,
            minAge: 18,
            gender: 'male'
        },
        gotInitialGenderValue: false
    }

    componentDidMount() {
        this.props.onGetUsers();
    }

    componentDidUpdate() {
        if(!this.state.gotInitialGenderValue && this.props.user.gender){
            const updatedControls = updateObject(this.state, { 
                controls: {
                    ...this.state.controls,
                    gender: this.props.user.gender.toLowerCase() === 'female' ? 'male' : 'female'
                },
                gotInitialGenderValue: true
            });
            this.setState(updatedControls);
        }
    }

    inputChangedHandler = ( event ) => {
        let controlName = event.target.id;
        const updatedControls = updateObject(this.state.controls, { [controlName]: event.target.value });
        this.setState( { controls: updatedControls } );
    }

    getUserParams() {
        return {
            minAge: this.state.controls.minAge,
            maxAge: this.state.controls.maxAge,
            gender: this.state.controls.gender.toLowerCase()
        }
    }

    applyFilterHandler = () => {

        let userParams = this.getUserParams();
        this.props.onGetUsers(this.props.pagination.currentPage, this.props.pagination.itemsPerPage, userParams, null);
    }

    resetFilterHandler = () => {
        const updatedControls = updateObject(this.state.controls, { 
            maxAge: 99,
            minAge: 18,
            gender: this.props.user.gender === 'female' ? 'male' : 'female'
        });
        this.setState( { controls: updatedControls } );
        this.props.onGetUsers();
    }

    pageChangeHandler = (event) => {

        let page = getPageNumber(event.target.text);        
        this.props.onGetUsers(page, this.props.pagination.itemsPerPage, this.getUserParams(), null);
    }

    sendLike = (id) => {
        this.props.onSendLike(this.props.user.id, id);
    }
    
    render() {

        let users = null;
        if(this.props.users){
            users = this.props.users.map( user => (
                <UserCard
                    key={user.id}
                    user={user}
                    likeUser={() => this.sendLike(user.id)} />
            ) );
        }        

        return(
            <Grid>
                <UserFilter 
                    applyFilterClicked={this.applyFilterHandler} 
                    resetFilterClicked={this.resetFilterHandler} 
                    controls={this.state.controls}
                    changed={( event ) => this.inputChangedHandler( event )}/>
                <div className="d-flex-default">
                    {users}                  
                </div>
                <Pagination pagination={this.props.pagination} changed={( event ) => this.pageChangeHandler( event )}/>
            </Grid>
        );
    }    
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        pagination: state.user.pagination,
        user: JSON.parse(state.auth.user)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: (page, itemsPerPage, userParams, likesParam) => dispatch( actions.getUsers(page, itemsPerPage, userParams, likesParam) ),
        onSendLike: (id, recipientId) => dispatch( actions.sendLike(id, recipientId) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);