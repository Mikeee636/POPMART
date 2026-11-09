import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Receipt, Truck, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export const OrderModal = ({ isOpen, onClose, order }) => {
  const { updateOrderStatus } = useStore();

  const [status, setStatus] = useState('processing');
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus || 'processing');
      setTrackingNumber(order.trackingNumber && order.trackingNumber !== '-' ? order.trackingNumber : '');
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateOrderStatus(order.id, status, trackingNumber);
    onClose();
  };

  const statusBadges = {
    completed: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900',
    shipped: 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
    processing: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700',
    pending: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700',
    cancelled: 'bg-zinc-100 text-zinc-400 line-through dark:bg-zinc-900'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl overflow-hidden modal-animate my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-zinc-950 dark:text-white text-base">
                  Faktur Pesanan #{order.id}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusBadges[order.orderStatus]}`}>
                  {order.orderStatus}
                </span>
              </div>
              <p className="text-xs text-zinc-400">{order.orderDate} • {order.paymentMethod}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Customer & Courier summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs">
            <div>
              <div className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                Informasi Pelanggan
              </div>
              <div className="font-bold text-zinc-950 dark:text-white text-sm">{order.customerName}</div>
              <div className="text-zinc-500 dark:text-zinc-400">{order.customerEmail}</div>
              {order.notes && (
                <div className="mt-2 text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 p-2 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <span className="font-semibold text-zinc-900 dark:text-white">Catatan: </span>
                  {order.notes}
                </div>
              )}
            </div>

            <div>
              <div className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                Pengiriman & Logistik
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                <Truck className="w-4 h-4 text-zinc-900 dark:text-white" />
                <span>{order.shippingCourier || 'JNE Express'}</span>
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 mt-1">
                No. Resi: <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">{order.trackingNumber || 'Belum ada resi'}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                <CreditCard className="w-4 h-4 text-zinc-400" />
                <span>{order.paymentMethod} ({order.paymentStatus === 'paid' ? 'Lunas' : 'Menunggu Bayar'})</span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Daftar Barang yang Dipesan
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 border-y border-zinc-100 dark:border-zinc-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-zinc-950 dark:text-white">{item.name}</div>
                    <div className="text-[11px] text-zinc-400">{item.qty} pcs x {formatIDR(item.price)}</div>
                  </div>
                  <div className="font-black text-zinc-950 dark:text-white">
                    {formatIDR(item.qty * item.price)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatIDR(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengiriman</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatIDR(order.shippingFee || 0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-sm font-black text-zinc-950 dark:text-white">
                <span>Total Akhir</span>
                <span>{formatIDR(order.grandTotal || order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Quick Status Update Form */}
          <form onSubmit={handleUpdate} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="font-bold text-xs text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white" />
              Kelola & Perbarui Status Transaksi
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                  Ubah Status Pesanan
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                >
                  <option value="pending">Menunggu Pembayaran</option>
                  <option value="processing">Diproses (Gudang)</option>
                  <option value="shipped">Dikirim ke Kurir</option>
                  <option value="completed">Selesai (Diterima Pembeli)</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                  Nomor Resi Pengiriman
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Contoh: JNE89201928371"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition"
              >
                Simpan Status Baru
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
