// Mock catalog taken from the Figma plugin mockup. Hirono prices are from popmart.com/id,
// the rest are illustrative. Images come from "POPMART FILE data".
import { asset } from '../utils/asset'

const img = (f) => asset(`products/${f}`)
const ipImg = (f) => asset(`ip/${f}`)

export const SHIPPING = 20000
export const MAX_QTY = 5

export const IP = {
  attic: { label: 'THE ATTIC OF ODDITIES', tint: '#EADFCF', ink: '#6E5536' },
  hirono: { label: 'HIRONO', tint: '#E3EADB', ink: '#4F6141', img: ipImg('hirono.png') },
  skullpanda: { label: 'SKULLPANDA', tint: '#E6E1F3', ink: '#554A7A', img: ipImg('skullpanda.png') },
  monsters: { label: 'THE MONSTERS', tint: '#F4E3D3', ink: '#7A5434', img: ipImg('monsters.png') },
  dimoo: { label: 'DIMOO', tint: '#DCE8F5', ink: '#3F5C7D' },
  crybaby: { label: 'CRYBABY', tint: '#F6DCE3', ink: '#84455A' },
  twinkle: { label: 'Twinkle Twinkle', tint: '#FBF0C8', ink: '#7A6420' },
  molly: { label: 'MOLLY', tint: '#DDEFEA', ink: '#3D6B5F', img: ipImg('molly.png') },
}

export const PRODUCTS = {
  attic: { id: 'attic', name: 'The Attic of Oddities Series Figures', price: 199000, ip: 'attic', ship: 'LOCAL EXPRESS', tag: 'POPULER' },
  hironoShelter: { id: 'hironoShelter', cart: 'shelter', name: 'Hirono Shelter Series Figures', price: 179000, ip: 'hirono', ship: 'LOCAL EXPRESS', tag: 'POPULER', img: img('hirono-shelter.png'), variant: 'Single Box' },
  hironoPrince: { id: 'hironoPrince', cart: 'prince', name: 'Hirono The Little Prince Figurine', price: 1750000, ip: 'hirono', ship: 'LOCAL EXPRESS', img: img('hirono-prince.png'), variant: 'Figurine' },
  skullpanda: { id: 'skullpanda', name: 'SKULLPANDA Series Figures', price: 199000, ip: 'skullpanda', ship: 'LOCAL EXPRESS', tag: 'POPULER', img: img('skullpanda.png') },
  monsters: { id: 'monsters', name: 'THE MONSTERS Vinyl Plush Pendant', price: 459000, ip: 'monsters', ship: 'GLOBAL EXPRESS', img: img('monsters.png') },
  dimoo: { id: 'dimoo', name: 'DIMOO Series Figures', price: 189000, ip: 'dimoo', ship: 'LOCAL EXPRESS' },
  crybaby: { id: 'crybaby', name: 'CRYBABY Series Figures', price: 189000, ip: 'crybaby', ship: 'LOCAL EXPRESS', tag: 'POPULER' },
  twinkle: { id: 'twinkle', name: 'Twinkle Twinkle Series Figures', price: 189000, ip: 'twinkle', ship: 'LOCAL EXPRESS' },
  molly: { id: 'molly', name: 'MEGA SPACE MOLLY 400% Game of Thrones', price: 3299000, ip: 'molly', ship: 'GLOBAL EXPRESS', img: img('molly-mega.png') },
}

// Only the two Hirono products can be bought in the demo (same as the Figma prototype).
export const CART_ITEMS = {
  shelter: { key: 'hironoShelter', start: 1 },
  prince: { key: 'hironoPrince', start: 1 },
}
export const WISH_START = { shelter: false, prince: true }

export const IP_STRIP = ['skullpanda', 'monsters', 'twinkle', 'dimoo', 'crybaby', 'hirono']

export const CATEGORIES = [
  ['Semua Kotak Buta', 'box'],
  ['Figurine', 'sparkle'],
  ['Tas', 'bag'],
  ['Boneka Plush', 'heart'],
]

export const MEGA_ITEMS = [
  ['MEGA SPACE MOLLY 1000% Ashley Wood', '1000%'],
  ['MEGA SPACE MOLLY 400% Game of Thrones', '400%'],
  ['MEGA JUST DIMOO 700% Meadow of Dreams', '700%'],
]

export const POPULAR_KEYS = ['hironoShelter', 'hironoPrince', 'skullpanda', 'crybaby']
export const LIST_KEYS = ['hironoShelter', 'hironoPrince', 'skullpanda', 'crybaby', 'monsters', 'dimoo', 'twinkle', 'attic']
export const LIST_CHIPS = ['Semua', 'Kotak Buta', 'Figurine', 'Vinyl Plush', 'Tas', 'MEGA']
export const SEARCH_POPULAR = ['SKULLPANDA', 'HIRONO', 'DIMOO', 'CRYBABY', 'THE MONSTERS', 'MOLLY', 'Kotak Buta', 'Vinyl Plush']
export const SEARCH_HISTORY = ['skullpanda', 'the monsters', 'kotak buta']

export const ORDER_TABS = [
  ['unpaid', 'Belum Bayar', 'wallet'],
  ['packed', 'Dikemas', 'box'],
  ['shipped', 'Dikirim', 'truck'],
  ['done', 'Selesai', 'checkCircle'],
]

export const ORDERS = {
  unpaid: [
    {
      no: 'PM-ID-241104', date: '04 Nov 2026', badge: ['Menunggu Pembayaran', 'red'],
      items: [['hironoShelter', 'Single Box', 2]],
      note: ['clock', 'Bayar sebelum 05 Nov 2026, 23.59 WIB'],
      actions: [['secondary', 'BATALKAN', null], ['primary', 'BAYAR', 'checkout']],
    },
  ],
  packed: [
    {
      no: 'PM-ID-240531', date: '31 Okt 2026', badge: ['Dikemas', 'ink'],
      items: [['hironoShelter', 'Single Box', 1], ['hironoPrince', 'Figurine', 1]],
      note: ['box', 'Pesanan sedang dikemas di gudang Jakarta.'],
      actions: [['secondary', 'HUBUNGI CS', null]],
    },
  ],
  shipped: [
    {
      no: 'PM-ID-240518', date: '18 Okt 2026', badge: ['Dalam Pengiriman', 'ink'],
      items: [['skullpanda', 'Single Box', 1], ['dimoo', 'Single Box', 1]],
      note: ['truck', 'LOCAL EXPRESS · Resi JX0012345678 · Estimasi tiba 06 Nov'],
      actions: [['secondary', 'LACAK', null], ['primary', 'DITERIMA', null]],
    },
  ],
  done: [
    {
      no: 'PM-ID-240402', date: '02 Okt 2026', badge: ['Selesai', 'soft'],
      items: [['crybaby', 'Single Box', 2]],
      note: ['checkCircle', 'Diterima 06 Okt 2026'],
      actions: [['secondary', 'BERI ULASAN', null], ['primary', 'BELI LAGI', 'list']],
    },
    {
      no: 'PM-ID-240311', date: '11 Sep 2026', badge: ['Selesai', 'soft'],
      items: [['monsters', 'Pendant', 1]],
      note: ['checkCircle', 'Diterima 15 Sep 2026'],
      actions: [['secondary', 'BERI ULASAN', null], ['primary', 'BELI LAGI', 'list']],
    },
  ],
}
