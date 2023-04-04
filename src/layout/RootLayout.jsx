import React from 'react'
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Topbar from '../components/Topbar';

const RootLayout = () => {
  return (
    <div>
      <Topbar/>
      <Outlet />

      {/* <h2>Footer</h2> */}
    </div>
  )
}

export default RootLayout