import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/userSlice'; 

export default function UserList({ onUserClick }) {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>id</th><th>name</th><th>username</th><th>email</th>
            <th>phone</th><th>website</th><th>city</th><th>company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} onClick={() => onUserClick(u.id)}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.website}</td>
              <td>{u.address?.city}</td>
              <td>{u.company?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
