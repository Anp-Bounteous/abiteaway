import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"

const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 299,
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/07/margherita-pizza-recipe.jpg",
    description: "Classic cheese pizza with fresh basil & mozzarella"
  },
  {
    id: 2,
    name: "Chicken Biryani",
    price: 399,
    image: "https://th.bing.com/th/id/OIP.Vqk26LTkAenFUHzibKND0gHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Aromatic basmati rice with tender chicken & saffron"
  },
  {
    id: 3,
    name: "Veg Manchurian",
    price: 249,
    image: "https://img.freepik.com/premium-photo/veg-manchurian-popular-indochinese-food-made-cauliflower-florets-other-vegetable-served-white-plate-rustic-wooden-table-selective-focus_726363-656.jpg?w=1380",
    description: "Crispy veg balls in spicy Indo-Chinese gravy"
  },
  {
    id: 4,
    name: "Paneer Tikka",
    price: 349,
    image: "https://tandoormorni.com/wp-content/uploads/2025/04/Smoky-Tandoori-Paneer-Tikka-Delight.png",
    description: "Smoked paneer cubes with green chutney"
  },
  {
    id: 5,
    name: "Chicken 65",
    price: 279,
    image: "https://bonmasala.com/wp-content/uploads/2022/06/Chicken-65-recipe.webp",
    description: "Spicy South Indian fried chicken"
  },
  {
    id: 6,
    name: "Masala Dosa",
    price: 199,
    image: "https://res.cloudinary.com/jerrick/image/upload/v1676726625/63f0d161569337001d920901.jpg",
    description: "Crispy fermented rice crepe with sambar"
  },
]  
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
              🍕 A Bite Away
            </h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 3.5a3 3 0 01-2.5 1.5H3" />
                </svg>
                <span>₹0</span>
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Order Delicious Food
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Freshly prepared authentic Indian dishes delivered hot to your doorstep
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Search Biryani, Dosa, Pizza..."
              className="w-full p-6 pl-16 pr-32 text-xl border-2 border-orange-200 rounded-3xl focus:ring-4 focus:ring-orange-300 focus:border-orange-400 shadow-2xl focus:outline-none transition-all duration-500 bg-white/80 backdrop-blur-sm"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-16 w-28 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xl font-bold shadow-xl hover:shadow-2xl">
              Search
            </Button>
          </div>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {foods.map((food) => (
            <Card 
              key={food.id} 
              className="group hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-md hover:bg-white hover:shadow-orange-100"
            >
              <div className="overflow-hidden rounded-t-2xl h-64 bg-gradient-to-br from-orange-50 to-yellow-50">
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-8 pt-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-all duration-300 line-clamp-1">
                  {food.name}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed text-sm">
                  {food.description}
                </p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-orange-600 tracking-tight">
                    ₹{food.price}
                  </span>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-3 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 transition-all duration-200">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">🍽️ A Bite Away</h3>
          <p className="text-orange-100 mb-6">Delivering happiness, one bite at a time</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-orange-200 transition-colors">About</a>
            <a href="#" className="hover:text-orange-200 transition-colors">Contact</a>
            <a href="#" className="hover:text-orange-200 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
