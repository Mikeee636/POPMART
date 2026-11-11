import Icon from './Icon'
import { IP } from '../data/catalog'

export const cx = (...a) => a.filter(Boolean).join(' ')

export function Button({ kind = 'primary', children, className, ...rest }) {
  return (
    <button
      type="button"
      className={cx(
        't-button h-[52px] px-5 rounded-[10px] inline-flex items-center justify-center gap-2 transition-opacity active:opacity-80',
        kind === 'primary' ? 'bg-black text-white hover:bg-neutral-900' : 'bg-white text-black border-[1.5px] border-black hover:bg-neutral-50',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function IconBtn({ name, size = 44, iconSize = 24, color, sw, label, className, children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label || name}
      style={{ width: size, height: size }}
      className={cx('relative inline-flex items-center justify-center shrink-0', className)}
      {...rest}
    >
      <Icon name={name} size={iconSize} color={color} sw={sw} />
      {children}
    </button>
  )
}

export function CountDot({ value, className }) {
  return (
    <span className={cx('t-label absolute min-w-4 h-4 px-1 rounded-full bg-black text-white inline-flex items-center justify-center font-bold text-[10px] leading-none shadow-sm', className)}>
      {value}
    </span>
  )
}

const BADGES = {
  red: 'bg-black text-white',
  ink: 'bg-black text-white',
  outline: 'bg-white text-ink border border-ink',
  soft: 'bg-surface text-ink2',
}
export function Badge({ kind = 'ink', children, className }) {
  return <span className={cx('t-label inline-flex items-center px-2 py-1 rounded', BADGES[kind], className)}>{children}</span>
}

export function Chip({ active, icon, children, className, style, ...rest }) {
  return (
    <button
      type="button"
      style={{
        backgroundColor: active ? '#111111' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#111111',
        borderColor: active ? '#111111' : '#E7E5E1',
        ...style,
      }}
      className={cx(
        't-caption inline-flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap shrink-0 border transition-all cursor-pointer select-none',
        active ? 'font-bold shadow-sm' : 'font-medium hover:border-[#111111]',
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={16} color={active ? '#FFFFFF' : '#111111'} />}
      {children}
    </button>
  )
}

export function Divider({ dark, className }) {
  return <div className={cx('h-px w-full', dark ? 'bg-darkline' : 'bg-line', className)} />
}

export function SectionHead({ title, link, sub, onLink, className }) {
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="t-title flex-1">{title}</h2>
        {link && (
          <button type="button" onClick={onLink} className="t-caption text-ink2 inline-flex items-center gap-0.5 h-8">
            {link}
            <Icon name="chevRight" size={16} color="#3A3A3A" />
          </button>
        )}
      </div>
      {sub && <p className="t-body text-muted">{sub}</p>}
    </div>
  )
}

// Horizontal scroller that bleeds to the screen edges.
export function HScroll({ children, gap = 8, className, style }) {
  return (
    <div
      className={cx('flex items-center overflow-x-auto no-scrollbar px-4 shrink-0', className)}
      style={{ gap: typeof gap === 'number' ? `${gap}px` : gap, ...style }}
    >
      {children}
    </div>
  )
}

export function Field({ label, icon, focus, ...rest }) {
  return (
    <label className="flex flex-col gap-2">
      {label && <span className="t-caption text-ink2">{label}</span>}
      <span
        className={cx(
          'flex items-center gap-3 h-[52px] px-4 rounded-[10px] bg-white',
          focus ? 'border-[1.5px] border-ink' : 'border border-line focus-within:border-ink',
        )}
      >
        <input className="t-body flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted" {...rest} />
        {icon && <Icon name={icon} size={20} color="#6B6B6B" />}
      </span>
    </label>
  )
}

export function Stepper({ qty, onMinus, onPlus, size = 32 }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-line" style={{ height: size }}>
      <IconBtn name="minus" size={size} iconSize={16} label="Kurang" onClick={onMinus} />
      <span className="t-strong w-7 text-center">{qty}</span>
      <IconBtn name="plus" size={size} iconSize={16} label="Tambah" onClick={onPlus} />
    </div>
  )
}

export function SummaryRow({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={strong ? 't-heading' : 't-body text-ink2'}>{label}</span>
      <span className={strong ? 't-heading' : 't-strong'}>{value}</span>
    </div>
  )
}

export function InfoRow({ icon, title, sub, onClick, className }) {
  const Component = onClick ? 'button' : 'div'
  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cx('flex items-center gap-3 py-2 text-left w-full transition-colors', onClick && 'hover:opacity-80 active:opacity-60 cursor-pointer', className)}
    >
      <Icon name={icon} size={22} />
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <span className="t-strong">{title}</span>
        {sub && <span className="t-caption text-muted">{sub}</span>}
      </div>
      {onClick && <Icon name="chevRight" size={16} color="#6B6B6B" />}
    </Component>
  )
}

export function ListRow({ icon, label, value, danger, last, onClick }) {
  return (
    <>
      <button type="button" onClick={onClick} className="flex items-center gap-3 h-14 w-full text-left">
        <Icon name={icon} size={22} color={danger ? '#D2001E' : '#111'} />
        <span className={cx('t-strong flex-1', danger && 'text-pm')}>{label}</span>
        {value && <span className="t-caption text-muted">{value}</span>}
        {!danger && <Icon name="chevRight" size={18} color="#6B6B6B" />}
      </button>
      {!last && <Divider />}
    </>
  )
}

export function RadioOption({ title, sub, value, on, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx('flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white text-left w-full', on ? 'border-[1.5px] border-ink' : 'border border-line')}
    >
      <span className={cx('w-5 h-5 rounded-full bg-white inline-flex items-center justify-center shrink-0 border-[1.5px]', on ? 'border-ink' : 'border-muted')}>
        {on && <span className="w-2.5 h-2.5 rounded-full bg-ink" />}
      </span>
      <span className="flex-1 flex flex-col gap-0.5">
        <span className="t-strong">{title}</span>
        {sub && <span className="t-caption text-muted">{sub}</span>}
      </span>
      {value && <span className="t-strong">{value}</span>}
    </button>
  )
}

// Product photo, or a tinted IP placeholder when no photo exists (as in the Figma mockup).
export function Thumb({ product, className, text = true, textClass = 't-label' }) {
  const ip = IP[product?.ip] || { tint: '#F5F5F5', ink: '#111111', label: '' }
  return (
    <div className={cx('relative overflow-hidden flex items-center justify-center p-2 text-center', className)} style={{ background: ip.tint }}>
      {product?.img ? (
        <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      ) : (
        text && (
          <span className={textClass} style={{ color: ip.ink }}>
            {ip.label}
          </span>
        )
      )}
    </div>
  )
}
