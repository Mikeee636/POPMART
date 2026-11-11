import { useShop } from '../context/ShopContext'
import { BackHeader, Screen } from '../components/Layout'
import { Button, Field } from '../components/ui'

export default function Login() {
  const { nav, notify } = useShop()
  const demo = () => notify('Demo: tombol ini hanya tampilan')
  return (
    <Screen narrow header={<BackHeader title="" />}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          nav.tab('account') // static demo: any input logs in
        }}
        className="flex flex-col gap-5 px-6 pt-4 pb-8"
      >
        <div className="flex flex-col gap-2">
          <img src="./images/logo-appicon.png" alt="POP MART" className="w-16 h-16" />
          <div className="h-1" />
          <h2 className="t-display">Masuk ke akun kamu</h2>
          <p className="t-body text-ink2">Lacak pesanan, simpan wishlist, dan jadi yang pertama tahu rilis terbaru.</p>
        </div>
        <div className="h-1" />
        <Field label="Email" type="email" placeholder="nama@email.com" />
        <Field label="Kata sandi" type="password" placeholder="••••••••" icon="eye" />
        <div className="flex justify-end">
          <button type="button" onClick={demo} className="t-caption underline">Lupa kata sandi?</button>
        </div>
        <Button type="submit">MASUK</Button>
        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-line" />
          <span className="t-caption text-muted">atau</span>
          <span className="flex-1 h-px bg-line" />
        </div>
        <Button kind="secondary" onClick={demo}>LANJUTKAN DENGAN GOOGLE</Button>
        <Button kind="secondary" onClick={demo}>LANJUTKAN DENGAN APPLE</Button>
        <p className="flex justify-center gap-1 py-2 t-caption">
          <span className="text-ink2">Belum punya akun?</span>
          <button type="button" onClick={demo} className="underline">Daftar</button>
        </p>
      </form>
    </Screen>
  )
}
