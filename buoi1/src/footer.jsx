import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2><em>innisfree</em></h2>
        <p>Tầng 6 tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội</p>
        <p>1900 6750</p>
        <p><span className="highlight">support@sapo.vn</span></p>
      </div>

      <div className="footer-right">
        <form>
          <div className="form-row">
            <input type="text" placeholder="Họ tên" required />
            <input type="email" placeholder="Email" required />
          </div>
          <textarea placeholder="Nội dung" rows="4" required></textarea>
          <button type="submit">Gửi</button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>Cung cấp bởi <span className="highlight">Sapo</span></p>
      </div>
    </footer>
  );
}
