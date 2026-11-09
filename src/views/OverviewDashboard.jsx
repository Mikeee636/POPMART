import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';
import { formatIDR, formatNumber } from '../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SALES_TREND_DATA } from '../data/mockData';
import { OrderModal } from '../components/modals/OrderModal';

const MONO_SHADES = ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#d4d4d8', '#52525b'];

export const OverviewDashboard = () => {
  const { analytics, orders, products, ips, updateStock, setActiveTab, theme } = useStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Status mapping - Monochrome Minimalist
  const statusBadges = {
    completed: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold',
    shipped: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
    processing: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700',
    pending: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700',
    cancelled: 'bg-zinc-100 text-zinc-400 line-through dark:bg-zinc-900'
  };

  const statusLabels = {
    completed: 'Selesai',
    shipped: 'Dikirim',
    processing: 'Diproses',
    pending: 'Menunggu',
    cancelled: 'Batal'
  };

  const kpis = [
    {
      label: 'Total Pendapatan',
      value: formatIDR(analytics.totalRevenue),
      growth: '+18.4% bln ini',
      icon: TrendingUp
    },
    {
      label: 'Total Pesanan Masuk',
      value: `${analytics.totalOrders} Transaksi`,
      growth: `${analytics.completedOrders} Selesai • ${analytics.pendingOrders} Proses`,
      icon: ShoppingBag
    },
    {
      label: 'Total Kolektor Terdaftar',
      value: `${analytics.activeUsers} Pengguna`,
      growth: '3 Member Platinum',
      icon: Users
    }
  ];

  const recentOrders = orders.slice(0, 5);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const isDark = theme === 'dark';
  const chartStroke = isDark ? '#ffffff' : '#18181b';

  return (
    <div className="space-y-6">
      {/* Welcome Banner - Minimalist Luxury Black & White */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white p-6 sm:p-8 border border-zinc-800 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            Hi Michael!
          </h2>
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Selamat datang kembali! Pantau arus transaksi hari ini dan pastikan data katalog produk selalu diperbarui
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('products')}
              className="px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition shadow-sm"
            >
              Kelola Katalog Produk
            </button>
          </div>
        </div>

        {/* Minimal geometric backdrop watermark */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none text-9xl font-black tracking-tighter hidden md:block">
          POPMART
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {kpi.label}
                </span>
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                {kpi.value}
              </div>
              <div className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                <span>{kpi.growth}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-extrabold text-base text-zinc-950 dark:text-white">
                Tren Pendapatan & Penjualan
              </h3>
              <p className="text-xs text-zinc-400">Performa transaksi bulanan tahun 2026</p>
            </div>
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto border border-zinc-200 dark:border-zinc-800">
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm">
                12 Bulan
              </span>
              <span className="px-2.5 py-1 text-zinc-500 dark:text-zinc-400">
                Mingguan
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="popMonoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartStroke} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={chartStroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} unit="M" />
                <Tooltip
                  formatter={(val) => [`Rp ${val} Juta`, 'Pendapatan']}
                  contentStyle={{
                    backgroundColor: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={chartStroke}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#popMonoGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IP Distribution Pie/Donut (1 Column) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-zinc-950 dark:text-white">
              Pangsa Karakter IP
            </h3>
            <p className="text-xs text-zinc-400">Distribusi unit blind box terjual per karakter</p>
          </div>

          <div className="h-56 w-full my-auto flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.ipSales.slice(0, 5)}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {analytics.ipSales.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MONO_SHADES[index % MONO_SHADES.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} pcs`, name]}
                  contentStyle={{
                    backgroundColor: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            {analytics.ipSales.slice(0, 4).map((ip, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: MONO_SHADES[idx % MONO_SHADES.length] }}
                ></span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{ip.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Row: Recent Orders & Alerts Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-zinc-950 dark:text-white">
                Pesanan & Transaksi Terbaru
              </h3>
              <p className="text-xs text-zinc-400">5 transaksi pesanan paling terkini</p>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs font-bold text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Pelanggan</th>
                  <th className="py-2.5 px-3">Total Belanja</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition">
                    <td className="py-3 px-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {o.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-zinc-900 dark:text-white">{o.customerName}</div>
                      <div className="text-[11px] text-zinc-400">{o.orderDate}</div>
                    </td>
                    <td className="py-3 px-3 font-extrabold text-zinc-900 dark:text-white">
                      {formatIDR(o.grandTotal || o.totalAmount)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${statusBadges[o.orderStatus]}`}>
                        {statusLabels[o.orderStatus] || o.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleOpenOrder(o)}
                        className="px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold text-[11px] transition"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts & IP Leaderboard (1 col) */}
        <div className="space-y-6">
          {/* Low Stock Alert Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-zinc-950 dark:text-white">
                Peringatan Stok Rendah (≤ 10)
              </h4>
            </div>

            {analytics.lowStockProducts.length === 0 ? (
              <p className="text-xs text-zinc-400 py-3">Semua produk memiliki persediaan stok aman.</p>
            ) : (
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {analytics.lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-9 h-9 rounded-lg object-cover border border-zinc-300 dark:border-zinc-700 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-black text-xs flex-shrink-0 shadow-sm uppercase select-none">
                          {p.name?.trim().charAt(0) || 'P'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-zinc-900 dark:text-white truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                          Sisa {p.stock} unit
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const add = prompt(`Tambah stok untuk ${p.name}:`, '20');
                        if (add) updateStock(p.id, p.stock + parseInt(add, 10));
                      }}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm hover:bg-black transition flex-shrink-0"
                    >
                      + Tambah
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Selling IP Leaderboard */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h4 className="font-bold text-sm text-zinc-950 dark:text-white mb-3">
              Karakter IP Terlaris
            </h4>
            <div className="space-y-3">
              {analytics.ipSales.slice(0, 4).map((ip, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-800 dark:text-zinc-200">
                      #{idx + 1} {ip.name}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">{ip.count} pcs</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                      style={{
                        width: `${Math.min(100, (ip.count / 250) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};
