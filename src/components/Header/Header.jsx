import React from 'react'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import Logout from './Logout'


function Header() {

  const authStatus = useSelector(state => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const navigate = useNavigate()

  const navitems = [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: 'Premium',
      path: '/premium',
      active: true,
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !authStatus,
    },
  ]

  return (
    // Make Reddit Clone Using React And Tailwind CSS and Make Use of React Router Dom
    <>
      <div className="flex flex-row justify-between items-center bg-white p-4 shadow-md">
        <div className="flex flex-row items-center">
          <Link to="/">
            <img src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png" alt="reddit logo" className="w-10 h-10" />
          </Link>
          <Link to="/" className="text-2xl font-bold ml-2 text-blue-600 hover:text-blue-800">Reddit</Link>
        </div>
        <div className="flex flex-row items-center">
          {/* <Link to="/premium" className="text-xl font-bold mr-2 text-gray-600 hover:text-gray-800">Premium</Link>
          <Link to="/login" className="text-xl font-bold mr-2 text-gray-600 hover:text-gray-800">Login</Link>
          <Link to="/signup" className="text-xl font-bold mr-2 text-gray-600 hover:text-gray-800">Signup</Link> */}
          {navitems.map((item, index) => {
            return item.active && <Link key={index} to={item.path} className="text-xl font-bold mr-2 text-gray-600 hover:text-gray-800">{item.name}</Link>
          })}
          {
            authStatus && <Link to="#" className="text-xl font-bold mr-2 text-blue-500 hover:text-gray-800 profile-name"> {userData.name} </Link>
          }
          {
            authStatus && <Logout />
          }
        </div>
      </div>
    </>
  )
}

export default Header