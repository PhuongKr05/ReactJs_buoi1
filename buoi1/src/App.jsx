import './App.css';
import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";
import { useState } from "react";

export default function App() {
  const [products] = useState([
    {
      name: "Son dưỡng ẩm 5",
      price: "500.000₫",
      image: "/sp1.png"
    },
    {
      name: "Son dưỡng ẩm 4",
      price: "230.000₫",
      image: "/sp2.png"
    },
    {
      name: "Son dưỡng ẩm 3",
      price: "330.000₫",
      image: "/sp3.png"
    },
    {
      name: "Son dưỡng ẩm 2",
      price: "430.000₫",
      image: "/sp4.png"
    }
  ]);

  return (
    <div>
      <Header />

      <Section>
        <img src="/background.png" alt="Banner" style={{ width: "100%" }} />
      </Section>

      <Section>
        <div className="policy-grid">
          <div><strong>FREESHIP</strong><br />Miễn phí vận chuyển</div>
          <div><strong>HOÀN TRẢ</strong><br />Trong 30 ngày miễn phí</div>
          <div><strong>THANH TOÁN</strong><br />Hỗ trợ nhiều hình thức</div>
          <div><strong>HỖ TRỢ</strong><br />24/7</div>
        </div>
      </Section>

      <Section title="SẢN PHẨM HOT">
        <div className="product-grid">
          {products.map((p, i) => (
            <div key={i} className="product-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
