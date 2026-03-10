function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-yellow-500 flex items-center justify-center p-8">
      <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/50">
        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
          ABiteAway
        </h1>
        <div className="space-y-4 mb-8">
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-6 py-4 rounded-2xl font-medium">
            ✅ Backend: localhost:5000
          </div>
          <div className="bg-blue-100 border border-blue-300 text-blue-800 px-6 py-4 rounded-2xl font-medium">
            ✅ Frontend: localhost:5173 + Tailwind
          </div>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
          Start Ordering
        </button>
      </div>
    </div>
  )
}

export default App
