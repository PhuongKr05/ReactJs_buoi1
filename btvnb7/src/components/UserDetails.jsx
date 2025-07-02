import { useEffect, useState } from 'react';
import {
  fetchUserById,
  updateUser,
  fetchAlbumsByUser,
  createAlbum,
  deleteAlbum,
} from "../services/api.jsx";
import '../UserDetails.css';

export default function UserDetails({ userId, goBack }) {
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [form, setForm] = useState({ email: '', website: '', phone: '' });
  const [editMode, setEditMode] = useState(false);
  const [newAlbum, setNewAlbum] = useState('');

  useEffect(() => {
    fetchUserById(userId).then((res) => {
      setUser(res.data);
      setForm({
        email: res.data.email,
        website: res.data.website,
        phone: res.data.phone,
      });
    });
    fetchAlbumsByUser(userId).then((res) => setAlbums(res.data));
  }, [userId]);

  const handleSave = () => {
    updateUser(userId, form).then(() => {
      setUser((prev) => ({ ...prev, ...form }));
      setEditMode(false);
    });
  };

  const handleAddAlbum = () => {
    if (!newAlbum.trim()) return;
    createAlbum({ userId, title: newAlbum }).then((res) => {
      setAlbums((prev) => [...prev, res.data]);
      setNewAlbum('');
    });
  };

  const handleDeleteAlbum = (albumId) => {
    deleteAlbum(albumId).then(() => {
      setAlbums((prev) => prev.filter((a) => a.id !== albumId));
    });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-details-container">
      <div className="nav-bar">
        <span className="nav-active">Users</span>
        <span>Photos</span>
      </div>

      <h1>{user.name}</h1>

      <div className="user-sections">
        <div className="user-info">
          <div className="section">
            <h3 className="section-title">Personal:</h3>
            <p><strong>Id:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>

          <div className="section">
            <h3 className="section-title">Address:</h3>
            <p><strong>Street:</strong> {user.address.street}</p>
            <p><strong>Suite:</strong> {user.address.suite}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          </div>

          <div className="section">
            <h3 className="section-title">Company:</h3>
            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>CatchPhrase:</strong> {user.company.catchPhrase}</p>
            <p><strong>Bs:</strong> {user.company.bs}</p>
          </div>
        </div>

        <div className="contact-section">
          <h3 className="section-title">Contact:</h3>
          {editMode ? (
            <div className="edit-inputs">
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
              />
              <input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="Website"
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="contact-info">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Website:</strong> {user.website}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
        </div>
      </div>

      <hr />

      <h3>Photo Albums:</h3>
      <div className="album-inputs">
        <input
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
          placeholder="Title of new album"
        />
        <button onClick={handleAddAlbum}>New Album</button>
      </div>

      <div className="album-list-container">
        {albums.map((album, index) => (
          <div key={album.id} className="album-item">
            <div>{index + 1}</div>
            <div className="album-title">{album.title}</div>
            <button onClick={() => handleDeleteAlbum(album.id)} className="delete-album">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
