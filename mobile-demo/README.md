# POP MART Indonesia — Mobile Storefront (Static UI/UX Demo)

Static demo of the mobile storefront designed in the Figma plugin mockup (`popmart-figma-plugin`).
Same stack as the admin dashboard: **React 18 + Vite + Tailwind CSS + lucide-react**. No backend, all state is in memory.

## Run

```bash
cd mobile-demo
npm install
npm run dev      # http://localhost:5174
npm run build
```

Two layouts only, no tablet layout: below 1024px the mobile app layout (max 480px column, bottom nav, safe-area padding); from 1024px a web layout (top navbar, centered content, 4-column grids).

## Screens (11, same names as the Figma prototype)

Beranda · Pencarian · Kategori · Detail Produk · Wishlist · Tas · Checkout · Pesanan Berhasil · Pesanan Saya (4 status) · Masuk · Saya

Interactive in the demo: wishlist hearts, add to bag, quantity steppers, shipping/payment selection, live totals and badges, search filter, order status tabs.
Buttons without a flow (Google login, promo code, etc.) only show a toast.

## Structure

```
src/
  data/catalog.js          mock products, IP, orders
  context/ShopContext.jsx  stack router + cart + wishlist
  components/              Icon, ui, ProductCard, Layout (headers, nav, frame)
  screens/                 one file per screen
public/images/             product + IP photos (from "POPMART FILE data")
```
