import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Plus, Trash2, User, CreditCard, Truck } from 'lucide-react';
import { formatIDR } from '../../utils/formatters';

export const CreateOrderModal = ({ isOpen, onClose }) => {
  const { users, products, createOrder, showToast } = useStore();

  const [selectedUserId, setSelectedUserId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('BCA Virtual Account');
  const [shippingCourier, setShippingCourier] = useState('JNE Express');
  const [shippingFee, setShippingFee] = useState(25000);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (!selectedProductId) return;
    const prod = products.find(p => p.id === selectedProductId);
    if (!prod) return;

    if (prod.stock <= 0) {
      showToast('Stok produk ini sedang habis!', 'error');
      return;
    }

    const qty = Math.min(prod.stock, parseInt(selectedQty, 10) || 1);

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.productId === prod.id);
      if (existingIdx !== -1) {
        const updated = [...prev];
        const newQty = Math.min(prod.stock, updated[existingIdx].qty + qty);
        updated[existingIdx].qty = newQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: prod.id,
            name: prod.name,
            price: prod.price,
            qty: qty,
            image: prod.image,
            maxStock: prod.stock
          }
        ];
      }
    });

    setSelectedProductId('');
    setSelectedQty(1);
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(i => i.productId !== productId));
  };

  const handleQtyChange = (productId, newQty) => {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) return;
    setCartItems(prev =>
      prev.map(i => {
        if (i.productId === productId) {
          return { ...i, qty: Math.min(i.maxStock, qty) };
        }
        return i;
      })
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const grandTotal = subtotal + (parseInt(shippingFee, 10) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showToast('Tambahkan minimal 1 produk ke keranjang belanja!', 'warning');
      return;
    }

    let customerName = guestName.trim();
    let customerEmail = guestEmail.trim();

    if (selectedUserId) {
      const u = users.find(user => user.id === selectedUserId);
      if (u) {
        customerName = u.name;
        customerEmail = u.email;
      }
    }

    if (!customerName) {
      showToast('Pilih pelanggan terdaftar atau isi nama pembeli!', 'warning');
      return;
    }

    const orderPayload = {
      userId: selectedUserId || null,
      customerName,
      customerEmail: customerEmail || 'guest@popmart.id',
      items: cartItems.map(i => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        qty: i.qty
      })),
      totalAmount: subtotal,
      shippingFee: parseInt(shippingFee, 10) || 0,
      grandTotal,
      paymentMethod,
      paymentStatus: 'paid',
      orderStatus: 'processing',
      shippingCourier,
      trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000),
      notes
    };

    createOrder(orderPayload);
    setCartItems([]);
    setSelectedUserId('');
    setGuestName('');
    setGuestEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-3xl overflow-hidden modal-animate my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-950 dark:text-white text-base">
                Buat Transaksi / Pesanan Baru
              </h3>
              <p className="text-xs text-zinc-400">Simulasikan pesanan, otomatis kurangi stok & perbarui analitik</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Customer Selection */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              <User className="w-4 h-4 text-zinc-900 dark:text-white" />
              Pilih Pembeli / Pelanggan
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  Kolektor Terdaftar (Opsional)
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => {
                    setSelectedUserId(e.target.value);
                    if (e.target.value) {
                      const found = users.find(u => u.id === e.target.value);
                      if (found) {
                        setGuestName(found.name);
                        setGuestEmail(found.email);
                      }
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                >
                  <option value="">-- Pembeli Tamu / Walk-in Guest --</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.tier || u.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  Nama Pelanggan <span className="text-zinc-900 dark:text-white font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                />
              </div>
            </div>
          </div>

          {/* Add Product to Cart */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Pilih Produk
              </label>
              <span className="text-[11px] text-zinc-400">Pilih dari katalog aktif</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              >
                <option value="">-- Pilih Seri Blind Box / Produk --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                    {p.name} — {formatIDR(p.price)} ({p.stock > 0 ? `Sisa: ${p.stock}` : 'HABIS'})
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(e.target.value)}
                  className="w-20 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold text-center"
                />
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white text-xs font-bold flex items-center gap-1.5 transition flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambahkan</span>
                </button>
              </div>
            </div>

            {/* Cart Table */}
            {cartItems.length > 0 && (
              <div className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
                {cartItems.map((item) => (
                  <div key={item.productId} className="p-3 flex items-center justify-between text-xs bg-zinc-50/50 dark:bg-zinc-800/40">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-black text-xs flex-shrink-0 uppercase select-none">
                          {item.name?.trim().charAt(0) || 'P'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-zinc-900 dark:text-white truncate">{item.name}</div>
                        <div className="text-zinc-400">{formatIDR(item.price)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-zinc-400 text-[11px]">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          max={item.maxStock}
                          value={item.qty}
                          onChange={(e) => handleQtyChange(item.productId, e.target.value)}
                          className="w-14 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-center font-bold text-xs"
                        />
                      </div>
                      <div className="font-black text-zinc-950 dark:text-white w-24 text-right">
                        {formatIDR(item.price * item.qty)}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.productId)}
                        className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Metode Pembayaran
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              >
                <option value="BCA Virtual Account">BCA Virtual Account</option>
                <option value="Mandiri Virtual Account">Mandiri Virtual Account</option>
                <option value="QRIS Gopay/OVO">QRIS (Gopay / OVO)</option>
                <option value="GoPay">GoPay</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="Tunai / Cash (Store POS)">Tunai / Cash (Store POS)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Kurir & Ongkir
              </label>
              <div className="flex gap-2">
                <select
                  value={shippingCourier}
                  onChange={(e) => setShippingCourier(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                >
                  <option value="JNE Express">JNE Express</option>
                  <option value="SiCepat BEST">SiCepat BEST</option>
                  <option value="J&T Express">J&T Express</option>
                  <option value="Ambil di Toko (Pickup)">Ambil di Toko (Pickup)</option>
                </select>
                <input
                  type="number"
                  min="0"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(e.target.value)}
                  placeholder="25000"
                  className="w-24 px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold text-right"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Catatan Pesanan
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Packing bubble tebal, pembeli ingin plastik segel utuh"
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs"
            />
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Subtotal Barang:</span>
              <span className="font-bold text-zinc-950 dark:text-white">{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Ongkos Kirim:</span>
              <span className="font-bold text-zinc-950 dark:text-white">{formatIDR(parseInt(shippingFee, 10) || 0)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-zinc-950 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-700">
              <span>Total Pembayaran:</span>
              <span className="text-base">{formatIDR(grandTotal)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
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
              Simpan & Proses Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
