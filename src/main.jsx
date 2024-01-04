import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Premium from './components/Premium/Premium.jsx'
import PostPage from './components/PostPage/PostPage.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<PostPage />} />
//       <Route path="premium" element={<Premium />} />
//     </Route>

//   ),
// )

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PostPage />,
      },
      {
        path: 'premium',
        element:(
          <AuthLayout authentication={true}>
            <Premium />
          </AuthLayout>
        )
      },
      {
        path: 'login',
        element:(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: 'signup',
        element:(
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },


    ],

  }
]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
