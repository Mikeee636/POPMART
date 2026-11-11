import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { ActionBar, BackHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import { Button, Divider, RadioOption, SummaryRow, Thumb, Field } from '../components/ui'
import { SHIPPING } from '../data/catalog'
import { rp } from '../utils/format'

const SHIP_OPTIONS = [
  ['LOCAL EXPRESS', 'Estimasi 2–4 hari kerja', SHIPPING],
  ['GLOBAL EXPRESS', 'Estimasi 7–14 hari kerja', 150000],
]
const PAY_OPTIONS = [
  ['Kartu Kredit / Debit', 'Visa, Mastercard, Amex, JCB'],
  ['BCA Virtual Account', 'Konfirmasi instan otomatis'],
  ['GoPay / QRIS', 'Scan kode QR instan'],
  ['PayPal', 'Akun internasional'],
  ['Apple Pay', 'Touch ID / Face ID'],
]

export default function Checkout({ params }) {
  const { nav, summary, notify } = useShop()

  // Ambil profil user customer yang sedang login dari localStorage
  const currentUser = (() => {
    try {
      const raw = localStorage.getItem('popmart_react_current_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  const [addressData, setAddressData] = useState({
    name: currentUser?.name || 'Mikel',
    phone: '+62 812-3456-7890',
    address: 'Jl. Senopati No. 42, RT 02/RW 03, Senayan, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
  })
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [editForm, setEditForm] = useState(addressData)

  const [ship, setShip] = useState(0)
  const [pay, setPay] = useState(0)

  const discountAmount = params?.discountAmount || 0
  const filled = summary.lines.filter((l) => l.qty > 0)
  const shipFee = summary.count ? SHIP_OPTIONS[ship][2] : 0
  const total = Math.max(0, summary.subtotal - discountAmount + shipFee)

  const saveAddress = (e) => {
    e?.preventDefault()
    setAddressData(editForm)
    setShowAddressModal(false)
    notify('Alamat pengiriman diperbarui!')
  }

  const bottom = (
    <ActionBar>
      <Button
        className="flex-1 cursor-pointer bg-black text-white hover:bg-neutral-900 border-none font-bold"
        disabled={!summary.count}
        style={{ opacity: summary.count ? 1 : 0.4 }}
        onClick={() => {
          notify('Pembayaran berhasil diverifikasi!')
          nav.go('success', {
            total,
            ship: SHIP_OPTIONS[ship][0],
            pay: PAY_OPTIONS[pay][0],
            recipient: addressData.name,
          })
        }}
      >
        BAYAR {rp(total)}
      </Button>
    </ActionBar>
  )

  return (
    <Screen narrow header={<BackHeader title="Checkout" />} bottom={bottom}>
      <div className="flex flex-col gap-7 pt-2 pb-8">
        {/* Alamat Pengiriman */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Alamat Pengiriman</h2>
          <div className="flex gap-3 p-4 rounded-xl border border-line bg-white shadow-sm">
            <Icon name="pin" size={22} />
            <div className="flex-1 flex flex-col gap-1 min-w-0">
              <span className="t-strong">{addressData.name} · {addressData.phone}</span>
              <span className="t-caption text-ink2 leading-relaxed">{addressData.address}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditForm(addressData)
                setShowAddressModal(true)
              }}
              className="t-caption font-semibold underline self-start text-ink hover:text-pm cursor-pointer"
            >
              Ubah
            </button>
          </div>
        </section>

        {/* Metode Pengiriman */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Metode Pengiriman</h2>
          {SHIP_OPTIONS.map(([title, sub, fee], i) => (
            <RadioOption
              key={title}
              title={title}
              sub={sub}
              value={rp(fee)}
              on={ship === i}
              onClick={() => setShip(i)}
            />
          ))}
        </section>

        {/* Metode Pembayaran */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Metode Pembayaran</h2>
          {PAY_OPTIONS.map(([title, sub], i) => (
            <RadioOption
              key={title}
              title={title}
              sub={sub}
              on={pay === i}
              onClick={() => setPay(i)}
            />
          ))}
        </section>

        {/* Ringkasan Pesanan */}
        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Ringkasan Pesanan</h2>
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface">
            {filled.map(({ id, product: p, qty, total: lineTotal }) => (
              <div key={id} className="flex items-center gap-3">
                <Thumb product={p} text={false} className="w-12 h-12 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="t-caption truncate font-medium">{p.name}</span>
                  <span className="t-caption text-muted">{qty} × {rp(p.price)}</span>
                </div>
                <span className="t-strong">{rp(lineTotal)}</span>
              </div>
            ))}
            <Divider />
            <SummaryRow label="Subtotal" value={rp(summary.subtotal)} />
            {discountAmount > 0 && (
              <div className="flex items-center justify-between gap-3 text-emerald-600">
                <span className="t-body">Diskon Voucher</span>
                <span className="t-strong">-{rp(discountAmount)}</span>
              </div>
            )}
            <SummaryRow label="Ongkos kirim" value={rp(shipFee)} />
            <Divider />
            <SummaryRow strong label="Total" value={rp(total)} />

            <Button
              className="w-full mt-3 hidden lg:flex font-bold justify-center bg-black text-white hover:bg-neutral-900 border-none cursor-pointer"
              disabled={!summary.count}
              style={{ opacity: summary.count ? 1 : 0.4 }}
              onClick={() => {
                notify('Pembayaran berhasil diverifikasi!')
                nav.go('success', {
                  total,
                  ship: SHIP_OPTIONS[ship][0],
                  pay: PAY_OPTIONS[pay][0],
                  recipient: addressData.name,
                })
              }}
            >
              BAYAR SEKARANG ({rp(total)})
            </Button>
          </div>
        </section>
      </div>

      {/* Edit Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="t-heading">Ubah Alamat Pengiriman</h3>
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={saveAddress} className="flex flex-col gap-3.5">
              <div>
                <label className="t-caption text-ink2 block mb-1">Nama Penerima</label>
                <Field
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Nama penerima"
                  required
                />
              </div>

              <div>
                <label className="t-caption text-ink2 block mb-1">Nomor Telepon</label>
                <Field
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="+62 8..."
                  required
                />
              </div>

              <div>
                <label className="t-caption text-ink2 block mb-1">Alamat Lengkap</label>
                <textarea
                  rows={3}
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  placeholder="Alamat lengkap tujuan pengiriman"
                  required
                  className="w-full p-3.5 rounded-xl border border-line text-sm outline-none focus:border-ink resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button kind="secondary" className="flex-1" onClick={() => setShowAddressModal(false)}>
                  BATAL
                </Button>
                <Button type="submit" className="flex-1">
                  SIMPAN
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Screen>
  )
}
