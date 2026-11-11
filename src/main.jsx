import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { StoreProvider, useStore } from './context/StoreContext.jsx'
import { AuthPage } from './views/AuthPage.jsx'
import { Toast } from './components/Toast.jsx'
import StorefrontApp from './storefront/StorefrontApp.jsx'
import './index.css'

// Admin dashboard is loaded only when /admin is opened (keeps the shop bundle small).
const AdminApp = lazy(() => import('./App.jsx'))

function AppRoutes() {
  const { isAuthenticated, adminUser } = useStore()
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen w-full flex flex-col"
        >
          <Routes location={location} key={location.pathname}>
            {/* Halaman Login / Registrasi */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  adminUser?.role?.toLowerCase() === 'admin' ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                ) : (
                  <AuthPage />
                )
              }
            />

            {/* Dashboard Admin (Hanya role Admin) */}
            <Route
              path="/admin/*"
              element={
                !isAuthenticated ? (
                  <Navigate to="/login" replace />
                ) : adminUser?.role?.toLowerCase() !== 'admin' ? (
                  <Navigate to="/" replace />
                ) : (
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center text-sm text-zinc-500">
                        Memuat dashboard…
                      </div>
                    }
                  >
                    <AdminApp />
                  </Suspense>
                )
              }
            />

            {/* Storefront Pengguna (Role Customer & User yang telah login) */}
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Navigate to="/login" replace />
                ) : (
                  <StorefrontApp />
                )
              }
            />

            {/* Fallback ke halaman login jika belum terautentikasi */}
            <Route
              path="*"
              element={<Navigate to={!isAuthenticated ? '/login' : '/'} replace />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Toast />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </StoreProvider>
  </React.StrictMode>,
)
