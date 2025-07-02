import { useDispatch, useSelector } from 'react-redux';
import {
  getPhotos,
  resetPhotos,
  setAlbumId,
} from '../redux/photoSlice';
import '../PhotoPage.css';
import FallbackImg from '../assets/pt.jpg';

export default function PhotoPage() {
  const dispatch = useDispatch();
  const { list: photos, albumId, loading, error, page } = useSelector((state) => state.photos);

  const handleSearch = () => {
    dispatch(resetPhotos());
    dispatch(getPhotos({ albumId, page: 0 }));
  };

  const loadMore = () => {
    dispatch(getPhotos({ albumId, page }));
  };

  return (
    <div className="photo-page-container">
      <div className="header-bar">
        <span>Users</span>
        <span className="active-tab">Photos</span>
      </div>

      <div className="search-bar">
        <input
          className="album-input"
          value={albumId}
          onChange={(e) => dispatch(setAlbumId(e.target.value))}
          placeholder="Enter album ID"
        />
        <button className="search-btn" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="album-thumb"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FallbackImg;
              }}
            />
            <p className="photo-title">{photo.title}</p>
            <p><strong>ID:</strong> {photo.id}</p>
            <p><strong>Album ID:</strong> {photo.albumId}</p>
          </div>
        ))}


      </div>

      {photos.length > 0 && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
