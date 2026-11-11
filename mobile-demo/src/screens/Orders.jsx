import { useShop } from '../context/ShopContext'
import { BackHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import { Badge, Button, Chip, Divider, Thumb } from '../components/ui'
import { ORDERS, ORDER_TABS, PRODUCTS, SHIPPING } from '../data/catalog'
import { rp } from '../utils/format'

function OrderCard({ order }) {
  const { nav, notify } = useShop()
  const count = order.items.reduce((n, [, , q]) => n + q, 0)
  const total = order.items.reduce((n, [k, , q]) => n + PRODUCTS[k].price * q, 0) + SHIPPING

  const act = (target) => (target ? nav.go(target === 'list' ? 'list' : target) : notify('Demo: aksi ini hanya tampilan'))

  return (
    <article className="flex flex-col gap-3.5 p-4 rounded-xl border border-line bg-white">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="t-strong">{order.no}</span>
          <span className="t-caption text-muted">{order.date}</span>
        </div>
        <Badge kind={order.badge[1]}>{order.badge[0]}</Badge>
      </div>
      <Divider />

      {order.items.map(([key, variant, qty]) => {
        const p = PRODUCTS[key]
        return (
          <button key={key} type="button" onClick={() => nav.go('detail', { id: p.id })} className="flex items-center gap-3 text-left">
            <Thumb product={p} className="w-16 h-16 rounded-[10px] shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className="t-strong line-clamp-2">{p.name}</span>
              <span className="t-caption text-muted">{variant} · {qty} × {rp(p.price)}</span>
            </div>
          </button>
        )
      })}

      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface">
        <Icon name={order.note[0]} size={18} color="#3A3A3A" />
        <span className="t-caption text-ink2 flex-1">{order.note[1]}</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="t-caption text-ink2">Total ({count} produk, termasuk ongkir)</span>
        <span className="t-price">{rp(total)}</span>
      </div>

      <div className="flex gap-2.5">
        {order.actions.map(([kind, label, target]) => (
          <Button key={label} kind={kind} className="flex-1 px-2" onClick={() => act(target)}>
            {label}
          </Button>
        ))}
      </div>
    </article>
  )
}

export default function Orders({ params }) {
  const { nav } = useShop()
  const tab = params?.tab || 'unpaid'
  const orders = ORDERS[tab]

  const tabs = (cls) => (
    <div className={`flex gap-2 px-4 overflow-x-auto no-scrollbar ${cls}`}>
      {ORDER_TABS.map(([k, label]) => (
        <Chip key={k} active={k === tab} onClick={() => k !== tab && nav.swap('orders', { tab: k })}>
          {label}
        </Chip>
      ))}
    </div>
  )

  return (
    <Screen narrow header={<BackHeader title="Pesanan Saya">{tabs('pt-1 pb-3 lg:hidden')}</BackHeader>}>
      <h1 className="hidden lg:block t-display px-4 pt-4">Pesanan Saya</h1>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-8">
        <div className="hidden lg:flex -mx-4">{tabs('pb-1')}</div>
        <span className="t-caption text-muted">{orders.length} pesanan</span>
        {orders.map((o) => (
          <OrderCard key={o.no} order={o} />
        ))}
      </div>
    </Screen>
  )
}
