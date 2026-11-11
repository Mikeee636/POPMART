import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { CART_ITEMS, MAX_QTY, PRODUCTS, SHIPPING, WISH_START } from '../data/catalog'

const ShopContext = createContext(null)
export const useShop = () => useContext(ShopContext)

const initialCart = () => Object.fromEntries(Object.entries(CART_ITEMS).map(([id, c]) => [id, c.start]))

// Static demo: all state lives in memory (no backend, no persistence).
export function ShopProvider({ children }) {
  const [stack, setStack] = useState([{ name: 'home' }])
  const [cart, setCart] = useState(initialCart)
  const [wish, setWish] = useState(WISH_START)
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const flash = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 1800)
  }, [])

  const nav = useMemo(
    () => ({
      go: (name, params) => setStack((s) => [...s, { name, params }]),
      back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
      tab: (name) => setStack([{ name }]), // bottom tabs reset the stack
      swap: (name, params) => setStack((s) => [...s.slice(0, -1), { name, params }]),
    }),
    [],
  )

  const setQty = useCallback((id, q) => setCart((c) => ({ ...c, [id]: Math.max(0, Math.min(MAX_QTY, q)) })), [])
  const addToCart = useCallback(
    (id) => {
      setCart((c) => ({ ...c, [id]: Math.min(MAX_QTY, (c[id] || 0) + 1) }))
      flash('Ditambahkan ke tas')
    },
    [flash],
  )
  const toggleWish = useCallback(
    (id) => {
      setWish((w) => ({ ...w, [id]: !w[id] }))
      flash(wish[id] ? 'Dihapus dari wishlist' : 'Disimpan ke wishlist')
    },
    [flash, wish],
  )

  const summary = useMemo(() => {
    const lines = Object.keys(CART_ITEMS).map((id) => {
      const p = PRODUCTS[CART_ITEMS[id].key]
      return { id, product: p, qty: cart[id], total: cart[id] * p.price }
    })
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.total, 0)
    const shipping = count ? SHIPPING : 0
    return { lines, count, subtotal, shipping, total: subtotal + shipping }
  }, [cart])

  const wishCount = Object.values(wish).filter(Boolean).length

  const value = { stack, nav, cart, setQty, addToCart, wish, toggleWish, wishCount, summary, toast, notify: flash }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
