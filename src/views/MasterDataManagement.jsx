import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { IpModal } from '../components/modals/IpModal';

export const MasterDataManagement = () => {
  const { ips, deleteIP, products } = useStore();

  // Modals state
  const [isIpModalOpen, setIsIpModalOpen] = useState(false);
  const [selectedIpForEdit, setSelectedIpForEdit] = useState(null);

  const handleOpenAddIp = () => {
    setSelectedIpForEdit(null);
    setIsIpModalOpen(true);
  };

  const handleOpenEditIp = (ip) => {
    setSelectedIpForEdit(ip);
    setIsIpModalOpen(true);
  };

  const handleDeleteIp = (ip) => {
    if (window.confirm(`Yakin ingin menghapus Kategori IP "${ip.name}"?`)) {
      deleteIP(ip.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white">
              Master Kategori IP
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Kelola data Kategori IP Pop Mart (SKULLPANDA & HIRONO)
          </p>
        </div>

        <button
          onClick={handleOpenAddIp}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori IP</span>
        </button>
      </div>

      {/* Grid Kategori IP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {ips.map((ip) => {
          const linkedProductsCount = products.filter((p) => p.ipId === ip.id).length;

          return (
            <div
              key={ip.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  {ip.avatar ? (
                    <img
                      src={ip.avatar}
                      alt={ip.name}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }
                      }}
                      className="w-14 h-14 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm flex-shrink-0"
                    />
                  ) : null}
                  <div
                    style={{ display: ip.avatar ? 'none' : 'flex' }}
                    className="w-14 h-14 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-zinc-200 dark:border-zinc-700 items-center justify-center font-black text-xl flex-shrink-0 shadow-sm uppercase select-none"
                  >
                    {ip.name?.trim().charAt(0) || 'K'}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-zinc-950 dark:text-white text-base truncate">
                      {ip.name}
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Artist: {ip.artist}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-mono text-zinc-400">{ip.id}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {ip.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-[11px] border border-zinc-200 dark:border-zinc-800">
                  {linkedProductsCount} Produk Terdaftar
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditIp(ip)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                    title="Edit Kategori IP"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteIp(ip)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                    title="Hapus Kategori IP"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* IP Modal */}
      <IpModal
        isOpen={isIpModalOpen}
        onClose={() => setIsIpModalOpen(false)}
        initialData={selectedIpForEdit}
      />
    </div>
  );
};
