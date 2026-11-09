import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Menu,
  Sun,
  Moon
} from 'lucide-react';

export const Header = ({ onToggleSidebar }) => {
  const { theme, toggleTheme, activeTab } = useStore();

  const titleMap = {
    overview: 'Overview Dashboard & Analytics',
    products: 'Manajemen Katalog Produk',
    users: 'Manajemen Pengguna & Kolektor',
    orders: 'Manajemen Pesanan & Transaksi',
    masters: 'Master Kategori & Karakter IP'
  };

  return (
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

      {/* Right: Theme Toggle */}
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
      </div>
    </header>
  );
};
