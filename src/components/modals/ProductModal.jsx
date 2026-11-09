import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';


export const ProductModal = ({ isOpen, onClose, initialData }) => {
  const { ips, saveProduct } = useStore();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    ipId: '',
    price: '',
    stock: '',
    editionType: 'Blind Box Regular',
    status: 'active',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        sku: initialData.sku || '',
        ipId: initialData.ipId || (ips[0]?.id || ''),
        price: initialData.price || '',
        stock: initialData.stock !== undefined ? initialData.stock : '',
        editionType: initialData.editionType || 'Blind Box Regular',
        status: initialData.status || 'active',
        image: initialData.image || '',
        description: initialData.description || ''
      });
    } else {
      setFormData({
        name: '',
        sku: 'PM-' + Math.floor(1000 + Math.random() * 9000),
        ipId: ips[0]?.id || '',
        price: '',
        stock: '',
        editionType: 'Blind Box Regular',
        status: 'active',
        image: '',
        description: ''
      });
    }
    setIsDragging(false);
  }, [initialData, isOpen, ips]);

  if (!isOpen) return null;

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || formData.stock === '') {
      alert('Harap lengkapi semua bidang yang wajib diisi.');
      return;
    }

    saveProduct({
      ...formData,
      image: formData.image || '',
      price: parseInt(formData.price, 10) || 0,
      stock: parseInt(formData.stock, 10) || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-2xl overflow-hidden modal-animate my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 dark:text-white text-base">
                {initialData ? 'Edit Produk' : 'Tambah Produk'}
              </h3>
              <p className="text-xs text-zinc-400">Informasi produk dan stok</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Nama Produk */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Nama Produk <span className="text-zinc-900 dark:text-white font-bold">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: SKULLPANDA The Mirage Series Handbag"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
            />
          </div>

          {/* SKU & Edisi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                SKU <span className="text-zinc-900 dark:text-white font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="PM-SKP-01"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Edisi
              </label>
              <select
                value={formData.editionType}
                onChange={(e) => setFormData({ ...formData, editionType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
              >
                <option value="Blind Box Regular">Blind Box Regular</option>
                <option value="Mega Collection 400%">Mega Collection 400%</option>
                <option value="Mega Collection 1000%">Mega Collection 1000%</option>
                <option value="Special Edition / Rare">Special Edition / Rare</option>
                <option value="Accessories">Accessories / Display</option>
                <option value="Action Figure">Action Figure</option>
              </select>
            </div>
          </div>

          {/* Kategori IP */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Kategori IP <span className="text-zinc-900 dark:text-white font-bold">*</span>
            </label>
            <select
              value={formData.ipId}
              onChange={(e) => setFormData({ ...formData, ipId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
            >
              {ips.map((ip) => (
                <option key={ip.id} value={ip.id}>
                  {ip.name} (by {ip.artist})
                </option>
              ))}
            </select>
          </div>

          {/* Harga, Stok, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Harga (Rp) <span className="text-zinc-900 dark:text-white font-bold">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="249000"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Stok (pcs) <span className="text-zinc-900 dark:text-white font-bold">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="40"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
              >
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
                <option value="out_of_stock">Stok Habis</option>
              </select>
            </div>
          </div>

          {/* Foto Produk - Drag & Drop / File Upload */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Foto Produk
            </label>

            {formData.image ? (
              <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Foto berhasil dipilih</p>
                    <p className="text-[11px] text-zinc-400">Siap disimpan bersama produk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white transition"
                  >
                    Ganti
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) processFile(file);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`group cursor-pointer rounded-2xl border-2 border-dashed py-8 px-6 flex items-center justify-center gap-3.5 transition-all duration-200 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/10 dark:bg-blue-950/20'
                    : 'border-zinc-300 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 hover:border-zinc-400 dark:hover:border-zinc-700'
                }`}
              >
                {/* Overlapping Image Cards Icon */}
                <div className="relative w-10 h-8 flex-shrink-0">
                  <div className="absolute left-0 bottom-0 w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 shadow-sm" />
                  <div className="absolute right-0 top-0 w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center shadow-md">
                    <ImageIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Text exactly matching the reference */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium select-none">
                  Drag an image here or{' '}
                  <span className="text-blue-500 dark:text-blue-400 underline font-semibold hover:text-blue-600 dark:hover:text-blue-300">
                    upload a file
                  </span>
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Deskripsi
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tuliskan keterangan detail produk..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition"
            >
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
