import { CART_ITEMS, PRODUCTS } from '../data/catalog'
import { useShop } from '../context/ShopContext'
import ProductCard from './ProductCard'
import { HScroll, SectionHead } from './ui'

// "Wishlist Kamu" horizontal strip (Cart + Search), links to the Wishlist screen.
export default function WishStrip() {
  const { wish, nav } = useShop()
  const items = Object.keys(CART_ITEMS).filter((id) => wish[id])
  if (!items.length) return null
  return (
    <section className="flex flex-col gap-3">
      <div className="px-4">
        <SectionHead title="Wishlist Kamu" link="Lihat semua" onLink={() => nav.go('wishlist')} />
      </div>
      <HScroll>
        {items.map((id) => {
          const p = PRODUCTS[CART_ITEMS[id].key]
          return <ProductCard key={id} product={p} className="w-[171px] shrink-0" onOpen={() => nav.go('detail', { id: p.id })} />
        })}
      </HScroll>
    </section>
  )
}
