import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import Icon from './Icon'
import { IconBtn, CountDot, cx } from './ui'
import { asset } from '../utils/asset'

/*
  Two layouts only (no tablet layout):
  - below lg (1024px): mobile app layout (header, scroll body, bottom bar), capped to a 480px column
  - lg and up: web layout (top navbar, centered content, no bottom nav)
*/

// Bottom padding that clears the iPhone home indicator / Android gesture bar, plus a little breathing room.
const SAFE_BOTTOM = 'pb-[calc(env(safe-area-inset-bottom,0px)+14px)] lg:pb-3'

export function WishButton() {
  const { nav, wishCount } = useShop()
  return (
    <IconBtn name="heart" label="Wishlist" onClick={() => nav.go('wishlist')}>
      {wishCount > 0 && <CountDot value={wishCount} className="top-[5px] left-6" />}
    </IconBtn>
  )
}

export function BagButton() {
  const { nav, summary } = useShop()
  return (
    <IconBtn name="bag" label="Tas" onClick={() => nav.go('cart')}>
      {summary.count > 0 && <CountDot value={summary.count} className="top-[5px] left-6" />}
    </IconBtn>
  )
}

export function UserButton() {
  const { nav } = useShop()
  return (
    <IconBtn name="user" label="Saya" onClick={() => nav.tab('account')} />
  )
}

// ---------- mobile headers (hidden on desktop) ----------

function HeaderShell({ children }) {
  return <header className="lg:hidden shrink-0 bg-white border-b border-line z-10 pt-[env(safe-area-inset-top,0px)]">{children}</header>
}

export function LogoHeader() {
  const { nav } = useShop()
  return (
    <HeaderShell>
      <div className="h-14 pl-4 pr-2 flex items-center justify-between">
        <img src={asset('logo-wordmark.png')} alt="POP MART" className="h-[30px] w-auto" />
        <div className="flex items-center">
          <IconBtn name="search" label="Cari" onClick={() => nav.go('search')} />
          <WishButton />
          <BagButton />
        </div>
      </div>
    </HeaderShell>
  )
}

export function TitleHeader({ title, actions = [] }) {
  const { nav } = useShop()
  return (
    <HeaderShell>
      <div className="h-14 pl-4 pr-2 flex items-center justify-between">
        <h1 className="t-title">{title}</h1>
        <div className="flex items-center">
          {actions.includes('search') && <IconBtn name="search" label="Cari" onClick={() => nav.go('search')} />}
          {actions.includes('help') && <IconBtn name="help" label="Bantuan" onClick={() => nav.go('account')} />}
          {actions.includes('cart') && (
            <>
              <WishButton />
              <BagButton />
            </>
          )}
        </div>
      </div>
    </HeaderShell>
  )
}

export function BackHeader({ title, cart, close, onBack, children }) {
  const { nav } = useShop()
  return (
    <HeaderShell>
      <div className="h-14 px-2 flex items-center">
        <IconBtn name={close ? 'close' : 'back'} label={close ? 'Tutup' : 'Kembali'} onClick={onBack || nav.back} />
        <h1 className="t-heading flex-1 text-center truncate">{title}</h1>
        {cart ? <BagButton /> : <div className="w-11 h-11" />}
      </div>
      {children}
    </HeaderShell>
  )
}

// ---------- mobile bottom bars (hanya tampil di mobile: lg:hidden) ----------

const TABS = [
  ['Beranda', 'home', 'home'],
  ['Kategori', 'grid', 'list'],
  ['Tas', 'bag', 'cart'],
  ['Saya', 'user', 'account'],
]

export function BottomNav({ active }) {
  const { nav, summary } = useShop()

  return (
    <nav className="fixed bottom-0 inset-x-0 lg:hidden z-40 bg-white border-t border-line shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="w-full max-w-[480px] mx-auto h-[54px] px-2 flex items-center justify-around">
        {TABS.map(([label, ic, target]) => {
          const on = target === active
          return (
            <button
              key={target}
              type="button"
              onClick={() => !on && nav.tab(target)}
              className="relative flex-1 flex flex-col items-center justify-center gap-1 h-full cursor-pointer active:scale-95 transition-transform"
              aria-current={on ? 'page' : undefined}
            >
              <span className="relative flex items-center justify-center">
                <Icon
                  name={ic}
                  size={24}
                  color={on ? '#111111' : '#6B6B6B'}
                  sw={on ? 2.2 : 1.75}
                />
                {target === 'cart' && summary.count > 0 && (
                  <CountDot value={summary.count} className="-top-1 left-4" />
                )}
              </span>
              <span className={cx(on ? 't-nav-active text-ink font-semibold' : 't-nav text-muted')}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function ActionBar({ children }) {
  return (
    <div className="fixed lg:static bottom-0 inset-x-0 z-40 bg-white shadow-bar pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] lg:pb-3 border-t border-line/60">
      <div className="flex items-center gap-3 px-4 w-full max-w-[480px] lg:max-w-[640px] mx-auto">{children}</div>
    </div>
  )
}

// ---------- desktop navbar (hidden below lg) ----------

const DESKTOP_LINKS = [
  ['Beranda', 'home'],
  ['Kategori', 'list'],
  ['Pesanan Saya', 'orders'],
]

function DesktopNav() {
  const { stack, nav } = useShop()
  const current = stack[stack.length - 1].name
  const go = (name) => (name === 'orders' ? nav.go('orders', { tab: 'unpaid' }) : nav.tab(name))
  return (
    <header className="hidden lg:block shrink-0 bg-white border-b border-line z-20">
      <div className="mx-auto max-w-[1120px] h-[72px] px-8 flex items-center gap-8">
        <button type="button" onClick={() => nav.tab('home')} aria-label="POP MART" className="cursor-pointer">
          <img src={asset('logo-wordmark.png')} alt="POP MART" className="h-8 w-auto" />
        </button>
        <nav className="flex items-center gap-1">
          {DESKTOP_LINKS.map(([label, name]) => (
            <button
              key={name}
              type="button"
              onClick={() => go(name)}
              className={cx(
                't-strong px-3 h-10 rounded-lg hover:bg-surface cursor-pointer transition-colors',
                current === name ? 'text-ink underline underline-offset-[10px] decoration-2 font-bold' : 'text-ink2'
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => nav.go('search')}
          className="ml-auto flex items-center gap-2.5 h-11 w-72 px-3.5 rounded-[10px] bg-surface text-left cursor-pointer hover:bg-neutral-100 transition-colors"
        >
          <Icon name="search" size={20} />
          <span className="t-body text-muted">Cari produk…</span>
        </button>
        <div className="flex items-center">
          <WishButton />
          <BagButton />
          <UserButton />
        </div>
      </div>
    </header>
  )
}

// ---------- screen shell ----------

// narrow = single centered column on desktop (forms, cart, orders); otherwise full 1120px content width.
export function Screen({ header, bottom, children, className, narrow }) {
  const { stack, nav } = useShop()
  return (
    <div className="min-h-screen lg:h-full flex flex-col bg-white">
      <DesktopNav />
      {header}
      <main className={cx('flex-1 pb-24 lg:pb-8 lg:overflow-y-auto overflow-x-hidden')}>
        <div className={cx('mx-auto w-full', narrow ? 'lg:max-w-[640px]' : 'lg:max-w-[1120px] lg:px-4', className)}>
          {stack.length > 1 && (
            <button type="button" onClick={nav.back} className="hidden lg:inline-flex items-center gap-1 t-caption text-ink2 h-10 mt-4 mb-1 px-4 cursor-pointer hover:text-ink">
              <Icon name="back" size={16} color="#3A3A3A" />
              Kembali
            </button>
          )}
          {children}
        </div>
      </main>
      {bottom}
    </div>
  )
}

export function Toast() {
  const { toast } = useShop()
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 14, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 14, x: '-50%' }}
          transition={{ duration: 0.2 }}
          className="t-caption fixed left-1/2 bottom-20 lg:bottom-10 z-50 bg-black text-white px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Phone column (max 480px) below lg, full-width web page on lg+.
export function Frame({ children }) {
  return (
    <div className="store-root min-h-screen w-full bg-surface">
      <div className="relative min-h-screen w-full max-w-[480px] lg:max-w-none mx-auto bg-white shadow-[0_0_0_1px_#E7E5E1] lg:shadow-none">
        {children}
      </div>
    </div>
  )
}
