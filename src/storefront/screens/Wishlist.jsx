import { useShop } from '../context/ShopContext'
import { BackHeader, BottomNav, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { ProductGrid } from '../components/ProductCard'
import { Button } from '../components/ui'
import { CART_ITEMS, PRODUCTS } from '../data/catalog'

export default function Wishlist() {
  const { nav, wish, wishCount } = useShop()
  const items = Object.keys(CART_ITEMS).filter((id) => wish[id])

  return (
    <Screen
      header={<BackHeader title={`Wishlist (${wishCount})`} cart />}
      bottom={<BottomNav active="account" />}
    >
      <div className="px-4 pt-2 pb-8 flex flex-col gap-4">
        {items.length > 0 ? (
          <>
            <p className="t-caption text-muted">Ketuk ikon hati untuk menghapus, atau Tambah ke Tas untuk langsung beli.</p>
            <ProductGrid>
              {items.map((id) => {
                const p = PRODUCTS[CART_ITEMS[id].key]
                return <ProductCard key={id} product={p} onOpen={() => nav.go('detail', { id: p.id })} />
              })}
            </ProductGrid>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 px-6 py-8 rounded-xl bg-surface text-center">
            <Icon name="heart" size={40} />
            <h2 className="t-heading">Wishlist kamu masih kosong</h2>
            <p className="t-body text-ink2">Ketuk ikon hati di figur POP MART favoritmu untuk menyimpannya di sini.</p>
            <Button className="w-full mt-2" onClick={() => nav.tab('list')}>MULAI BELANJA</Button>
          </div>
        )}
      </div>
    </Screen>
  )
}
