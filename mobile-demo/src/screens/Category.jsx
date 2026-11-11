import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { BottomNav, Screen, TitleHeader } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { ProductGrid } from '../components/ProductCard'
import { Chip, HScroll, IconBtn } from '../components/ui'
import { LIST_CHIPS, LIST_KEYS, PRODUCTS } from '../data/catalog'

export default function Category() {
  const { nav } = useShop()
  const [active, setActive] = useState(LIST_CHIPS[0])

  return (
    <Screen header={<TitleHeader title="Kategori" actions={['search', 'cart']} />} bottom={<BottomNav active="list" />}>
      <div className="flex flex-col gap-4 pt-4 pb-8">
        <HScroll gap={8}>
          {LIST_CHIPS.map((c) => (
            <Chip key={c} active={c === active} onClick={() => setActive(c)}>{c}</Chip>
          ))}
        </HScroll>

        <div className="flex items-center justify-between pl-4 pr-2">
          <span className="t-caption text-muted">{LIST_KEYS.length} produk</span>
          <div className="flex items-center">
            <button type="button" className="t-caption h-11 px-2 inline-flex items-center gap-1">
              Urutkan: Rekomendasi
              <Icon name="chevDown" size={16} />
            </button>
            <IconBtn name="sliders" iconSize={20} label="Filter" />
          </div>
        </div>

        <div className="px-4">
          <ProductGrid>
            {LIST_KEYS.map((k) => (
              <ProductCard key={k} product={PRODUCTS[k]} onOpen={() => nav.go('detail', { id: k })} />
            ))}
          </ProductGrid>
        </div>
      </div>
    </Screen>
  )
}
