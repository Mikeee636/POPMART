import { useShop } from '../context/ShopContext'
import Icon from './Icon'
import { IconBtn, CountDot, cx } from './ui'

// Decorative iOS status bar + home indicator: only shown inside the desktop phone frame.
export function StatusBar() {
  return (
    <div className="hidden sm:flex h-[47px] px-7 items-center justify-between shrink-0">
      <span className="t-strong">9:41</span>
      <svg width="67" height="12" viewBox="0 0 67 12" fill="none" aria-hidden="true">
        <rect x="0" y="8" width="3" height="4" rx="1" fill="#111" />
        <rect x="5" y="6" width="3" height="6" rx="1" fill="#111" />
        <rect x="10" y="4" width="3" height="8" rx="1" fill="#111" />
        <rect x="15" y="2" width="3" height="10" rx="1" fill="#111" />
        <path d="M24 4.5a11 11 0 0 1 15 0" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M26.6 7.3a7 7 0 0 1 9.8 0" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="31.5" cy="10.3" r="1.3" fill="#111" />
        <rect x="42.5" y="0.5" width="21" height="11" rx="3" stroke="#111" strokeOpacity="0.4" />
        <rect x="44.5" y="2.5" width="17" height="7" rx="1.5" fill="#111" />
        <rect x="64.5" y="4" width="1.5" height="4" rx="0.75" fill="#111" fillOpacity="0.4" />
      </svg>
    </div>
  )
}

export function HomeIndicator() {
  return (
    <div className="hidden sm:flex h-7 items-center justify-center">
      <div className="w-[134px] h-[5px] rounded-full bg-ink" />
    </div>
  )
}

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

function HeaderShell({ children }) {
  return (
    <header className="shrink-0 bg-white border-b border-line z-10">
      <StatusBar />
      {children}
    </header>
  )
}

export function LogoHeader() {
  const { nav } = useShop()
  return (
    <HeaderShell>
      <div className="h-14 pl-4 pr-2 flex items-center justify-between">
        <img src="./images/logo-wordmark.png" alt="POP MART" className="h-[30px] w-auto" />
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

const TABS = [
  ['Beranda', 'home', 'home'],
  ['Kategori', 'grid', 'list'],
  ['Tas', 'bag', 'cart'],
  ['Saya', 'user', 'account'],
]

export function BottomNav({ active }) {
  const { nav } = useShop()
  return (
    <nav className="shrink-0 bg-white border-t border-line z-10">
      <div className="h-[58px] px-2 pt-2 flex">
        {TABS.map(([label, ic, target]) => {
          const on = target === active
          return (
            <button key={target} type="button" onClick={() => !on && nav.tab(target)} className="flex-1 flex flex-col items-center gap-1" aria-current={on ? 'page' : undefined}>
              <Icon name={ic} size={24} color={on ? '#111' : '#6B6B6B'} sw={on ? 2.2 : 1.75} />
              <span className={cx(on ? 't-nav-active text-ink' : 't-nav text-muted')}>{label}</span>
            </button>
          )
        })}
      </div>
      <HomeIndicator />
    </nav>
  )
}

export function ActionBar({ children }) {
  return (
    <div className="shrink-0 bg-white shadow-bar z-10">
      <div className="flex items-center gap-3 px-4 pt-3 pb-1">{children}</div>
      <HomeIndicator />
    </div>
  )
}

// Fixed header + scrolling body + fixed bottom bar.
export function Screen({ header, bottom, children, className }) {
  return (
    <div className="screen-enter h-full flex flex-col bg-white">
      {header}
      <main className={cx('flex-1 overflow-y-auto overflow-x-hidden no-scrollbar', className)}>{children}</main>
      {bottom}
    </div>
  )
}

export function Toast() {
  const { toast } = useShop()
  if (!toast) return null
  return (
    <div role="status" className="toast-enter t-caption absolute left-1/2 bottom-24 z-50 bg-ink text-white px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap">
      {toast}
    </div>
  )
}

// Phone-sized column on mobile; framed device on desktop.
export function Frame({ children }) {
  return (
    <div className="min-h-full flex items-center justify-center bg-surface sm:bg-[#E9E7E2] sm:p-6">
      <div className="relative w-full h-[100dvh] sm:w-[390px] sm:h-[844px] sm:max-h-[calc(100dvh-48px)] bg-white overflow-hidden sm:rounded-[44px] sm:ring-[10px] sm:ring-ink sm:shadow-2xl">
        {children}
      </div>
    </div>
  )
}
