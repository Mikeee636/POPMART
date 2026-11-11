import { useState, useMemo } from 'react'
import { useShop } from '../context/ShopContext'
import { BottomNav, Screen, TitleHeader } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { ProductGrid } from '../components/ProductCard'
import { Chip, HScroll, IconBtn } from '../components/ui'
import { LIST_CHIPS, LIST_KEYS, PRODUCTS, IP } from '../data/catalog'

const SORT_OPTIONS = [
  { id: 'recom', label: 'Rekomendasi' },
  { id: 'price-low', label: 'Harga Terendah' },
  { id: 'price-high', label: 'Harga Tertinggi' },
  { id: 'name-az', label: 'Nama A-Z' },
]

export default function Category({ params }) {
  const { nav } = useShop()
  const initialChip = useMemo(() => {
    if (params?.chip && LIST_CHIPS.includes(params.chip)) return params.chip
    if (params?.category) {
      if (params.category.includes('Kotak') || params.category.includes('Box')) return 'Kotak Buta'
      if (params.category.includes('Figur')) return 'Figurine'
      if (params.category.includes('Plush') || params.category.includes('Boneka')) return 'Vinyl Plush'
      if (params.category.includes('Tas') || params.category.includes('Aksesoris')) return 'Tas'
      if (params.category.includes('MEGA')) return 'MEGA'
    }
    return LIST_CHIPS[0]
  }, [params])

  const [activeChip, setActiveChip] = useState(initialChip)
  const [selectedIp, setSelectedIp] = useState(params?.ip || null)
  const [sortIndex, setSortIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(Boolean(params?.ip))

  // Cycle sort order on click
  const cycleSort = () => {
    setSortIndex((prev) => (prev + 1) % SORT_OPTIONS.length)
  }

  const activeSort = SORT_OPTIONS[sortIndex]

  const filteredKeys = useMemo(() => {
    let keys = [...LIST_KEYS]

    // Filter by IP if explicitly chosen
    if (selectedIp) {
      keys = keys.filter((k) => PRODUCTS[k].ip === selectedIp)
    }

    // Filter by chip category
    if (activeChip === 'Kotak Buta') {
      keys = keys.filter((k) => PRODUCTS[k].variant?.includes('Box') || PRODUCTS[k].variant === 'Single Box')
    } else if (activeChip === 'Figurine') {
      keys = keys.filter((k) => PRODUCTS[k].variant === 'Figurine' || PRODUCTS[k].variant?.includes('Figure'))
    } else if (activeChip === 'Vinyl Plush') {
      keys = keys.filter((k) => PRODUCTS[k].variant?.includes('Plush') || PRODUCTS[k].name.includes('Plush') || PRODUCTS[k].variant?.includes('Pendant'))
    } else if (activeChip === 'Tas') {
      keys = keys.filter((k) => PRODUCTS[k].variant?.includes('Handbag') || PRODUCTS[k].name.includes('Handbag') || PRODUCTS[k].variant?.includes('Cup') || PRODUCTS[k].variant?.includes('Mug') || PRODUCTS[k].variant?.includes('Magnet'))
    } else if (activeChip === 'MEGA') {
      keys = keys.filter((k) => PRODUCTS[k].name.includes('MEGA') || PRODUCTS[k].variant?.includes('MEGA'))
    } else if (activeChip !== 'Semua') {
      // Check if activeChip matches an IP name
      const matchedIpKey = Object.keys(IP).find((k) => IP[k].label.toLowerCase() === activeChip.toLowerCase())
      if (matchedIpKey) {
        keys = keys.filter((k) => PRODUCTS[k].ip === matchedIpKey)
      }
    }

    // Sorting
    if (activeSort.id === 'price-low') {
      keys.sort((a, b) => PRODUCTS[a].price - PRODUCTS[b].price)
    } else if (activeSort.id === 'price-high') {
      keys.sort((a, b) => PRODUCTS[b].price - PRODUCTS[a].price)
    } else if (activeSort.id === 'name-az') {
      keys.sort((a, b) => PRODUCTS[a].name.localeCompare(PRODUCTS[b].name))
    }

    return keys
  }, [activeChip, selectedIp, activeSort])

  return (
    <Screen header={<TitleHeader title="Kategori" actions={['search', 'cart']} />} bottom={<BottomNav active="list" />}>
      <div className="flex flex-col gap-4 pt-4 pb-8">
        {/* Main Category Chips */}
        <HScroll gap={8}>
          {LIST_CHIPS.map((c) => (
            <Chip
              key={c}
              active={c === activeChip}
              onClick={() => {
                setActiveChip(c)
                if (c === 'Semua') {
                  setSelectedIp(null)
                }
              }}
            >
              {c}
            </Chip>
          ))}
        </HScroll>

        {/* Optional IP Filter Bar (toggled by filter button or when IP selected) */}
        {showFilters && (
          <div className="px-4 py-2 bg-surface/60 border-y border-line flex flex-col gap-2">
            <span className="t-caption text-muted font-medium">Filter Karakter IP:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedIp(null)}
                className={`t-caption px-2.5 py-1 rounded-md cursor-pointer ${!selectedIp ? 'bg-ink text-white' : 'bg-white text-ink border border-line'}`}
              >
                Semua IP
              </button>
              {Object.entries(IP).map(([k, val]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSelectedIp(selectedIp === k ? null : k)}
                  className={`t-caption px-2.5 py-1 rounded-md cursor-pointer ${selectedIp === k ? 'bg-ink text-white' : 'bg-white text-ink border border-line'}`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toolbar: Product Count, Sort Toggle & Filter Button */}
        <div className="flex items-center justify-between pl-4 pr-2">
          <span className="t-caption text-muted font-medium">
            {filteredKeys.length} produk {selectedIp ? `(${IP[selectedIp]?.label})` : ''}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={cycleSort}
              title="Ketuk untuk mengubah urutan"
              className="t-caption h-10 px-2.5 rounded-lg hover:bg-surface inline-flex items-center gap-1.5 cursor-pointer text-ink transition-colors"
            >
              <span className="text-muted">Urutkan:</span>
              <span className="font-semibold">{activeSort.label}</span>
              <Icon name="chevDown" size={15} />
            </button>
            <IconBtn
              name="sliders"
              iconSize={20}
              label="Filter Karakter"
              className={showFilters ? 'bg-ink/10 rounded-lg' : ''}
              onClick={() => setShowFilters((prev) => !prev)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-4">
          {filteredKeys.length > 0 ? (
            <ProductGrid>
              {filteredKeys.map((k) => (
                <ProductCard key={k} product={PRODUCTS[k]} onOpen={() => nav.go('detail', { id: k })} />
              ))}
            </ProductGrid>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted gap-2">
              <Icon name="sparkle" size={32} />
              <p className="t-body">Tidak ada produk dalam kategori ini.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveChip('Semua')
                  setSelectedIp(null)
                }}
                className="t-strong text-ink underline mt-2 cursor-pointer"
              >
                Tampilkan semua produk
              </button>
            </div>
          )}
        </div>
      </div>
    </Screen>
  )
}
