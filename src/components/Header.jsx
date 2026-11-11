import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Menu,
  Sun,
  Moon,
  User,
  LogOut
} from 'lucide-react';
import {
  EditProfileModal,
  LogoutConfirmModal
} from './modals/ProfileModal';

export const Header = ({ onToggleSidebar }) => {
  const { theme, toggleTheme, activeTab, adminUser } = useStore();

  // Dropdown & Modal states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const titleMap = {
    overview: 'Overview Dashboard & Analytics',
    products: 'Manajemen Katalog Produk',
    users: 'Manajemen Pengguna',
    orders: 'Manajemen Pesanan & Transaksi',
    masters: 'Master Kategori & Karakter IP'
  };

  const initialLetter = adminUser?.name?.trim().charAt(0).toUpperCase() || 'M';

  return (
    <>
      <header className="sticky top-0 z-30 h-20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {titleMap[activeTab] || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right: Theme Toggle & Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition border border-transparent hover:border-zinc-200 dark:border-zinc-800"
            aria-label="Ganti Tema"
            title={theme === 'dark' ? 'Ganti ke Tema Terang' : 'Ganti ke Tema Gelap'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-zinc-200" />
            ) : (
              <Moon className="w-5 h-5 text-zinc-800" />
            )}
          </button>

          {/* Profile Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(prev => !prev)}
              className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition border border-transparent hover:border-zinc-200 dark:border-zinc-800 cursor-pointer flex items-center justify-center"
              aria-label="Menu Profil Admin"
              title="Menu Profil Admin"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Profile Card Header */}
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white flex-shrink-0 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-zinc-950 dark:text-white truncate">
                      {adminUser?.name || 'Michael'}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {adminUser?.email || 'michael@popmart.co.id'}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      {adminUser?.role || 'Admin'}
                    </span>
                  </div>
                </div>

                {/* Options List */}
                <div className="p-1.5 space-y-0.5">
                  {/* Opsi Edit Profil */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsEditModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-left cursor-pointer"
                  >
                    <User className="w-4 h-4 text-zinc-500" />
                    <span>Edit Profil</span>
                  </button>
                </div>

                {/* Logout Button */}
                <div className="p-1.5 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};
