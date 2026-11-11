import { motion, AnimatePresence } from 'framer-motion'
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
  account: Account,
}

function Router() {
  const { stack } = useShop()
  const top = stack[stack.length - 1]
  const Current = SCREENS[top.name] || Home
  // Re-key on every navigation so Framer Motion plays the transition and scroll resets.
  const key = `${stack.length}:${top.name}:${top.params?.id || top.params?.tab || ''}`

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1 flex flex-col"
      >
        <Current params={top.params} />
      </motion.div>
    </AnimatePresence>
  )
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
