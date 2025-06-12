import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <img src="/logo.webp" alt="Innisfree Logo" className="logo" />
        <nav>
          <ul className="nav-links">
            <li><a href="#">Trang Chủ</a></li>
            <li><a href="#">Liên Hệ</a></li>
            <li><a href="tel:19006750" className="hotline">Hotline: 1900 6750</a></li>
            <li><a href="#"> Giỏ Hàng</a></li>
          </ul>
        </nav>
      </header>

      {}
      <section className="hero">
        <h1>Ở nhà làm đẹp</h1>
        <p>CHỐNG DỊCH COVID</p>
      </section>
    </div>
  );
}

export default App;
