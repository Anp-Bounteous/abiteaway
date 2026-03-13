import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";

export default function Landing() {
  const featuredRestaurants = [
    { id: 1, name: "Spicy Hub", image: "/images/food1.jpg" },
    { id: 2, name: "Pizza Palace", image: "/images/food2.jpg" },
    { id: 3, name: "Burger Point", image: "/images/food3.jpg" },
    { id: 4, name: "Sushi World", image: "/images/food4.jpg" },
    { id: 5, name: "Taco Town", image: "/images/food5.jpg" },
    { id: 6, name: "Curry Corner", image: "/images/food6.jpg" },
  ];

  return (
    <div className="px-4 py-6">
      {/* Carousel */}
      <Carousel />

      {/* Featured Restaurants */}
      <h2 className="text-2xl font-bold mt-6 mb-4">Popular Restaurants</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredRestaurants.map((rest) => (
          <Link
            to={`/products/${rest.id}`}
            key={rest.id}
            className="p-4 rounded-lg shadow hover:shadow-lg transition relative"
          >
            <img
              src={rest.image}
              alt={rest.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 font-semibold text-lg">{rest.name}</h3>
            <p className="text-gray-500">Delicious meals delivered fast</p>
          </Link>
        ))}
      </div>
    </div>
  );
}