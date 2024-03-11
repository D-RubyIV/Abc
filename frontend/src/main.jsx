import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from "./Componets/Home/Home.jsx"
import ClassComponet from "./Componets/Admin/ClassComponet.jsx"
import BaseAdminPage from "./Componets/Admin/BaseComponet.jsx"
import MenuObjectComponet from './Componets/Admin/MenuObjectComponet.jsx'
import './index.css'
import NotFoundPage from "./Componets/NotFoundPage.jsx"
import { BrowserRouter, Routes, Route, Router, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import LoginComponet from './Componets/Auth/Login'
import RootComponet from "./Componets/Root"
import LicenseComponet from "./Componets/Admin/LicenseComponet.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootComponet />} >
      <Route index element={<Home />} />
      <Route path='login' element={<LoginComponet />} />
      {/* ADMIN */}
      <Route path='admin' element={<BaseAdminPage />}>
        <Route index element={<MenuObjectComponet />} />
        <Route path='class' element={<ClassComponet />} />
        <Route path='license' element={<LicenseComponet />} />
      </Route>
      {/* ADMIN */}
      <Route path='*' element={<NotFoundPage />}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
