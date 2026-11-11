import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { ActionBar, BackHeader, Screen } from '../components/Layout'
import Icon from '../components/Icon'
import { Button, Divider, RadioOption, SummaryRow, Thumb } from '../components/ui'
import { SHIPPING } from '../data/catalog'
import { rp } from '../utils/format'

const SHIP_OPTIONS = [
  ['LOCAL EXPRESS', 'Estimasi 2–4 hari kerja', SHIPPING],
  ['GLOBAL EXPRESS', 'Estimasi 7–14 hari kerja', 150000],
]
const PAY_OPTIONS = [
  ['Kartu Kredit / Debit', 'Visa, Mastercard, Amex, JCB'],
  ['PayPal'],
  ['Apple Pay'],
  ['Google Pay'],
]

export default function Checkout() {
  const { nav, summary } = useShop()
  const [ship, setShip] = useState(0)
  const [pay, setPay] = useState(0)
  const filled = summary.lines.filter((l) => l.qty > 0)
  const shipFee = summary.count ? SHIP_OPTIONS[ship][2] : 0
  const total = summary.subtotal + shipFee

  const bottom = (
    <ActionBar>
      <Button
        className="flex-1"
        disabled={!summary.count}
        style={{ opacity: summary.count ? 1 : 0.4 }}
        onClick={() => nav.go('success', { total, ship: SHIP_OPTIONS[ship][0] })}
      >
        BAYAR {rp(total)}
      </Button>
    </ActionBar>
  )

  return (
    <Screen header={<BackHeader title="Checkout" />} bottom={bottom}>
      <div className="flex flex-col gap-7 pt-2 pb-8">
        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Alamat Pengiriman</h2>
          <div className="flex gap-3 p-4 rounded-xl border border-line">
            <Icon name="pin" size={22} />
            <div className="flex-1 flex flex-col gap-1">
              <span className="t-strong">Rina Pratama · +62 812-3456-7890</span>
              <span className="t-caption text-ink2">Jl. Jend. Sudirman No. 12, Senayan, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190</span>
            </div>
            <button type="button" className="t-caption underline self-start">Ubah</button>
          </div>
        </section>

        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Metode Pengiriman</h2>
          {SHIP_OPTIONS.map(([title, sub, fee], i) => (
            <RadioOption key={title} title={title} sub={sub} value={rp(fee)} on={ship === i} onClick={() => setShip(i)} />
          ))}
        </section>

        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Metode Pembayaran</h2>
          {PAY_OPTIONS.map(([title, sub], i) => (
            <RadioOption key={title} title={title} sub={sub} on={pay === i} onClick={() => setPay(i)} />
          ))}
        </section>

        <section className="px-4 flex flex-col gap-3">
          <h2 className="t-heading">Ringkasan Pesanan</h2>
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface">
            {filled.map(({ id, product: p, qty, total: lineTotal }) => (
              <div key={id} className="flex items-center gap-3">
                <Thumb product={p} text={false} className="w-12 h-12 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="t-caption truncate">{p.name}</span>
                  <span className="t-caption text-muted">{qty} × {rp(p.price)}</span>
                </div>
                <span className="t-strong">{rp(lineTotal)}</span>
              </div>
            ))}
            <Divider />
            <SummaryRow label="Subtotal" value={rp(summary.subtotal)} />
            <SummaryRow label="Ongkos kirim" value={rp(shipFee)} />
            <SummaryRow strong label="Total" value={rp(total)} />
          </div>
        </section>
      </div>
    </Screen>
  )
}
