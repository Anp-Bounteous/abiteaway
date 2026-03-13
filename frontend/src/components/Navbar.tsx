import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-red-600">
        Abiteaway
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/products" className="hover:text-red-600">
          Products
        </Link>
        <Link to="/cart" className="hover:text-red-600">
          Cart
        </Link>
        <Link to="/orders" className="hover:text-red-600">
          Orders
        </Link>
        <Link to="/profile" className="hover:text-red-600">
          Profile
        </Link>
      </div>
    </nav>
  );
}