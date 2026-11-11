import { useShop } from '../context/ShopContext'
import { BottomNav, LogoHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { ProductGrid } from '../components/ProductCard'
import { Badge, Button, Divider, Field, HScroll, InfoRow, SectionHead, Thumb, Chip } from '../components/ui'
import { CATEGORIES, IP, IP_STRIP, MEGA_ITEMS, POPULAR_KEYS, PRODUCTS } from '../data/catalog'

const PAYMENTS = ['Visa', 'Mastercard', 'Amex', 'JCB', 'PayPal', 'Apple Pay', 'Google Pay']

export default function Home() {
  const { nav } = useShop()
  const hero = PRODUCTS.hironoShelter

  return (
    <Screen header={<LogoHeader />} bottom={<BottomNav active="home" />}>
      <div className="flex flex-col gap-10 pt-2 pb-8">
        {/* Hero — Sorotan Unggulan */}
        <section className="px-4 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative">
            <Thumb product={hero} className="h-80 lg:h-[460px] w-full rounded-2xl" />
            <Badge kind="outline" className="absolute top-4 left-4">Sorotan Unggulan</Badge>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-2">
            <p className="t-caption text-muted">Toko Online Resmi POP MART</p>
            <h2 className="t-display lg:text-[44px] lg:leading-[52px]">Hirono Shelter Series Figures</h2>
          </div>
          <Button className="lg:w-60" onClick={() => nav.go('detail', { id: hero.id })}>BELI SEKARANG</Button>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-5 h-1.5 rounded-full bg-ink" />
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-line" />
            ))}
          </div>
          </div>
        </section>

        {/* Karakter IP */}
        <section className="flex flex-col gap-4">
          <div className="px-4">
            <SectionHead title="KARAKTER IP" link="Lihat semua" onLink={() => nav.tab('list')} />
          </div>
          <HScroll gap={16}>
            {IP_STRIP.map((key) => {
              const ip = IP[key]
              return (
                <button key={key} type="button" onClick={() => nav.tab('list')} className="w-[76px] shrink-0 flex flex-col items-center gap-2">
                  <span className="relative w-[76px] h-[76px] rounded-full overflow-hidden flex items-center justify-center" style={{ background: ip.tint }}>
                    {ip.img ? (
                      <img src={ip.img} alt={ip.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="t-display" style={{ color: ip.ink }}>{ip.label.charAt(0)}</span>
                    )}
                  </span>
                  <span className="t-caption text-center line-clamp-2">{ip.label}</span>
                </button>
              )
            })}
          </HScroll>
        </section>

        {/* Kategori Produk */}
        <section className="px-4 flex flex-col gap-4">
          <SectionHead title="KATEGORI PRODUK" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(([label, ic]) => (
              <button key={label} type="button" onClick={() => nav.tab('list')} className="h-28 p-4 rounded-xl bg-surface flex flex-col justify-between items-start text-left">
                <Icon name={ic} size={28} />
                <span className="t-heading">{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* MEGA */}
        <section className="bg-ink px-4 py-8 lg:mx-4 lg:rounded-2xl lg:px-10 lg:py-10 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <h2 className="t-display text-white">MEGA</h2>
            <p className="t-body text-ondark">Figur koleksi ukuran besar 400% sampai 1000%.</p>
          </div>
          <div className="flex flex-col">
            {MEGA_ITEMS.map(([name, size], i) => (
              <div key={name}>
                <button type="button" onClick={() => nav.tab('list')} className="w-full flex items-center gap-3.5 py-3 text-left">
                  <span className="w-16 h-16 rounded-[10px] bg-dark2 text-white t-caption flex items-center justify-center shrink-0">{size}</span>
                  <span className="t-strong text-white flex-1">{name}</span>
                  <Icon name="chevRight" size={18} color="#BDBDBD" />
                </button>
                {i < MEGA_ITEMS.length - 1 && <Divider dark />}
              </div>
            ))}
          </div>
          <Button kind="secondary" onClick={() => nav.tab('list')}>BELI SEKARANG</Button>
        </section>

        {/* Produk Populer */}
        <section className="px-4 flex flex-col gap-4">
          <SectionHead title="PRODUK POPULER" sub="Lihat tren terkini dan temukan koleksi favoritmu." />
          <ProductGrid>
            {POPULAR_KEYS.map((k) => (
              <ProductCard key={k} product={PRODUCTS[k]} onOpen={() => nav.go('detail', { id: k })} />
            ))}
          </ProductGrid>
          <Button kind="secondary" onClick={() => nav.tab('list')}>LIHAT SEMUA PRODUK</Button>
        </section>

        {/* Komunitas */}
        <section className="bg-surface px-4 py-7 lg:mx-4 lg:rounded-2xl lg:px-10 lg:py-10 flex flex-col gap-3 lg:max-w-[640px] lg:self-center lg:w-full">
          <h2 className="t-title">GABUNG DENGAN KOMUNITAS</h2>
          <p className="t-body text-ink2">Jadilah yang pertama mendapatkan rilis terbaru, penawaran eksklusif, dan banyak lagi.</p>
          <div className="h-1" />
          <Field icon="mail" type="email" placeholder="Alamat email" />
          <Button>BERLANGGANAN</Button>
        </section>

        {/* Hubungi Kami + footer */}
        <section className="px-4 flex flex-col gap-5">
          <SectionHead title="HUBUNGI KAMI" />
          <div className="flex flex-col gap-3">
            <InfoRow icon="clock" title="Layanan Pelanggan Online" sub="Monday–Sunday 9:00am–18:00pm CST" />
            <InfoRow icon="mail" title="Email Kami" />
            <InfoRow icon="help" title="Kunjungi Pusat Bantuan (FAQ)" />
            <InfoRow icon="phone" title="Layanan Pengaduan Konsumen" sub="PT Pop Mart Indonesia · WhatsApp +62 811-162-1312" />
          </div>
          <Divider />
          <div className="flex flex-wrap gap-2">
            <Chip icon="globe">Negara: IDR</Chip>
            <Chip>Bahasa Indonesia</Chip>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="t-caption text-muted">Metode pembayaran</span>
            <div className="flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <span key={p} className="t-caption text-ink2 bg-surface rounded-md px-2.5 py-1.5">{p}</span>
              ))}
            </div>
          </div>
          <p className="t-caption text-muted">© POP MART Indonesia</p>
        </section>
      </div>
    </Screen>
  )
}
