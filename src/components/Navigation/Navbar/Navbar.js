import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Login from '../../../containers/Auth/Auth';
import Logo from '../../Logo/Logo';
import UserPhoto from '../../User/UserPhoto/UserPhoto';
import NavbarItems from '../NavbarItems/NavbarItems';
import NavDropdown from '../NavDropdown/NavDropdown';
import './Navbar.css';

const navbar = (props) => {
    let navContent = <Login/>;
    // console.log("props.userID: " + props.userID);
    // console.log("props.usernameFirst: " + props.usernameFirst);
    if(props.isAuth){
        navContent = (
            <div>
                <NavbarItems userID={props.userID}/>                
                <NavDropdown usernameFirst={props.usernameFirst}/>
                <UserPhoto userPhoto={props.userPhoto} userID={props.userID}/>
            </div>            
        );
    }

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Logo/>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                {navContent}
            </Navbar.Collapse>
        </Navbar>
    );
}
  
export default navbar;