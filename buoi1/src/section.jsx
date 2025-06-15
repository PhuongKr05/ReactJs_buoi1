export default function Section({ title, children }) {
  return (
    <section className="section">
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </section>
  );
}
