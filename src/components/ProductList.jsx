export default function ProductList({ products = [] }) {
  if (!products.length) return <p>No products yet.</p>;
  return (
    <div>
      {products.map(p => (
        <div className="product" key={p.id}>
          <div>
            <strong>{p.name}</strong>
            <div className="small">₹{Number(p.price).toFixed(2)}</div>
            {p.description && <small className="help">{p.description}</small>}
          </div>
          {p.imageUrl ? <img alt={p.name} src={p.imageUrl} width="64" /> : null}
        </div>
      ))}
    </div>
  );
}
