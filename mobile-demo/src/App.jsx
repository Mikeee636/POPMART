import { ShopProvider, useShop } from './context/ShopContext'
import { Frame, Toast } from './components/Layout'
import Home from './screens/Home'
import Search from './screens/Search'
import Category from './screens/Category'
import Detail from './screens/Detail'

// Route name -> screen. Names match the prototype links of the Figma plugin.
const SCREENS = {
  home: Home,
  search: Search,
  list: Category,
  detail: Detail,
}

function Router() {
  const { stack } = useShop()
  const top = stack[stack.length - 1]
  const Current = SCREENS[top.name] || Home
  // Re-key on every navigation so the enter animation plays and scroll resets.
  const key = `${stack.length}:${top.name}:${top.params?.id || ''}`
  return <Current key={key} params={top.params} />
}

export default function App() {
  return (
    <ShopProvider>
      <Frame>
        <Router />
        <Toast />
      </Frame>
    </ShopProvider>
  )
}
