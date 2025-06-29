import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import { Login, AuthLayout, ForgotPassword, ResetPassword } from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import MyPosts from './pages/MyPosts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },

      {
        path: '/login',
        element: (
          <AuthLayout authentication={false} >
            <Login />
          </AuthLayout>
        )
      },

      {
        path: '/forgot-password',
        element: (
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        )
      },

      {
        path: '/reset-password',
        element: (
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>
        )
      },

      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false} >
            <SignUp />
          </AuthLayout>
        )
      },

      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication >
            {""}
            <AllPosts />
          </AuthLayout>
        )
      },

      {
        path: '/my-posts',
        element: (
          <AuthLayout authentication>
            <MyPosts />
          </AuthLayout>
        )
      },

      {
        path: '/add-post',
        element: (
          <AuthLayout authentication >
            {""}
            <Addpost />
          </AuthLayout>
        )
      },

      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication >
            {""}
            <EditPost />
          </AuthLayout>
        )
      },

      {
        path: "/post/:slug",
        element: <Post />,
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)