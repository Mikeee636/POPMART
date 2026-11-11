import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

export const IpModal = ({ isOpen, onClose, initialData }) => {
  const { saveIP } = useStore();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    description: '',
    badgeColor: '#18181b',
    avatar: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        artist: initialData.artist || '',
        description: initialData.description || '',
        badgeColor: initialData.badgeColor || '#18181b',
        avatar: initialData.avatar || ''
      });
    } else {
      setFormData({
        name: '',
        artist: '',
        description: '',
        badgeColor: '#18181b',
        avatar: ''
      });
    }
    setIsDragging(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
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
    if (!formData.name.trim() || !formData.artist.trim()) {
      alert('Harap isi nama IP dan artist.');
      return;
    }

    saveIP({
      ...formData,
      avatar: formData.avatar || ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-lg overflow-hidden modal-animate my-8">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 dark:text-white text-base">
                {initialData ? 'Edit Kategori IP' : 'Tambah Kategori IP'}
              </h3>
              <p className="text-xs text-zinc-400">Informasi nama dan kreator karakter IP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Nama IP <span className="text-zinc-900 dark:text-white font-bold">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: SKULLPANDA atau HIRONO"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Artist <span className="text-zinc-900 dark:text-white font-bold">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Contoh: Xiongmao / Lang"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Warna Badge
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.badgeColor}
                  onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-700 p-0.5 bg-transparent"
                />
                <input
                  type="text"
                  value={formData.badgeColor}
                  onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Foto IP - Drag & Drop Upload */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Foto IP
            </label>

            {formData.avatar ? (
              <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 shadow-sm"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">Foto berhasil dipilih</p>
                    <p className="text-[11px] text-zinc-400">Siap disimpan untuk IP ini</p>
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
                    onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
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
                className={`group cursor-pointer rounded-2xl border-2 border-dashed py-7 px-6 flex items-center justify-center gap-3.5 transition-all duration-200 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/10 dark:bg-blue-950/20'
                    : 'border-zinc-300 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60 hover:border-zinc-400 dark:hover:border-zinc-700'
                }`}
              >
                <div className="relative w-10 h-8 flex-shrink-0">
                  <div className="absolute left-0 bottom-0 w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 shadow-sm" />
                  <div className="absolute right-0 top-0 w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center shadow-md">
                    <ImageIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

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

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Deskripsi
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ceritakan kisah singkat atau ciri khas karakter ini..."
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition resize-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition"
            >
              Simpan Kategori IP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
