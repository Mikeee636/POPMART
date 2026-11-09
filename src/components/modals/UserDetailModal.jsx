import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, Mail, Phone, MapPin, ShoppingBag, CreditCard, Award } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export const UserDetailModal = ({ isOpen, onClose, user }) => {
  const { orders } = useStore();

  if (!isOpen || !user) return null;

  const userOrders = orders.filter(
    (o) => o.userId === user.id || o.customerEmail === user.email
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl overflow-hidden modal-animate my-8">
        {/* Header with Minimalist Dark Cover */}
        <div className="relative h-28 bg-zinc-950 p-6 flex items-start justify-between border-b border-zinc-800">
          <div className="text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded-full">
              Profil Kolektor Pop Mart
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Info Summary */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-zinc-900 shadow-md"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-white leading-tight">
                    {user.name}
                  </h3>
                  {user.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                      <ShieldCheck className="w-3 h-3" /> Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full line-through">
                      Diblokir
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">ID: {user.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                {user.tier || 'Collector'}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 mb-6">
            <div>
              <div className="text-[10px] text-zinc-400 font-medium">Total Belanja</div>
              <div className="text-sm font-black text-zinc-950 dark:text-white mt-0.5">
                {formatIDR(user.totalSpent || 0)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 font-medium">Total Pesanan</div>
              <div className="text-sm font-black text-zinc-950 dark:text-white mt-0.5">
                {userOrders.length} Transaksi
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] text-zinc-400 font-medium">Terdaftar Sejak</div>
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">
                {user.registeredAt || '2025-01-01'}
              </div>
            </div>
          </div>

          {/* Contact & Shipping Info */}
          <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-5">
            <div className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
              <span>{user.phone || 'Nomor telepon belum diisi'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
              <span>{user.address || 'Belum ada alamat pengiriman tersimpan.'}</span>
            </div>
          </div>

          {/* Purchase History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs text-zinc-950 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                Riwayat Transaksi Pelanggan
              </h4>
              <span className="text-[11px] text-zinc-400">{userOrders.length} pesanan</span>
            </div>

            {userOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-400 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl">
                Pengguna ini belum pernah melakukan checkout pesanan.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-950 dark:text-white">
                          {order.id}
                        </span>
                        <span className="text-[10px] text-zinc-400">• {order.orderDate}</span>
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                        {order.items.map((i) => `${i.name} (${i.qty}x)`).join(', ')}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="font-black text-zinc-950 dark:text-white">
                        {formatIDR(order.grandTotal || order.totalAmount)}
                      </div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
