import React from "react";
import { Link } from "react-router-dom";
import user from "../../../assets/user.jpg"

const UserDetail = (props) => {
  const { name, email, address } = props.location.state.user;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
          <div className="description">{address}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to User List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
