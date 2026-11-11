import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import StorefrontApp from './storefront/StorefrontApp.jsx'
import './index.css'

// Admin dashboard is loaded only when /admin is opened (keeps the shop bundle small).
const AdminApp = lazy(() => import('./App.jsx'))

// HashRouter: works on any static host without server rewrites.
//   /#/        -> storefront (mobile + web)
//   /#/admin   -> admin dashboard (has its own simple login)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<StorefrontApp />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-zinc-500">Memuat dashboard…</div>}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
