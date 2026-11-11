import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { ActionBar, BackHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { HeartButton } from '../components/ProductCard'
import { Badge, Button, Divider, HScroll, InfoRow, SectionHead, Stepper, SummaryRow, Thumb, cx } from '../components/ui'
import { IP, MAX_QTY, PRODUCTS } from '../data/catalog'
import { rp } from '../utils/format'

export default function Detail({ params }) {
  const { nav, addToCart, notify } = useShop()
  const product = PRODUCTS[params?.id] || PRODUCTS.hrn_2 || Object.values(PRODUCTS)[0]
  const ip = IP[product.ip] || Object.values(IP)[0]
  const isBox = product.variant !== 'Figurine'

  const variants = isBox
    ? [
        ['Single Box', '1 kotak acak', product.price],
        ['Whole Set', '12 kotak', product.price * 12],
      ]
    : [['Figurine', '1 pcs', product.price]]

  const [variant, setVariant] = useState(0)
  const [qty, setQty] = useState(1)

  const handleAddToCart = () => {
    const cartKey = product.cart || product.id
    for (let i = 0; i < qty; i++) addToCart(cartKey)
    notify(`${qty}x "${product.name}" berhasil dimasukkan ke keranjang!`)
  }

  const handleCheckout = () => {
    const cartKey = product.cart || product.id
    for (let i = 0; i < qty; i++) addToCart(cartKey)
    nav.go('checkout')
  }

  const bottom = (
    <div className="lg:hidden">
      <ActionBar>
        <HeartButton id={product.cart || product.id} kind="framed" />
        <Button
          kind="secondary"
          className="flex-1 text-xs sm:text-sm font-bold border-[1.5px] border-black text-black"
          onClick={handleAddToCart}
        >
          + KERANJANG
        </Button>
        <Button
          className="flex-1 text-xs sm:text-sm font-bold bg-black text-white hover:bg-neutral-900 border-none"
          onClick={handleCheckout}
        >
          CHECKOUT
        </Button>
      </ActionBar>
    </div>
  )

  return (
    <Screen header={<BackHeader title="Detail Produk" cart />} bottom={bottom}>
      <div className="flex flex-col gap-6 pb-8">
       <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start lg:px-4">
        {/* Gallery */}
        <div className="flex flex-col items-center gap-3">
          <Thumb product={product} className="aspect-square w-full lg:rounded-2xl" textClass="t-title" />
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-5 h-1.5 rounded-full bg-ink" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-line" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
        {/* Info */}
        <section className="px-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge kind="outline">{product.ship}</Badge>
            {product.tag && <Badge kind="red">{product.tag}</Badge>}
            {isBox && <Badge kind="soft">KOTAK BUTA</Badge>}
          </div>
          <h2 className="t-title">{product.name}</h2>
          <span className="t-price-lg">{rp(product.price)}</span>
        </section>

        {/* Varian */}
        <section className="px-4 flex flex-col gap-3">
          <Divider />
          <h3 className="t-heading pt-1">Pilih varian</h3>
          <div className="flex gap-3">
            {variants.map(([title, sub, price], i) => (
              <button
                key={title}
                type="button"
                onClick={() => setVariant(i)}
                className={cx('flex-1 flex flex-col gap-1 p-3.5 rounded-xl bg-white text-left', i === variant ? 'border-[1.5px] border-ink' : 'border border-line')}
              >
                <span className="t-strong">{title}</span>
                <span className="t-caption text-muted">{sub}</span>
                <span className="t-price">{rp(price)}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <h3 className="t-heading">Jumlah</h3>
            <Stepper qty={qty} size={40} onMinus={() => setQty((q) => Math.max(1, q - 1))} onPlus={() => setQty((q) => Math.min(MAX_QTY, q + 1))} />
          </div>

          {/* Action Buttons: Checkout & Masukan ke Keranjang (Desktop Web View) */}
          <div className="hidden lg:flex items-center gap-3 pt-3">
            <HeartButton id={product.cart || product.id} kind="framed" />
            <Button
              kind="secondary"
              onClick={handleAddToCart}
              className="flex-1 h-12 border-[1.5px] border-black text-black hover:bg-neutral-50 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Icon name="bag" size={18} />
              MASUKAN KE KERANJANG
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 h-12 bg-black text-white hover:bg-neutral-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border-none"
            >
              CHECKOUT SEKARANG
            </Button>
          </div>
        </section>

        {/* Layanan */}
        <section className="px-4 flex flex-col gap-3">
          <Divider />
          <div className="h-1" />
          <InfoRow icon="truck" title={product.ship} sub="Dikirim dari gudang Indonesia" />
          <InfoRow icon="shield" title="Produk resmi POP MART" sub="Dijual langsung oleh PT Pop Mart Indonesia" />
        </section>

        {/* Deskripsi */}
        <section className="px-4 flex flex-col gap-3">
          <Divider />
          <h3 className="t-heading pt-1">Deskripsi</h3>
          <p className="t-body text-ink2">
            {product.ip === 'hirono'
              ? 'Diciptakan oleh seniman kontemporer bernama Lang, Hirono adalah karakter yang kompleks. Setiap kotak buta berisi satu figur acak dari seri Shelter.'
              : `Koleksi resmi ${ip.label} dari POP MART. Setiap kotak buta berisi satu figur acak dari serinya.`}
          </p>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface">
            <SummaryRow label="Karakter" value={ip.label} />
            <SummaryRow label="Jenis" value={isBox ? 'Kotak Buta' : 'Figurine'} />
            {isBox && <SummaryRow label="Isi Whole Set" value="12 kotak" />}
            <SummaryRow label="Pengiriman" value={product.ship} />
          </div>
        </section>

        </div>
       </div>
        {/* Rekomendasi */}
        <section className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHead title="Kamu mungkin suka" />
          </div>
          <HScroll>
            {Object.keys(PRODUCTS)
              .filter((k) => k !== product.id)
              .slice(0, 6)
              .map((k) => (
                <ProductCard key={k} product={PRODUCTS[k]} className="w-[171px] shrink-0" onOpen={() => nav.swap('detail', { id: k })} />
              ))}
          </HScroll>
        </section>
      </div>
    </Screen>
  )
}
