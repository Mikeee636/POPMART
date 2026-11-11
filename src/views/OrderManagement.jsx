import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  Filter,
  CreditCard,
  Truck,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { formatIDR } from '../utils/formatters';
import { OrderModal } from '../components/modals/OrderModal';

export const OrderManagement = () => {
  const { orders } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
      const matchPayment =
        paymentFilter === 'all' || o.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase());

      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const statusBadges = {
    completed: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold',
    shipped: 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-semibold',
    processing: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-semibold',
    pending: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700',
    cancelled: 'bg-zinc-100 text-zinc-400 line-through dark:bg-zinc-900'
  };

  const statusLabels = {
    completed: 'Selesai',
    shipped: 'Dikirim',
    processing: 'Diproses',
    pending: 'Menunggu',
    cancelled: 'Dibatalkan'
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white">
              Manajemen Pesanan & Transaksi
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Pantau status pesanan, verifikasi pembayaran, dan input resi pengiriman kurir
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Order ID (#ORD-...) atau Nama Pelanggan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="all">Semua Status Pesanan</option>
              <option value="pending">Menunggu Pembayaran</option>
              <option value="processing">Diproses (Gudang)</option>
              <option value="shipped">Dalam Pengiriman (Dikirim)</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <div>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="all">Semua Metode Pembayaran</option>
              <option value="bca">BCA Virtual Account</option>
              <option value="mandiri">Mandiri Virtual Account</option>
              <option value="qris">QRIS (Gopay/OVO)</option>
              <option value="gopay">GoPay</option>
              <option value="shopeepay">ShopeePay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50">
                <th className="py-3 px-4">No. Pesanan</th>
                <th className="py-3 px-4">Pelanggan</th>
                <th className="py-3 px-4">Rincian Barang</th>
                <th className="py-3 px-4">Total Tagihan</th>
                <th className="py-3 px-4">Pembayaran</th>
                <th className="py-3 px-4">Status Pesanan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    Tidak ada transaksi yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-950 dark:text-white">
                      {o.id}
                      <div className="text-[10px] text-zinc-400 font-sans mt-0.5">{o.orderDate}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-zinc-950 dark:text-white text-sm">
                        {o.customerName}
                      </div>
                      <div className="text-[11px] text-zinc-400">{o.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300 max-w-xs line-clamp-1">
                        {o.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        Kurir: {o.shippingCourier || 'JNE'} ({o.trackingNumber || 'Belum ada resi'})
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-black text-zinc-950 dark:text-white text-sm">
                      {formatIDR(o.grandTotal || o.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-medium">
                        <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{o.paymentMethod}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase">
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] ${
                          statusBadges[o.orderStatus] || 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        {statusLabels[o.orderStatus] || o.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenModal(o)}
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold text-xs transition"
                      >
                        Kelola
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Update Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};
