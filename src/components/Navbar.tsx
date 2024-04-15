import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  function goTo(link: string) {
    navigate(link)
  }
  return (
    <nav className=" border-b-2 border-indigo-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          onClick={() => goTo('/')}
          className="text-gray font-bold text-xl"
        >
          Orimi
        </button>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => goTo('/')}
          className="text-gray mx-2 hover:text-gray-300"
        >
          {' '}
          Home
        </button>
        <button
          onClick={() => goTo('/products')}
          className="text-gray mx-2 hover:text-gray-300"
        >
          {' '}
          Products
        </button>
        <button
          onClick={() => goTo('/about')}
          className="text-gray mx-2 hover:text-gray-300"
        >
          {' '}
          About Us
        </button>
        <button
          onClick={() => goTo('/contact')}
          className="text-gray mx-2 hover:text-gray-300"
        >
          {' '}
          Contact
        </button>
        <button
          onClick={() => goTo('/login')}
          className="text-gray mx-2 hover:text-gray-300"
        >
          {' '}
          Login
        </button>
        <button
          onClick={() => goTo('/cart')}
          className="text-gray mx-2 hover:text-gray-300"
        >
          {' '}
          Cart
        </button>
      </div>
    </nav>
  )
}

export default Navbar
