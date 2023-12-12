import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SiteRoute } from './SiteRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <>
    <SiteRoute/>
    <ToastContainer
    position="top-right"
    autoClose={6000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnHover
    theme="light"
    limit={4}
    />
  </>
}

export default App
