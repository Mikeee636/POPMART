import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { Screen } from '../components/Layout'
import Icon from '../components/Icon'
import ProductCard, { ProductGrid } from '../components/ProductCard'
import WishStrip from '../components/WishStrip'
import { Chip, IconBtn, SectionHead } from '../components/ui'
import { PRODUCTS, SEARCH_HISTORY, SEARCH_POPULAR } from '../data/catalog'

export default function Search() {
  const { nav } = useShop()
  const [query, setQuery] = useState('hirono')
  const [history, setHistory] = useState(SEARCH_HISTORY)

  const q = query.trim().toLowerCase()
  const results = q ? Object.values(PRODUCTS).filter((p) => p.name.toLowerCase().includes(q)) : []

  const header = (
    <header className="lg:hidden shrink-0 bg-white border-b border-line z-10 pt-[env(safe-area-inset-top,0px)]">
      <div className="h-[60px] py-2 pl-4 pr-2 flex items-center gap-2">
        <label className="flex-1 flex items-center gap-2.5 h-11 px-3.5 rounded-[10px] bg-surface">
          <Icon name="search" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk…"
            className="t-body flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted"
          />
          {query && <IconBtn name="close" size={28} iconSize={16} color="#6B6B6B" label="Hapus" onClick={() => setQuery('')} />}
        </label>
        <button type="button" onClick={nav.back} className="t-strong h-11 px-2">Batal</button>
      </div>
    </header>
  )

  return (
    <Screen header={header}>
      <div className="flex flex-col gap-8 pt-4 pb-8">
        <div className="hidden lg:flex px-4">
          <label className="flex-1 flex items-center gap-2.5 h-12 px-4 rounded-[10px] bg-surface">
            <Icon name="search" size={20} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari produk…" className="t-body flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted" />
          </label>
        </div>
        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Pencarian Populer</h2>
          <div className="flex flex-wrap gap-2">
            {SEARCH_POPULAR.map((c) => (
              <Chip key={c} onClick={() => setQuery(c)}>{c}</Chip>
            ))}
          </div>
        </section>

        {history.length > 0 && (
          <section className="px-4 flex flex-col gap-1">
            <div className="flex items-center justify-between h-8">
              <h2 className="t-heading">Riwayat Pencarian</h2>
              <button type="button" onClick={() => setHistory([])} className="t-caption text-ink2 underline">Hapus</button>
            </div>
            {history.map((term) => (
              <button key={term} type="button" onClick={() => setQuery(term)} className="flex items-center gap-3 h-11 text-left">
                <Icon name="clock" size={18} color="#6B6B6B" />
                <span className="t-body text-ink2 flex-1">{term}</span>
                <Icon name="chevRight" size={16} color="#6B6B6B" />
              </button>
            ))}
          </section>
        )}

        <WishStrip />

        <section className="px-4 flex flex-col gap-4">
          <SectionHead title={q ? `Hasil untuk "${query.trim()}"` : 'Hasil pencarian'} sub={`${results.length} produk ditemukan`} />
          {results.length > 0 ? (
            <ProductGrid>
              {results.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={() => nav.go('detail', { id: p.id })} />
              ))}
            </ProductGrid>
          ) : (
            <p className="t-body text-muted py-6 text-center">Tidak ada produk yang cocok. Coba kata kunci lain.</p>
          )}
        </section>
      </div>
    </Screen>
  )
}
