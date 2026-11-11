import { useShop } from '../context/ShopContext'
import { BackHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import { Button, SummaryRow } from '../components/ui'
import { rp } from '../utils/format'

export default function Success({ params }) {
  const { nav, summary } = useShop()
  const total = params?.total ?? summary.total
  return (
    <Screen narrow header={<BackHeader title="" close onBack={() => nav.tab('home')} />}>
      <div className="flex flex-col items-center gap-6 px-6 pt-10 pb-8">
        <span className="w-[88px] h-[88px] rounded-full bg-ink flex items-center justify-center">
          <Icon name="check" size={40} color="#fff" sw={2.5} />
        </span>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="t-display">Pesanan Berhasil</h2>
          <p className="t-body text-ink2">Terima kasih! Pesanan kamu sedang kami proses. Detailnya sudah dikirim ke email kamu.</p>
        </div>
        <div className="w-full flex flex-col gap-3 p-4 rounded-xl bg-surface">
          <SummaryRow label="Nomor pesanan" value="PM-ID-240531" />
          <SummaryRow label="Pengiriman" value={params?.ship || 'LOCAL EXPRESS'} />
          <SummaryRow strong label="Total dibayar" value={rp(total)} />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button onClick={() => nav.go('orders', { tab: 'packed' })}>LIHAT PESANAN SAYA</Button>
          <Button kind="secondary" onClick={() => nav.tab('home')}>LANJUT BELANJA</Button>
        </div>
      </div>
    </Screen>
  )
}
