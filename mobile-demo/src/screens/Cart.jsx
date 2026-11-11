import { useShop } from '../context/ShopContext'
import { ActionBar, BackHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import { HeartButton } from '../components/ProductCard'
import WishStrip from '../components/WishStrip'
import { Button, Divider, IconBtn, Stepper, SummaryRow, Thumb } from '../components/ui'
import { rp } from '../utils/format'

function CartItem({ line }) {
  const { nav, setQty } = useShop()
  const { id, product: p, qty } = line
  return (
    <div>
      <div className="flex gap-3 py-4">
        <button type="button" onClick={() => nav.go('detail', { id: p.id })} aria-label={p.name} className="shrink-0">
          <Thumb product={p} className="w-[88px] h-[88px] rounded-[10px]" textClass="t-caption" />
        </button>
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex gap-1 items-start">
            <h3 className="t-strong flex-1 line-clamp-2">{p.name}</h3>
            <HeartButton id={id} kind="plain" />
            <IconBtn name="trash" size={32} iconSize={18} color="#6B6B6B" label="Hapus" onClick={() => setQty(id, 0)} />
          </div>
          <span className="t-caption text-muted">{p.variant}</span>
          <div className="flex items-center justify-between pt-1">
            <span className="t-price">{rp(p.price)}</span>
            <Stepper qty={qty} onMinus={() => setQty(id, qty - 1)} onPlus={() => setQty(id, qty + 1)} />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default function Cart() {
  const { nav, summary } = useShop()
  const { lines, count, subtotal, shipping, total } = summary
  const filled = lines.filter((l) => l.qty > 0)

  const bottom = (
    <ActionBar>
      <div className="flex-1 flex flex-col gap-0.5">
        <span className="t-caption text-muted">Total</span>
        <span className="t-price-lg">{rp(total)}</span>
      </div>
      <Button className="w-44" disabled={!count} style={{ opacity: count ? 1 : 0.4 }} onClick={() => nav.go('checkout')}>CHECKOUT</Button>
    </ActionBar>
  )

  return (
    <Screen header={<BackHeader title={`Tas Saya (${count})`} />} bottom={bottom}>
      <div className="flex flex-col gap-6 pt-2 pb-8">
        <section className="px-4">
          {filled.map((l) => (
            <CartItem key={l.id} line={l} />
          ))}
          {count === 0 && (
            <div className="flex flex-col items-center gap-3 px-6 py-8 rounded-xl bg-surface text-center">
              <Icon name="bag" size={40} />
              <h2 className="t-heading">Tas kamu masih kosong</h2>
              <p className="t-body text-ink2">Tambahkan figur Hirono favoritmu dari Beranda atau Wishlist.</p>
              <Button className="w-full" onClick={() => nav.tab('home')}>MULAI BELANJA</Button>
            </div>
          )}
        </section>

        <WishStrip />

        {count > 0 && (
          <>
            <section className="px-4 flex flex-col gap-2">
              <h2 className="t-heading">Kode promo</h2>
              <div className="flex items-center gap-2">
                <label className="flex-1 flex items-center gap-2.5 h-[52px] px-4 rounded-[10px] border border-line focus-within:border-ink">
                  <Icon name="tag" size={20} color="#6B6B6B" />
                  <input placeholder="Masukkan kode" className="t-body flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted" />
                </label>
                <Button kind="secondary">PAKAI</Button>
              </div>
            </section>

            <section className="px-4">
              <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface">
                <SummaryRow label={`Subtotal (${count} barang)`} value={rp(subtotal)} />
                <SummaryRow label="Ongkos kirim · LOCAL EXPRESS" value={rp(shipping)} />
                <Divider />
                <SummaryRow strong label="Total" value={rp(total)} />
              </div>
            </section>
          </>
        )}
      </div>
    </Screen>
  )
}
