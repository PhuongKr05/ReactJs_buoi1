import { useState } from 'react';
import Header from './components/Header';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import PhotoPage from './components/PhotoPage';

function App() {
  const [page, setPage] = useState('users');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const goToUserDetails = (id) => {
    setSelectedUserId(id);
    setPage('details');
  };

  return (
    <div>
      <Header setPage={setPage} />
      {page === 'users' && <UserList onUserClick={goToUserDetails} />}
      {page === 'details' && (
        <UserDetails userId={selectedUserId} goBack={() => setPage('users')} />
      )}
      {page === 'photos' && <PhotoPage />}
    </div>
  );
}

export default App;
