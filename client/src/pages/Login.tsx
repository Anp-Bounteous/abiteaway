function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-[400px] max-w-full p-8 rounded-2xl shadow-2xl bg-white hover:shadow-3xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
          A Bite Away
        </h1>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 focus:outline-none transition-all duration-200"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-300 focus:outline-none transition-all duration-200"
          />
        </div>

        <button className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02] focus:ring-4 focus:ring-indigo-300 transform transition-all duration-200 text-lg active:scale-[0.98]">
          Sign In
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <span className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline cursor-pointer transition-all duration-150">
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login

