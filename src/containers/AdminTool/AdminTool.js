import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { uuid } from "uuidv4";
import api from '../../api/users';
import "./AdminTool.css";
import Header from "./func/Header";
import AddUser from "./func/AddUser";
import EditUser from "./func/EditUser";
import UserList from "./func/UserList";
import UserDetail from "./func/UserDetail";

function Admin() {
  const LOCAL_STORAGE_KEY = "users";
  const [users, setContacts] = useState([]);


  const retrieveContacts = async () => {
    const response = await api.get("/users");
    return response.data;
  };

  const addContactHandler = async (user) => {
    console.log(user);
    const request = {
      id: uuid(),
      ...user
    };
    const response = await api.post("/users", request);
    setContacts([...users, response.data]);
  };

  const updateContactHandler = async (user) => {
    const response = await api.put(`/users/${user.id}`, user);
    const {id, name, email, address} = response.data;
    setContacts(
      users.map((user) => {
        return user.id === id ? {...response.data} : user;
      }

      )
    );
  };

  const removeContactHandler = async (id) => {
    console.log(id);
    await api.delete(`/users/${id}`);
    const newUserList = users.filter((user) => {
      return user.id !== id;
    });

    setContacts(newUserList);
  };

  useEffect(() => {
    const getAllContacts = async() => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();

  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  return (
    <div className="ui container">
      <Router>
        <div>
            <Header />
            {/* <AddUser addContactHandler={addContactHandler} /> */}
            {/* <UserList
                    users={users}
                    getContactId={removeContactHandler}
                /> */}
            <Route
            path="/AdminTool"
            exact
            render={(props) => (
              <UserList
                {...props}
                users={users}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/AdminTool/add"
            render={(props) => (
              <AddUser {...props} addContactHandler={addContactHandler} />
            )}
          />
            <Switch>
            <Route
                path="/AdminTool/add"
                render={(props) => (
                <AddUser {...props} addContactHandler={addContactHandler} />
                )}
            />
            <Route
                path="/edit"
                render={(props) => (
                <EditUser {...props} updateContactHandler={updateContactHandler} />
                )}
            />
            <Route path="/user/:id" component={UserDetail} />
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default connect()(Admin);