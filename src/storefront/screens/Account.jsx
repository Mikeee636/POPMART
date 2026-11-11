import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { BottomNav, Screen, TitleHeader } from '../components/Layout'
import Icon from '../components/Icon'
import { Button, CountDot, Divider, Field, ListRow, SectionHead } from '../components/ui'
import { ORDERS, ORDER_TABS } from '../data/catalog'

export default function Account() {
  const { nav, notify, wishCount } = useShop()

  // Ambil profil user customer yang sedang login dari localStorage
  const currentUser = (() => {
    try {
      const raw = localStorage.getItem('popmart_react_current_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  const [userName, setUserName] = useState(currentUser?.name || 'Rina Pratama')
  const [userEmail] = useState(currentUser?.email || 'customer@gmail.com')
  const [userPhone, setUserPhone] = useState('+62 812-3456-7890')
  const [userAddress, setUserAddress] = useState('Jl. Senopati No. 42, RT 02/RW 03, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190')

  // Modals state
  const [activeModal, setActiveModal] = useState(null) // 'profile' | 'address' | 'locale' | 'faq' | 'contact'
  const [tempAddress, setTempAddress] = useState({ name: userName, phone: userPhone, address: userAddress })
  const [selectedCurrency, setSelectedCurrency] = useState('IDR')
  const [selectedLanguage, setSelectedLanguage] = useState('Bahasa Indonesia')

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'RP'

  const saveAddress = (e) => {
    e?.preventDefault()
    setUserName(tempAddress.name)
    setUserPhone(tempAddress.phone)
    setUserAddress(tempAddress.address)
    setActiveModal(null)
    notify('Alamat pengiriman berhasil disimpan!')
  }

  const saveLocale = () => {
    setActiveModal(null)
    notify(`Preferensi diperbarui: ${selectedCurrency} · ${selectedLanguage}`)
  }

  return (
    <Screen narrow header={<TitleHeader title="Saya" actions={['help', 'cart']} />} bottom={<BottomNav active="account" />}>
      <div className="flex flex-col gap-6 pt-4 pb-8">
        {/* Desktop Title Header */}
        <div className="hidden lg:flex items-center justify-between pb-3 border-b border-line px-4">
          <h1 className="t-title text-2xl font-bold">Saya</h1>
        </div>

        {/* Profile Card */}
        <section
          onClick={() => {
            setTempAddress({ name: userName, phone: userPhone, address: userAddress })
            setActiveModal('profile')
          }}
          className="px-4 flex items-center gap-3.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="w-16 h-16 rounded-full bg-surface border border-line flex items-center justify-center t-heading font-bold text-ink shadow-sm">
            {initials}
          </span>
          <div className="flex-1 flex flex-col gap-0.5">
            <h2 className="t-title">{userName}</h2>
            <span className="t-caption text-muted">{userEmail}</span>
            <span className="t-caption text-ink2 text-xs">{userPhone}</span>
          </div>
          <Icon name="chevRight" size={20} color="#6B6B6B" />
        </section>

        {/* Pesanan Saya */}
        <section className="px-4 flex flex-col gap-4">
          <SectionHead title="Pesanan Saya" link="Lihat semua" onLink={() => nav.go('orders', { tab: 'unpaid' })} />
          <div className="flex py-4 px-1 rounded-xl bg-surface">
            {ORDER_TABS.map(([key, label, ic]) => {
              const n = key === 'done' ? 0 : ORDERS[key]?.length || 0
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => nav.go('orders', { tab: key })}
                  className="flex-1 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className="relative w-8 h-7 flex items-center justify-center">
                    <Icon name={ic} size={24} />
                    {n > 0 && <CountDot value={n} className="-top-1 left-5" />}
                  </span>
                  <span className="t-caption text-center">{label}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Menu Items */}
        <section className="px-4 flex flex-col">
          <ListRow icon="heart" label="Wishlist" value={`${wishCount} produk`} onClick={() => nav.go('wishlist')} />
          <ListRow
            icon="pin"
            label="Alamat Pengiriman"
            value="1 alamat tersimpan"
            onClick={() => {
              setTempAddress({ name: userName, phone: userPhone, address: userAddress })
              setActiveModal('address')
            }}
          />
          <ListRow
            icon="globe"
            label="Negara & Bahasa"
            value={`${selectedCurrency} · ${selectedLanguage}`}
            onClick={() => setActiveModal('locale')}
          />
          <ListRow icon="help" label="Pusat Bantuan (FAQ)" onClick={() => setActiveModal('faq')} />
          <ListRow icon="mail" label="Hubungi Kami" onClick={() => setActiveModal('contact')} />
          {currentUser?.role?.toLowerCase() === 'admin' && (
            <ListRow icon="shield" label="Dashboard Admin" onClick={() => { window.location.hash = '#/admin' }} />
          )}
          <ListRow
            icon="logout"
            label="Keluar"
            danger
            last
            onClick={() => {
              try {
                localStorage.removeItem('popmart_react_current_user')
                localStorage.removeItem('popmart_react_admin_user')
                localStorage.setItem('popmart_react_is_authenticated', 'false')
              } catch (e) {}
              window.location.hash = '#/login'
              window.location.reload()
            }}
          />
        </section>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: ALAMAT PENGIRIMAN & PROFIL                             */}
      {/* ============================================================== */}
      {(activeModal === 'address' || activeModal === 'profile') && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="t-heading">
                {activeModal === 'profile' ? 'Profil Pengguna' : 'Alamat Pengiriman'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={saveAddress} className="flex flex-col gap-3.5">
              <div>
                <label className="t-caption text-ink2 block mb-1">Nama Penerima</label>
                <Field
                  value={tempAddress.name}
                  onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })}
                  placeholder="Nama lengkap"
                  required
                />
              </div>

              <div>
                <label className="t-caption text-ink2 block mb-1">Nomor Telepon</label>
                <Field
                  value={tempAddress.phone}
                  onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })}
                  placeholder="+62..."
                  required
                />
              </div>

              <div>
                <label className="t-caption text-ink2 block mb-1">Alamat Lengkap</label>
                <textarea
                  rows={3}
                  value={tempAddress.address}
                  onChange={(e) => setTempAddress({ ...tempAddress, address: e.target.value })}
                  placeholder="Nama jalan, gedung, nomor rumah, RT/RW, kecamatan, kota, kode pos"
                  required
                  className="w-full p-3.5 rounded-xl border border-line text-sm outline-none focus:border-ink resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button kind="secondary" className="flex-1" onClick={() => setActiveModal(null)}>
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

      {/* ============================================================== */}
      {/* MODAL 2: NEGARA & BAHASA                                       */}
      {/* ============================================================== */}
      {activeModal === 'locale' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="t-heading">Negara & Bahasa</h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="t-strong">Mata Uang</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ['IDR', 'Rupiah (Rp)'],
                  ['USD', 'US Dollar ($)'],
                  ['SGD', 'SG Dollar (S$)'],
                ].map(([curr, title]) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setSelectedCurrency(curr)}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition ${
                      selectedCurrency === curr ? 'border-ink bg-surface font-bold text-ink' : 'border-line text-ink2'
                    }`}
                  >
                    <span className="block text-sm font-semibold">{curr}</span>
                    <span className="block text-[11px] text-muted">{title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <span className="t-strong">Bahasa</span>
              <div className="grid grid-cols-2 gap-2">
                {['Bahasa Indonesia', 'English'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition ${
                      selectedLanguage === lang ? 'border-ink bg-surface font-bold text-ink' : 'border-line text-ink2'
                    }`}
                  >
                    <span className="text-sm">{lang}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 pt-3">
              <Button kind="secondary" className="flex-1" onClick={() => setActiveModal(null)}>
                BATAL
              </Button>
              <Button className="flex-1" onClick={saveLocale}>
                TERAPKAN
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: PUSAT BANTUAN (FAQ)                                   */}
      {/* ============================================================== */}
      {activeModal === 'faq' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="t-heading">Pusat Bantuan (FAQ)</h3>
                <span className="t-caption text-muted">Pertanyaan seputar POP MART Indonesia</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 py-1">
              <div className="p-3.5 rounded-xl bg-surface flex flex-col gap-1.5">
                <span className="t-strong">Apakah semua produk dijamin 100% Original?</span>
                <p className="t-body text-xs text-ink2 leading-relaxed">
                  Ya, seluruh produk didistribusikan resmi oleh PT Pop Mart Indonesia dengan segel hologram asli dan sertifikasi standar SNI.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface flex flex-col gap-1.5">
                <span className="t-strong">Bagaimana sistem Blind Box bekerja?</span>
                <p className="t-body text-xs text-ink2 leading-relaxed">
                  Setiap kotak tertutup rapat dan acak. Tidak ada yang mengetahui isi figur di dalamnya sampai Anda membuka foil pelindung. Anda berkesempatan menemukan edisi Secret / Chaser langka!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface flex flex-col gap-1.5">
                <span className="t-strong">Berapa lama estimasi pengiriman pesanan?</span>
                <p className="t-body text-xs text-ink2 leading-relaxed">
                  Pengiriman LOCAL EXPRESS membutuhkan waktu 2–4 hari kerja. Pengiriman GLOBAL EXPRESS membutuhkan 7–14 hari kerja.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface flex flex-col gap-1.5">
                <span className="t-strong">Apakah produk Blind Box bisa ditukar atau diretur?</span>
                <p className="t-body text-xs text-ink2 leading-relaxed">
                  Produk blind box yang foil kemasannya sudah dibuka tidak dapat diretur kecuali terdapat cacat manufaktur dengan melampirkan video unboxing lengkap tanpa jeda.
                </p>
              </div>
            </div>

            <Button onClick={() => setActiveModal(null)} className="w-full mt-2">
              MENGERTI
            </Button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: HUBUNGI KAMI                                          */}
      {/* ============================================================== */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="t-heading">Hubungi Layanan Pelanggan</h3>
                <span className="t-caption text-muted">Kami siap membantu setiap hari</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 py-1">
              <a
                href="https://wa.me/628111621312"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-line hover:bg-surface transition"
              >
                <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Icon name="phone" size={20} color="#059669" />
                </span>
                <div className="flex-1">
                  <span className="t-strong block">WhatsApp Resmi</span>
                  <span className="t-caption text-muted">+62 811-162-1312 (Chat Langsung)</span>
                </div>
                <Icon name="chevRight" size={16} color="#888" />
              </a>

              <a
                href="mailto:cs@popmart.co.id"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-line hover:bg-surface transition"
              >
                <span className="w-10 h-10 rounded-full bg-neutral-100 text-black flex items-center justify-center">
                  <Icon name="mail" size={20} color="#111111" />
                </span>
                <div className="flex-1">
                  <span className="t-strong block">Email Dukungan</span>
                  <span className="t-caption text-muted">cs@popmart.co.id</span>
                </div>
                <Icon name="chevRight" size={16} color="#888" />
              </a>

              <div className="p-3.5 rounded-xl bg-surface flex items-center gap-3">
                <Icon name="clock" size={20} color="#444" />
                <div className="flex-1">
                  <span className="t-strong text-xs block">Jam Operasional Layanan</span>
                  <span className="t-caption text-muted">Senin - Minggu: 09.00 - 18.00 WIB</span>
                </div>
              </div>
            </div>

            <Button onClick={() => setActiveModal(null)} className="w-full mt-2">
              TUTUP
            </Button>
          </div>
        </div>
      )}
    </Screen>
  )
}
