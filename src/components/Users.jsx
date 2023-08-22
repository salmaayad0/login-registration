import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const USERS_URL = '/users';

function Users() {
  const [users, setUsers] = useState();

  useEffect(()=>{
    let isMounted = true;
    // from axios to cancel the requesst
    const controller = new AbortController();

    const getUsers = async() => {
        try {
            const response = await axios.get(USERS_URL, {
                signal: controller.signal
            });
            console.log(response?.data);
            isMounted && setUsers(response?.data)
        } catch (error) {
            console.error(error);
        }
    }

    getUsers();

    // clean up to unmount
    return _=>{
        isMounted = false;
        controller.abort();
    }
  },[])

  return (
    <article>
      <h2>Users Lists:</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => 
            <li key={i}>
              <span>{user?.email}</span>{" "}
              <span>{user?.name} </span>{" "}
            </li>
          )}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
