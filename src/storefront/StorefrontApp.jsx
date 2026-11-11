import { ShopProvider, useShop } from './context/ShopContext'
import { Frame, Toast } from './components/Layout'
import Home from './screens/Home'
import Search from './screens/Search'
import Category from './screens/Category'
import Detail from './screens/Detail'
import Wishlist from './screens/Wishlist'
import Cart from './screens/Cart'
import Checkout from './screens/Checkout'
import Success from './screens/Success'
import Orders from './screens/Orders'
import Login from './screens/Login'
import Account from './screens/Account'

// Route name -> screen. Names match the prototype links of the Figma plugin.
const SCREENS = {
  home: Home,
  search: Search,
  list: Category,
  detail: Detail,
  wishlist: Wishlist,
  cart: Cart,
  checkout: Checkout,
  success: Success,
  orders: Orders,
  login: Login,
  account: Account,
}

function Router() {
  const { stack } = useShop()
  const top = stack[stack.length - 1]
  const Current = SCREENS[top.name] || Home
  // Re-key on every navigation so the enter animation plays and scroll resets.
  const key = `${stack.length}:${top.name}:${top.params?.id || top.params?.tab || ''}`
  return <Current key={key} params={top.params} />
}

export default function StorefrontApp() {
  return (
    <ShopProvider>
      <Frame>
        <Router />
        <Toast />
      </Frame>
    </ShopProvider>
  )
}
