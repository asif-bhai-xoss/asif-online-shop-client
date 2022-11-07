import {
    MDBSpinner,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllUsers,
    getAllUsers,
    getAllUsersError,
    getAllUsersStatus
} from "../../features/allUsersSlice";
import UserContent from "./UserContent";

const Users = () => {
  const users = useSelector(getAllUsers);
  const status = useSelector(getAllUsersStatus);
  const error = useSelector(getAllUsersError);
  const dispatch = useDispatch();

  useEffect(() => {
    if(status === "idle"){
        dispatch(fetchAllUsers());
    }
      
  }, [dispatch, status]);
  return (
    <div>
      <h2>Total Users: {users?.length}</h2>
      {status === "loading" && (
        <MDBSpinner className="m-5 mx-2" color="info">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      )}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <MDBTable hover>
          <MDBTableHead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
                users.map((user, index) => <UserContent
                key = {user._id}
                user={user}
                index={index}
                ></UserContent>)
            }
          </MDBTableBody>
        </MDBTable>
      )}
    </div>
  );
};

export default Users;
