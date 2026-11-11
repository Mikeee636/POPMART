import { useShop } from '../context/ShopContext'
import { BottomNav, Screen, TitleHeader } from '../components/Layout'
import Icon from '../components/Icon'
import { CountDot, ListRow, SectionHead } from '../components/ui'
import { ORDERS, ORDER_TABS } from '../data/catalog'

export default function Account() {
  const { nav, notify, wishCount } = useShop()
  const demo = () => notify('Demo: menu ini hanya tampilan')

  return (
    <Screen narrow header={<TitleHeader title="Saya" actions={['help', 'cart']} />} bottom={<BottomNav active="account" />}>
      <div className="flex flex-col gap-7 pt-4 pb-8">
        <section className="px-4 flex items-center gap-3.5">
          <span className="w-16 h-16 rounded-full bg-surface flex items-center justify-center t-heading">RP</span>
          <div className="flex-1 flex flex-col gap-0.5">
            <h2 className="t-title">Rina Pratama</h2>
            <span className="t-caption text-muted">rina.p@email.com</span>
          </div>
          <Icon name="chevRight" size={20} color="#6B6B6B" />
        </section>

        <section className="px-4 flex flex-col gap-4">
          <SectionHead title="Pesanan Saya" link="Lihat semua" onLink={() => nav.go('orders', { tab: 'unpaid' })} />
          <div className="flex py-4 px-1 rounded-xl bg-surface">
            {ORDER_TABS.map(([key, label, ic]) => {
              const n = key === 'done' ? 0 : ORDERS[key].length
              return (
                <button key={key} type="button" onClick={() => nav.go('orders', { tab: key })} className="flex-1 flex flex-col items-center gap-2">
                  <span className="relative w-8 h-7 flex items-center justify-center">
                    <Icon name={ic} size={24} />
                    {n > 0 && <CountDot value={n} className="-top-1 left-5" />}
                  </span>
                  <span className="t-caption text-center">{label}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="px-4 flex flex-col">
          <ListRow icon="heart" label="Wishlist" value={`${wishCount} produk`} onClick={() => nav.go('wishlist')} />
          <ListRow icon="pin" label="Alamat Pengiriman" onClick={demo} />
          <ListRow icon="globe" label="Negara & Bahasa" value="IDR · Indonesia" onClick={demo} />
          <ListRow icon="help" label="Pusat Bantuan (FAQ)" onClick={demo} />
          <ListRow icon="mail" label="Hubungi Kami" onClick={demo} />
          <ListRow icon="logout" label="Keluar" danger last onClick={() => nav.go('login')} />
        </section>
      </div>
    </Screen>
  )
}
