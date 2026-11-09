import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Package,
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Edit3,
  Trash2,
  Layers,
  Download,
  AlertCircle,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { formatIDR } from '../utils/formatters';
import { ProductModal } from '../components/modals/ProductModal';

export const ProductManagement = () => {
  const { products, ips, deleteProduct, updateStock, showToast } = useStore();

  // Search, Filter, Sort state
  const [search, setSearch] = useState('');
  const [selectedIp, setSelectedIp] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProductData, setModalProductData] = useState(null);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products
      .filter(Boolean)
      .filter((p) => {
        const pName = p.name || '';
        const pSku = p.sku || '';
        const matchSearch =
          pName.toLowerCase().includes((search || '').toLowerCase()) ||
          pSku.toLowerCase().includes((search || '').toLowerCase());
        const matchIp = selectedIp === 'all' || p.ipId === selectedIp;

        let matchStock = true;
        if (selectedStockStatus === 'in_stock') matchStock = (p.stock || 0) > 10;
        else if (selectedStockStatus === 'low_stock') matchStock = (p.stock || 0) > 0 && (p.stock || 0) <= 10;
        else if (selectedStockStatus === 'out_of_stock') matchStock = (p.stock || 0) === 0;

        return matchSearch && matchIp && matchStock;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.id || '').localeCompare(a.id || '');
        if (sortBy === 'price_high') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'price_low') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'stock_high') return (b.stock || 0) - (a.stock || 0);
        if (sortBy === 'best_seller') return (b.sold || 0) - (a.sold || 0);
        return 0;
      });
  }, [products, search, selectedIp, selectedStockStatus, sortBy]);

  const handleOpenAddModal = () => {
    setModalProductData(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalProductData(product);
    setIsModalOpen(true);
  };

  const handleQuickStock = (product) => {
    const promptVal = prompt(`Ubah jumlah persediaan stok untuk "${product.name}":`, product.stock);
    if (promptVal !== null) {
      const val = parseInt(promptVal, 10);
      if (!isNaN(val) && val >= 0) {
        updateStock(product.id, val);
      } else {
        showToast('Jumlah stok harus berupa angka positif!', 'error');
      }
    }
  };

  const handleDelete = (product) => {
    if (window.confirm(`Yakin ingin menghapus produk "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'SKU', 'Nama Produk', 'Kategori IP', 'Harga', 'Stok', 'Terjual', 'Status'];
    const rows = filteredProducts.map((p) => [
      p.id,
      p.sku,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.ipName}"`,
      p.price,
      p.stock,
      p.sold || 0,
      p.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `popmart_katalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Katalog produk berhasil diekspor ke CSV!');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar with Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              <Package className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white">
              Manajemen Katalog Produk
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Total {products.length} seri Blind Box & figure terdaftar di etalase
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition shadow-sm"
          >
            <Download className="w-4 h-4 text-zinc-500" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama produk atau SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white"
            />
          </div>

          {/* Filter Kategori IP */}
          <div className="md:col-span-3">
            <select
              value={selectedIp}
              onChange={(e) => setSelectedIp(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="all">Semua Kategori IP</option>
              {ips.map((ip) => (
                <option key={ip.id} value={ip.id}>
                  {ip.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Stok */}
          <div className="md:col-span-2">
            <select
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="all">Semua Status Stok</option>
              <option value="in_stock">Stok Aman (&gt;10)</option>
              <option value="low_stock">Stok Menipis (≤10)</option>
              <option value="out_of_stock">Stok Habis (0)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="newest">Terbaru</option>
              <option value="best_seller">Terlaris (Sold)</option>
              <option value="price_high">Harga Tertinggi</option>
              <option value="price_low">Harga Terendah</option>
              <option value="stock_high">Stok Terbanyak</option>
            </select>
          </div>
        </div>

        {/* View Toggle Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          <span className="font-semibold text-zinc-500 dark:text-zinc-400">
            Menampilkan <strong className="text-zinc-900 dark:text-white">{filteredProducts.length}</strong> dari {products.length} produk
          </span>

          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
              title="Tampilan Tabel"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
              title="Tampilan Grid Card"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Content */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Tidak ada produk yang cocok dengan kata kunci atau filter yang dipilih.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50">
                  <th className="py-3 px-4">Info Produk & SKU</th>
                  <th className="py-3 px-4">Kategori IP</th>
                  <th className="py-3 px-4">Harga Jual</th>
                  <th className="py-3 px-4">Stok Gudang</th>
                  <th className="py-3 px-4">Terjual</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
                {filteredProducts.map((p) => {
                  let stockBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                      {p.stock} pcs
                    </span>
                  );
                  if (p.stock === 0) {
                    stockBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                        Habis (0)
                      </span>
                    );
                  } else if (p.stock <= 10) {
                    stockBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                        Menipis ({p.stock})
                      </span>
                    );
                  }

                  return (
                    <tr key={p.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-11 h-11 rounded-lg object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm flex-shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm uppercase select-none">
                              {p.name?.trim().charAt(0) || 'P'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-zinc-950 dark:text-white text-sm line-clamp-1">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                              {p.sku} • {p.editionType}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white"></span>
                          {p.ipName}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-zinc-950 dark:text-white text-sm">
                        {formatIDR(p.price)}
                      </td>
                      <td className="py-3 px-4">{stockBadge}</td>
                      <td className="py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                        {p.sold || 0} pcs
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            p.status === 'active' ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700'
                          }`}
                          title={p.status}
                        ></span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleQuickStock(p)}
                            title="Ubah Stok Cepat"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                          >
                            <Layers className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Produk"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            title="Hapus Produk"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex items-center justify-center">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-black text-6xl group-hover:scale-105 transition-transform duration-300 select-none uppercase">
                    {p.name?.trim().charAt(0) || 'P'}
                  </div>
                )}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-950/80 backdrop-blur text-white">
                  {p.ipName}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur text-zinc-950 dark:bg-black/90 dark:text-white">
                  Stok: {p.stock} unit
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400 font-mono">{p.sku}</div>
                  <h4 className="font-extrabold text-xs text-zinc-900 dark:text-white line-clamp-2 mt-0.5">
                    {p.name}
                  </h4>
                  <div className="text-[11px] text-zinc-400 mt-1">{p.editionType}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-400">Harga Satuan</div>
                    <div className="font-black text-sm text-zinc-950 dark:text-white">
                      {formatIDR(p.price)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleQuickStock(p)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                      title="Ubah Stok"
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Add/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalProductData}
      />
    </div>
  );
};
