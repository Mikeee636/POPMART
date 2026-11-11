import Icon from './Icon'
import { Badge, Thumb, cx } from './ui'
import { rp } from '../utils/format'
import { useShop } from '../context/ShopContext'

// Wishlist heart. float = on a card image, framed = bordered square (action bar), plain = bare icon.
export function HeartButton({ id, kind = 'float' }) {
  const { wish, toggleWish } = useShop()
  const on = !!wish[id]
  const base = {
    float: 'absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm',
    framed: 'w-[52px] h-[52px] rounded-[10px] border border-line bg-white',
    plain: 'w-8 h-8',
  }
  return (
    <button
      type="button"
      aria-label={on ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}
      aria-pressed={on}
      onClick={(e) => {
        e.stopPropagation()
        toggleWish(id)
      }}
      className={cx('inline-flex items-center justify-center shrink-0 active:scale-90 transition-transform', base[kind])}
    >
      <Icon name="heart" size={kind === 'plain' ? 18 : 20} color={on ? '#D2001E' : '#111'} fill={on ? '#D2001E' : 'none'} />
    </button>
  )
}

function CartCounter({ product }) {
  const { cart, setQty, addToCart } = useShop()
  const cartKey = product.cart || product.id
  const qty = cart[cartKey] || 0
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          addToCart(cartKey)
        }}
        className="t-label h-9 w-full rounded-lg border-[1.5px] border-neutral-300 dark:border-neutral-600 text-black dark:text-white bg-white dark:bg-neutral-900 inline-flex items-center justify-center gap-1.5 active:opacity-70 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
      >
        <Icon name="plus" size={14} />
        Masukan ke keranjang
      </button>
    )
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-9 w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black inline-flex items-center justify-between border border-neutral-300 dark:border-neutral-700"
    >
      <button type="button" aria-label="Kurang" className="w-9 h-9 inline-flex items-center justify-center cursor-pointer hover:opacity-80" onClick={() => setQty(cartKey, qty - 1)}>
        <Icon name="minus" size={16} color="currentColor" />
      </button>
      <span className="t-caption font-semibold">{qty} di keranjang</span>
      <button type="button" aria-label="Tambah" className="w-9 h-9 inline-flex items-center justify-center cursor-pointer hover:opacity-80" onClick={() => setQty(cartKey, qty + 1)}>
        <Icon name="plus" size={16} color="currentColor" />
      </button>
    </div>
  )
}

export default function ProductCard({ product, onOpen, className }) {
  return (
    <div className={cx('flex flex-col gap-2.5 min-w-0 text-left', className)}>
      <div role="link" tabIndex={0} onClick={onOpen} onKeyDown={(e) => e.key === 'Enter' && onOpen()} className="flex flex-col gap-2.5 cursor-pointer">
        <div className="relative">
          <Thumb product={product} className="aspect-square w-full rounded-xl" textClass="t-heading" />
          {product.tag && <Badge kind="red" className="absolute top-2 left-2">{product.tag}</Badge>}
          {product.cart && <HeartButton id={product.cart} kind="float" />}
        </div>
        <div className="flex flex-col gap-1">
          <span className="t-label text-muted">{product.ship}</span>
          <h3 className="t-strong line-clamp-2 min-h-10">{product.name}</h3>
          <span className="t-price">{rp(product.price)}</span>
        </div>
      </div>
      {product.cart ? (
        <CartCounter product={product} />
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="t-label h-9 w-full rounded-lg border border-line text-ink2 inline-flex items-center justify-center active:opacity-70"
        >
          Lihat detail
        </button>
      )}
    </div>
  )
}

export function ProductGrid({ children, className }) {
  return <div className={cx('grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-6 lg:gap-y-8', className)}>{children}</div>
}
