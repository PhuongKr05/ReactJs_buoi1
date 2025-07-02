export default function Header({ setPage }) {
  return (
    <nav>
      <button onClick={() => setPage('users')}>Users</button>
      <button onClick={() => setPage('photos')}>Photos</button>
    </nav>
  );
}
