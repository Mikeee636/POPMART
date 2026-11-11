import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { BackHeader, BottomNav, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import { Badge, Button, Chip, Divider, Thumb } from '../components/ui'
import { ORDERS as DEFAULT_ORDERS, ORDER_TABS, PRODUCTS, SHIPPING } from '../data/catalog'
import { rp } from '../utils/format'

export default function Orders({ params }) {
  const { nav, notify, addToCart } = useShop()
  const currentTab = params?.tab || 'unpaid'

  // Local state for orders so actions like cancel, confirm receipt, and reviews persist in session
  const [ordersState, setOrdersState] = useState(DEFAULT_ORDERS)
  const [trackingModal, setTrackingModal] = useState(null)
  const [reviewModal, setReviewModal] = useState(null)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  const orders = ordersState[currentTab] || []

  const handleAction = (kind, label, target, order) => {
    if (label === 'BATALKAN') {
      // Remove from unpaid orders
      setOrdersState((prev) => ({
        ...prev,
        unpaid: prev.unpaid.filter((o) => o.no !== order.no),
      }))
      notify(`Pesanan ${order.no} berhasil dibatalkan.`)
      return
    }

    if (label === 'BAYAR') {
      nav.go('checkout')
      return
    }

    if (label === 'HUBUNGI CS') {
      window.open('https://wa.me/628111621312', '_blank')
      return
    }

    if (label === 'LACAK') {
      setTrackingModal({
        orderNo: order.no,
        resi: 'JX0012345678',
        courier: 'LOCAL EXPRESS',
        events: [
          { time: '06 Nov 10:15 WIB', desc: 'Paket sedang dibawa kurir menuju alamat tujuan.' },
          { time: '05 Nov 19:40 WIB', desc: 'Paket tiba di sorting hub Jakarta Selatan.' },
          { time: '05 Nov 08:30 WIB', desc: 'Pesanan telah dipickup oleh kurir dari Gudang Pusat Cakung.' },
          { time: '04 Nov 14:00 WIB', desc: 'Pesanan telah diproses dan dikemas rapi.' },
        ],
      })
      return
    }

    if (label === 'DITERIMA') {
      // Move from shipped to done
      const completedOrder = {
        ...order,
        badge: ['Selesai', 'soft'],
        note: ['checkCircle', 'Diterima hari ini'],
        actions: [['secondary', 'BERI ULASAN', null], ['primary', 'BELI LAGI', 'list']],
      }
      setOrdersState((prev) => ({
        ...prev,
        shipped: prev.shipped.filter((o) => o.no !== order.no),
        done: [completedOrder, ...(prev.done || [])],
      }))
      notify(`Pesanan ${order.no} telah dikonfirmasi diterima!`)
      nav.swap('orders', { tab: 'done' })
      return
    }

    if (label === 'BERI ULASAN') {
      setReviewModal(order)
      return
    }

    if (label === 'BELI LAGI') {
      // Add items from this order to cart
      order.items.forEach(([key, , q]) => {
        const prod = PRODUCTS[key]
        if (prod?.cart) {
          for (let i = 0; i < q; i++) addToCart(prod.cart)
        }
      })
      notify('Produk berhasil ditambahkan ke tas!')
      nav.go('cart')
      return
    }

    if (target) {
      nav.go(target === 'list' ? 'list' : target)
    } else {
      notify(`Aksi ${label} berhasil diproses.`)
    }
  }

  const submitReview = () => {
    notify(`Terima kasih! Ulasan bintang ${reviewRating} berhasil dikirim.`)
    setReviewModal(null)
    setReviewComment('')
  }

  const tabs = (cls) => (
    <div className={`flex gap-2 px-4 overflow-x-auto no-scrollbar ${cls}`}>
      {ORDER_TABS.map(([k, label]) => (
        <Chip
          key={k}
          active={k === currentTab}
          onClick={() => k !== currentTab && nav.swap('orders', { tab: k })}
        >
          {label}
        </Chip>
      ))}
    </div>
  )

  return (
    <Screen
      narrow
      header={<BackHeader title="Pesanan Saya">{tabs('pt-1 pb-3 lg:hidden')}</BackHeader>}
      bottom={<BottomNav active="orders" />}
    >
      <h1 className="hidden lg:block t-display px-4 pt-4">Pesanan Saya</h1>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-8">
        <div className="hidden lg:flex -mx-4">{tabs('pb-1')}</div>
        <span className="t-caption text-muted font-medium">{orders.length} pesanan</span>

        {orders.map((order) => {
          const count = order.items.reduce((n, [, , q]) => n + q, 0)
          const total = order.items.reduce((n, [k, , q]) => n + (PRODUCTS[k]?.price || 0) * q, 0) + SHIPPING

          return (
            <article key={order.no} className="flex flex-col gap-3.5 p-4 rounded-xl border border-line bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="t-strong">{order.no}</span>
                  <span className="t-caption text-muted">{order.date}</span>
                </div>
                <Badge kind={order.badge[1]}>{order.badge[0]}</Badge>
              </div>
              <Divider />

              {order.items.map(([key, variant, qty]) => {
                const p = PRODUCTS[key] || PRODUCTS.hrn_2 || Object.values(PRODUCTS)[0]
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => nav.go('detail', { id: p.id })}
                    className="flex items-center gap-3 text-left hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    <Thumb product={p} className="w-16 h-16 rounded-[10px] shrink-0" />
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <span className="t-strong line-clamp-2">{p.name}</span>
                      <span className="t-caption text-muted">{variant} · {qty} × {rp(p.price)}</span>
                    </div>
                  </button>
                )
              })}

              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface">
                <Icon name={order.note[0]} size={18} color="#3A3A3A" />
                <span className="t-caption text-ink2 flex-1">{order.note[1]}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="t-caption text-ink2">Total ({count} produk, termasuk ongkir)</span>
                <span className="t-price">{rp(total)}</span>
              </div>

              <div className="flex gap-2.5 pt-1">
                {order.actions.map(([kind, label, target]) => (
                  <Button
                    key={label}
                    kind={kind}
                    className="flex-1 px-2 h-11 text-xs sm:text-sm font-semibold cursor-pointer"
                    onClick={() => handleAction(kind, label, target, order)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </article>
          )
        })}

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-surface gap-3">
            <Icon name="box" size={40} color="#888" />
            <h3 className="t-heading">Tidak ada pesanan</h3>
            <p className="t-body text-muted">Belum ada transaksi di tab ini.</p>
            <Button className="mt-2" onClick={() => nav.tab('list')}>
              MULAI BELANJA
            </Button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* TRACKING MODAL (LACAK)                                         */}
      {/* ============================================================== */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="t-heading">Pelacakan Pesanan</h3>
                <span className="t-caption text-muted">{trackingModal.orderNo} · {trackingModal.courier}</span>
              </div>
              <button
                type="button"
                onClick={() => setTrackingModal(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="p-3 bg-surface rounded-xl flex items-center justify-between">
              <span className="t-caption text-muted">Nomor Resi:</span>
              <span className="t-strong font-mono">{trackingModal.resi}</span>
            </div>

            <div className="flex flex-col gap-3.5 my-2">
              {trackingModal.events.map((ev, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <span className={`w-3 h-3 rounded-full mt-1 ${i === 0 ? 'bg-black ring-4 ring-neutral-200' : 'bg-muted'}`} />
                    {i < trackingModal.events.length - 1 && <span className="w-0.5 h-10 bg-line" />}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="t-caption text-muted font-mono">{ev.time}</span>
                    <span className={`t-body text-xs sm:text-sm ${i === 0 ? 'font-bold text-ink' : 'text-ink2'}`}>
                      {ev.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => setTrackingModal(null)} className="w-full mt-2">
              TUTUP
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* REVIEW MODAL (BERI ULASAN)                                     */}
      {/* ============================================================== */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="t-heading">Beri Ulasan Produk</h3>
                <span className="t-caption text-muted">{reviewModal.no}</span>
              </div>
              <button
                type="button"
                onClick={() => setReviewModal(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 py-2">
              <span className="t-caption text-muted">Nilai pengalaman belanjamu:</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Icon
                      name="star"
                      size={28}
                      color={star <= reviewRating ? '#E50012' : '#D1D5DB'}
                      fill={star <= reviewRating ? '#E50012' : 'none'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="t-caption text-ink2 font-medium">Ulasan Anda</span>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Bagikan kepuasan figur POP MART yang kamu dapatkan..."
                className="w-full p-3 rounded-xl border border-line text-xs sm:text-sm outline-none focus:border-ink resize-none"
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button kind="secondary" className="flex-1" onClick={() => setReviewModal(null)}>
                BATAL
              </Button>
              <Button className="flex-1" onClick={submitReview}>
                KIRIM ULASAN
              </Button>
            </div>
          </div>
        </div>
      )}
    </Screen>
  )
}
