import { useAppContext } from "../context/AppContext";

export default function Orders() {
  const { orders } = useAppContext();

  if (!orders.length) {
    return (
      <div className="empty-state">
        <h2>No orders yet.</h2>
        <p>Place your first order and it will appear here.</p>
      </div>
    );
  }

  return (
    <section className="stack-md">
      <div className="section-head">
        <div>
          <span className="eyebrow">Order history</span>
          <h1>Track your recent orders</h1>
        </div>
      </div>

      {orders.map((order) => (
        <article className="order-card" key={order.id}>
          <div className="order-head">
            <div>
              <h3>Order #{order.id.slice(0, 8).toUpperCase()}</h3>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="status-badge">{order.status}</span>
          </div>
          <div className="order-items">
            {order.items.map((item) => (
              <div className="summary-row" key={item.id}>
                <span>
                  {item.food.name} x {item.quantity}
                </span>
                <span>Rs. {item.food.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs. {order.total}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
