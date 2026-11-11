import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Sparkles,
  PanelLeft
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { activeTab, setActiveTab } = useStore();

  const navItems = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      label: 'Produk',
      icon: Package,
    },
    {
      id: 'users',
      label: 'Pengguna',
      icon: Users,
    },
    {
      id: 'orders',
      label: 'Pesanan',
      icon: ShoppingBag,
    },
    {
      id: 'masters',
      label: 'Kategori IP',
      icon: Sparkles,
    }
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div>
          {/* Header Section */}
          <div
            className={`h-20 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center transition-all ${
              isCollapsed ? 'justify-center px-2' : 'justify-between px-5'
            }`}
          >
            {/* Expanded State: Enlarged POP MART Logo + Collapse Button */}
            {!isCollapsed ? (
              <>
                <div className="flex items-center overflow-hidden">
                  <img
                    src="/popmart-logo.png"
                    alt="POP MART"
                    className="h-9 w-auto max-w-[155px] object-contain block"
                  />
                </div>

                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer"
                  title="Kecilkan Sidebar"
                  aria-label="Kecilkan Sidebar"
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
              </>
            ) : (
              /* Collapsed State: Square Pop Mart Logo that transforms into Expand Button on hover (Gemini style) */
              <button
                onClick={onToggleCollapse}
                className="relative group w-11 h-11 flex items-center justify-center rounded-xl p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 cursor-pointer select-none"
                title="Perbesar Sidebar"
                aria-label="Perbesar Sidebar"
              >
                {/* Default: Square POP MART Icon */}
                <img
                  src="/popmart-icon.png"
                  alt="POP MART"
                  className="w-10 h-10 rounded-xl object-contain shadow-sm transition-all duration-200 group-hover:opacity-0 group-hover:scale-90 block"
                />

                {/* Hover: PanelLeft icon button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700">
                  <PanelLeft className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                </div>
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  title={item.label}
                  className={`w-full rounded-xl transition-all group flex items-center ${
                    isCollapsed
                      ? 'justify-center p-3'
                      : 'px-3.5 py-2.5 gap-3'
                  } ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-semibold truncate tracking-tight">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
