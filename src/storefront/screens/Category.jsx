import { useState, useMemo } from 'react'
import { useShop } from '../context/ShopContext'
import { BottomNav, Screen, TitleHeader } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { ProductGrid } from '../components/ProductCard'
import { Chip, HScroll, IconBtn, cx } from '../components/ui'
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
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

        {/* Toolbar: Product Count, Dropdown Urutkan & Dropdown Filter (Button Garis) */}
        <div className="flex items-center justify-between pl-4 pr-3 relative z-30">
          <span className="t-caption text-muted font-medium">
            {filteredKeys.length} produk {selectedIp ? `(${IP[selectedIp]?.label})` : ''}
          </span>

          <div className="flex items-center gap-1.5 relative">
            {/* 1. Dropdown Urutkan Rekomendasi */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSortOpen((prev) => !prev)
                  setIsFilterOpen(false)
                }}
                className={cx(
                  't-caption h-10 px-3 rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-all border select-none',
                  isSortOpen ? 'bg-surface border-ink text-ink font-bold' : 'bg-white border-line hover:border-neutral-400 text-ink font-medium'
                )}
              >
                <span className="text-muted font-normal">Urutkan:</span>
                <span className="font-semibold">{activeSort.label}</span>
                <Icon name="chevDown" size={14} className={cx('transition-transform duration-200', isSortOpen && 'rotate-180')} />
              </button>

              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-line py-1.5 z-30 animate-fadeIn">
                    <div className="px-3.5 py-2 text-[11px] font-bold text-muted uppercase tracking-wider border-b border-line/60">
                      Urutkan Produk
                    </div>
                    {SORT_OPTIONS.map((opt, i) => {
                      const isSelected = i === sortIndex
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortIndex(i)
                            setIsSortOpen(false)
                          }}
                          className={cx(
                            'w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer',
                            isSelected ? 'bg-black text-white font-bold' : 'hover:bg-surface text-ink'
                          )}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            {/* 2. Dropdown Button Garis (Sliders / Filter) */}
            <div className="relative">
              <button
                type="button"
                aria-label="Filter Karakter"
                onClick={() => {
                  setIsFilterOpen((prev) => !prev)
                  setIsSortOpen(false)
                }}
                className={cx(
                  'w-10 h-10 rounded-lg inline-flex items-center justify-center transition-all border cursor-pointer relative select-none',
                  isFilterOpen ? 'bg-surface border-ink text-ink' : (selectedIp ? 'bg-black text-white border-black' : 'bg-white border-line hover:border-neutral-400 text-ink')
                )}
              >
                <Icon name="sliders" size={18} color="currentColor" />
                {selectedIp && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-black ring-2 ring-white" />
                )}
              </button>

              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-line p-3 z-30 animate-fadeIn flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-line pb-2">
                      <span className="text-xs font-bold text-ink">Filter Karakter IP</span>
                      {selectedIp && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedIp(null)
                            setIsFilterOpen(false)
                          }}
                          className="text-[11px] font-semibold text-muted hover:text-black underline cursor-pointer"
                        >
                          Reset Filter
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIp(null)
                          setIsFilterOpen(false)
                        }}
                        className={cx(
                          'w-full px-3 py-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors cursor-pointer',
                          !selectedIp ? 'bg-black text-white font-bold' : 'hover:bg-surface text-ink'
                        )}
                      >
                        <span>Semua Karakter</span>
                        <span className={cx('text-[11px]', !selectedIp ? 'text-white/80' : 'text-muted')}>
                          {LIST_KEYS.length}
                        </span>
                      </button>

                      {Object.entries(IP).map(([k, val]) => {
                        const isSelected = selectedIp === k
                        const count = LIST_KEYS.filter((key) => PRODUCTS[key].ip === k).length
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => {
                              setSelectedIp(isSelected ? null : k)
                              setIsFilterOpen(false)
                            }}
                            className={cx(
                              'w-full px-3 py-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors cursor-pointer',
                              isSelected ? 'bg-black text-white font-bold' : 'hover:bg-surface text-ink'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: val.ink }} />
                              {val.label}
                            </span>
                            <span className={cx('text-[11px]', isSelected ? 'text-white/80' : 'text-muted')}>
                              {count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
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
