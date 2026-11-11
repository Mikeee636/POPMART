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
          {actions.includes('help') && <IconBtn name="help" label="Bantuan" />}
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

// ---------- mobile bottom bars ----------

const TABS = [
  ['Beranda', 'home', 'home'],
  ['Kategori', 'grid', 'list'],
  ['Tas', 'bag', 'cart'],
  ['Saya', 'user', 'account'],
]

export function BottomNav({ active }) {
  const { nav, summary } = useShop()
  return (
    <nav className={cx('lg:hidden shrink-0 bg-white border-t border-line z-10 pt-2', SAFE_BOTTOM)}>
      <div className="h-[50px] px-2 flex">
        {TABS.map(([label, ic, target]) => {
          const on = target === active
          return (
            <button key={target} type="button" onClick={() => !on && nav.tab(target)} className="relative flex-1 flex flex-col items-center gap-1" aria-current={on ? 'page' : undefined}>
              <span className="relative">
                <Icon name={ic} size={24} color={on ? '#111' : '#6B6B6B'} sw={on ? 2.2 : 1.75} />
                {target === 'cart' && summary.count > 0 && <CountDot value={summary.count} className="-top-1 left-4" />}
              </span>
              <span className={cx(on ? 't-nav-active text-ink' : 't-nav text-muted')}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function ActionBar({ children }) {
  return (
    <div className={cx('shrink-0 bg-white shadow-bar z-10 pt-3', SAFE_BOTTOM)}>
      <div className="flex items-center gap-3 px-4 w-full lg:max-w-[640px] lg:mx-auto">{children}</div>
    </div>
  )
}

// ---------- desktop navbar (hidden below lg) ----------

const DESKTOP_LINKS = [
  ['Beranda', 'home'],
  ['Kategori', 'list'],
  ['Pesanan Saya', 'orders'],
  ['Akun', 'account'],
]

function DesktopNav() {
  const { stack, nav } = useShop()
  const current = stack[stack.length - 1].name
  const go = (name) => (name === 'orders' ? nav.go('orders', { tab: 'unpaid' }) : nav.tab(name))
  return (
    <header className="hidden lg:block shrink-0 bg-white border-b border-line z-20">
      <div className="mx-auto max-w-[1120px] h-[72px] px-8 flex items-center gap-8">
        <button type="button" onClick={() => nav.tab('home')} aria-label="POP MART">
          <img src={asset('logo-wordmark.png')} alt="POP MART" className="h-8 w-auto" />
        </button>
        <nav className="flex items-center gap-1">
          {DESKTOP_LINKS.map(([label, name]) => (
            <button
              key={name}
              type="button"
              onClick={() => go(name)}
              className={cx('t-strong px-3 h-10 rounded-lg hover:bg-surface', current === name ? 'text-ink underline underline-offset-[10px] decoration-2' : 'text-ink2')}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => nav.go('search')}
          className="ml-auto flex items-center gap-2.5 h-11 w-72 px-3.5 rounded-[10px] bg-surface text-left"
        >
          <Icon name="search" size={20} />
          <span className="t-body text-muted">Cari produk…</span>
        </button>
        <div className="flex items-center">
          <WishButton />
          <BagButton />
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
    <div className="screen-enter h-full flex flex-col bg-white">
      <DesktopNav />
      {header}
      <main className={cx('flex-1 overflow-y-auto overflow-x-hidden no-scrollbar')}>
        <div className={cx('mx-auto w-full', narrow ? 'lg:max-w-[640px]' : 'lg:max-w-[1120px] lg:px-4', className)}>
          {stack.length > 1 && (
            <button type="button" onClick={nav.back} className="hidden lg:inline-flex items-center gap-1 t-caption text-ink2 h-10 mt-4 mb-1 px-4">
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
  if (!toast) return null
  return (
    <div role="status" className="toast-enter t-caption absolute left-1/2 bottom-28 lg:bottom-10 z-50 bg-ink text-white px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap">
      {toast}
    </div>
  )
}

// Phone column (max 480px) below lg, full-width web page on lg+.
export function Frame({ children }) {
  return (
    <div className="store-root h-[100dvh] bg-surface">
      <div className="relative h-full w-full max-w-[480px] lg:max-w-none mx-auto bg-white overflow-hidden shadow-[0_0_0_1px_#E7E5E1] lg:shadow-none">
        {children}
      </div>
    </div>
  )
}
