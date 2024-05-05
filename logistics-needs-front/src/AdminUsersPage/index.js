import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/useLocalStorage';

const AdminUsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    ajax("api/user", "GET", jwt).then((data) => {
      setUsersData(data);
    });
  }, [jwt]);

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            {/* Другие заголовки, если необходимо */}
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>{user.role}</td>
              {/* Другие ячейки, если необходимо */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsersPage;