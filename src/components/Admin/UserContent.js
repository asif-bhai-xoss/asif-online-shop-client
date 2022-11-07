import React from 'react';

const UserContent = (props) => {
    const {userName, email, address, phone} = props.user;
    let index = props.index;
    return (
        <tr>
          <th scope='row'>{index+1}</th>
          <td>{userName}</td>
          <td>{email}</td>
          <td>{address}</td>
          <td>{phone}</td>
        </tr>
    );
};

export default UserContent;