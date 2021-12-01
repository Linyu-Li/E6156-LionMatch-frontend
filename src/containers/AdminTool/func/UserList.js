import React from "react";
import { Link, NavLink } from "react-router-dom";
import ContactCard from "./UserCard";

const ContactList = (props) => {
  console.log(props);

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.users.map((user) => {
    return (
      <ContactCard
        user={user}
        clickHander={deleteConactHandler}
        key={user.id}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        User List
        {/* <NavLink exact to="/AdminTool/add">
          <button className="ui button blue right">Add User</button>
        </NavLink> */}
        <Link to="/AdminTool/add">
          <button className="ui button blue right">Add User</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
