import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const RootLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar/>
      <div className="flex-1">
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout