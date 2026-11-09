export const DEFAULT_CATEGORIES = [];

export const DEFAULT_IPS = [
  {
    id: 'ip-1',
    name: 'SKULLPANDA',
    artist: 'Xiongmao',
    description: 'Karakter ikonik bergaya avant-garde, gothic, dan futuristik dengan telinga bola bulat khas serta estetika modern yang berani.',
    badgeColor: '#18181b',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ip-2',
    name: 'HIRONO',
    artist: 'Lang',
    description: 'Eksplorasi emosional masa kecil, kerapuhan jiwa, dan kejujuran puitis yang menyentuh hati melalui patung karakter ekspresif.',
    badgeColor: '#52525b',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'
  }
];

export const DEFAULT_PRODUCTS = [
  // SKULLPANDA Products
  {
    id: 'PRD-101',
    sku: 'PM-SKP-MRG-PC',
    name: 'SKULLPANDA The Mirage Series Phone Chain',
    ipId: 'ip-1',
    price: 289000,
    costPrice: 145000,
    stock: 38,
    sold: 142,
    status: 'active',
    editionType: 'Phone Chain',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
    description: 'Gantungan strap handphone edisi The Mirage dengan beads premium, detail mutiara sintetis, dan charm logam Skullpanda doff eksklusif.'
  },
  {
    id: 'PRD-102',
    sku: 'PM-SKP-MRG-HB',
    name: 'SKULLPANDA The Mirage Series Handbag',
    ipId: 'ip-1',
    price: 1450000,
    costPrice: 850000,
    stock: 14,
    sold: 56,
    status: 'active',
    editionType: 'Handbag',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    description: 'Handbag kulit sintetis premium bertema The Mirage dengan tekstur embossed motif Skullpanda dan rantai logam matte silver.'
  },
  {
    id: 'PRD-103',
    sku: 'PM-SKP-DUC-16',
    name: 'SKULLPANDA x DUCATI 1/6 Action Figure',
    ipId: 'ip-1',
    price: 4850000,
    costPrice: 2950000,
    stock: 5,
    sold: 32,
    status: 'active',
    editionType: '1/6 Action Figure',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    description: 'Kolaborasi spektakuler Skullpanda bersama Ducati. Action figure skala 1/6 dengan helm balap custom, jaket kulit biker, dan artikulasi sendi presisi.'
  },

  // HIRONO Products
  {
    id: 'PRD-104',
    sku: 'PM-HRN-SHL-01',
    name: 'Hirono Shelter Series Figures',
    ipId: 'ip-2',
    price: 259000,
    costPrice: 135000,
    stock: 45,
    sold: 189,
    status: 'active',
    editionType: 'Figures',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    description: 'Seri Shelter yang menggambarkan perlindungan emosional masa kecil dengan tekstur tanah liat matte puitis khas seniman Lang.'
  },
  {
    id: 'PRD-105',
    sku: 'PM-HRN-TLP-02',
    name: 'Hirono The Little Prince Figurine',
    ipId: 'ip-2',
    price: 890000,
    costPrice: 520000,
    stock: 9,
    sold: 78,
    status: 'active',
    editionType: 'Figurine',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    description: 'Interpretasi mendalam Hirono tentang kisah Sang Pangeran Cilik (The Little Prince) lengkap dengan bunga mawar kaca dan jubah gurun.'
  },
  {
    id: 'PRD-106',
    sku: 'PM-HRN-BTM-03',
    name: 'Hirono Behind Time Figure',
    ipId: 'ip-2',
    price: 750000,
    costPrice: 430000,
    stock: 0,
    sold: 120,
    status: 'out_of_stock',
    editionType: 'Figure',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    description: 'Figure koleksi edisi terbatas bertema waktu yang telah berlalu, menampilkan Hirono dengan jam pasir antik dan finishing weathered vintage.'
  },
  {
    id: 'PRD-107',
    sku: 'PM-HRN-RDJ-MG',
    name: 'Hirono Road Journal Series-Fridge Magnet Blind Box',
    ipId: 'ip-2',
    price: 169000,
    costPrice: 85000,
    stock: 62,
    sold: 245,
    status: 'active',
    editionType: 'Fridge Magnet Blind Box',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    description: 'Blind box magnet kulkas 3D Hirono Road Journal berisi potongan ilustrasi catatan perjalanan nostalgia dengan magnet neodinium kuat.'
  }
];

export const DEFAULT_USERS = [
  {
    id: 'USR-001',
    name: 'Sarah Wijaya',
    email: 'sarah.wijaya@gmail.com',
    phone: '0812-3456-7890',
    role: 'customer',
    tier: 'Platinum Collector',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    registeredAt: '2025-01-15',
    totalSpent: 3461000,
    orderCount: 2,
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan'
  },
  {
    id: 'USR-002',
    name: 'Budi Santoso',
    email: 'budi.admin@popmart.id',
    phone: '0811-9876-5432',
    role: 'admin',
    tier: 'Store Super Admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    registeredAt: '2024-06-01',
    totalSpent: 0,
    orderCount: 0,
    address: 'HQ Pop Mart Indonesia, SCBD Lot 11, Jakarta Pusat'
  },
  {
    id: 'USR-003',
    name: 'Jessica Tanuwijaya',
    email: 'jessica.staff@popmart.id',
    phone: '0813-8822-1100',
    role: 'staff',
    tier: 'Warehouse Staff',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    registeredAt: '2024-09-10',
    totalSpent: 0,
    orderCount: 0,
    address: 'Pusat Distribusi Pop Mart, Tangerang, Banten'
  },
  {
    id: 'USR-004',
    name: 'Kevin Pratama',
    email: 'kevin.pratama99@yahoo.com',
    phone: '0857-1122-3344',
    role: 'customer',
    tier: 'Gold Collector',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    registeredAt: '2025-03-22',
    totalSpent: 5466000,
    orderCount: 2,
    address: 'Apartemen Taman Anggrek Tower 2, Jakarta Barat'
  },
  {
    id: 'USR-005',
    name: 'Amanda Putri',
    email: 'amanda.putri@hotmail.com',
    phone: '0821-5566-7788',
    role: 'customer',
    tier: 'Silver Collector',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    registeredAt: '2025-07-04',
    totalSpent: 876000,
    orderCount: 1,
    address: 'Jl. Dago Asri No. 18, Coblong, Kota Bandung'
  },
  {
    id: 'USR-006',
    name: 'Rizky Ramadhan',
    email: 'rizky.fakebuyer@gmail.com',
    phone: '0899-7788-9900',
    role: 'customer',
    tier: 'Bronze Collector',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'banned',
    registeredAt: '2025-10-11',
    totalSpent: 0,
    orderCount: 1,
    address: 'Jl. Kertajaya Indah No. 5, Gubeng, Surabaya'
  },
  {
    id: 'USR-007',
    name: 'Michelle Kusuma',
    email: 'michelle.k@gmail.com',
    phone: '0818-4455-6677',
    role: 'customer',
    tier: 'Gold Collector',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'active',
    registeredAt: '2025-04-18',
    totalSpent: 1081000,
    orderCount: 1,
    address: 'Jl. Boulevard Raya Blok PA 19, Kelapa Gading, Jakarta Utara'
  }
];

export const DEFAULT_ORDERS = [
  {
    id: 'ORD-2026-1001',
    userId: 'USR-001',
    customerName: 'Sarah Wijaya',
    customerEmail: 'sarah.wijaya@gmail.com',
    items: [
      { productId: 'PRD-102', name: 'SKULLPANDA The Mirage Series Handbag', qty: 1, price: 1450000 },
      { productId: 'PRD-101', name: 'SKULLPANDA The Mirage Series Phone Chain', qty: 1, price: 289000 }
    ],
    totalAmount: 1739000,
    shippingFee: 25000,
    grandTotal: 1764000,
    paymentMethod: 'BCA Virtual Account',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    shippingCourier: 'JNE Express',
    trackingNumber: 'JNE89201928371',
    orderDate: '2026-11-08 14:22',
    notes: 'Mohon bubble wrap tebal untuk tas koleksi pribadi'
  },
  {
    id: 'ORD-2026-1002',
    userId: 'USR-004',
    customerName: 'Kevin Pratama',
    customerEmail: 'kevin.pratama99@yahoo.com',
    items: [
      { productId: 'PRD-103', name: 'SKULLPANDA x DUCATI 1/6 Action Figure', qty: 1, price: 4850000 }
    ],
    totalAmount: 4850000,
    shippingFee: 50000,
    grandTotal: 4900000,
    paymentMethod: 'QRIS Gopay/OVO',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    shippingCourier: 'SiCepat BEST',
    trackingNumber: '003928172651',
    orderDate: '2026-11-09 09:15',
    notes: 'Kirim pakai packing kayu jika memungkinkan'
  },
  {
    id: 'ORD-2026-1003',
    userId: 'USR-005',
    customerName: 'Amanda Putri',
    customerEmail: 'amanda.putri@hotmail.com',
    items: [
      { productId: 'PRD-104', name: 'Hirono Shelter Series Figures', qty: 2, price: 259000 },
      { productId: 'PRD-107', name: 'Hirono Road Journal Series-Fridge Magnet Blind Box', qty: 2, price: 169000 }
    ],
    totalAmount: 856000,
    shippingFee: 20000,
    grandTotal: 876000,
    paymentMethod: 'GoPay',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    shippingCourier: 'J&T Express',
    trackingNumber: '-',
    orderDate: '2026-11-09 16:40',
    notes: 'Minta plastik segel jangan sampai terbuka'
  },
  {
    id: 'ORD-2026-1004',
    userId: 'USR-007',
    customerName: 'Michelle Kusuma',
    customerEmail: 'michelle.k@gmail.com',
    items: [
      { productId: 'PRD-105', name: 'Hirono The Little Prince Figurine', qty: 1, price: 890000 },
      { productId: 'PRD-107', name: 'Hirono Road Journal Series-Fridge Magnet Blind Box', qty: 1, price: 169000 }
    ],
    totalAmount: 1059000,
    shippingFee: 22000,
    grandTotal: 1081000,
    paymentMethod: 'Mandiri Virtual Account',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    shippingCourier: 'AnterAja',
    trackingNumber: '-',
    orderDate: '2026-11-09 20:05',
    notes: 'Menunggu transfer virtual account'
  },
  {
    id: 'ORD-2026-1005',
    userId: 'USR-006',
    customerName: 'Rizky Ramadhan',
    customerEmail: 'rizky.fakebuyer@gmail.com',
    items: [
      { productId: 'PRD-101', name: 'SKULLPANDA The Mirage Series Phone Chain', qty: 1, price: 289000 }
    ],
    totalAmount: 289000,
    shippingFee: 15000,
    grandTotal: 304000,
    paymentMethod: 'ShopeePay',
    paymentStatus: 'expired',
    orderStatus: 'cancelled',
    shippingCourier: '-',
    trackingNumber: '-',
    orderDate: '2026-11-07 11:10',
    notes: 'Pesanan dibatalkan otomatis karena melewati batas waktu pembayaran 24 jam'
  },
  {
    id: 'ORD-2026-1006',
    userId: 'USR-001',
    customerName: 'Sarah Wijaya',
    customerEmail: 'sarah.wijaya@gmail.com',
    items: [
      { productId: 'PRD-105', name: 'Hirono The Little Prince Figurine', qty: 1, price: 890000 },
      { productId: 'PRD-104', name: 'Hirono Shelter Series Figures', qty: 3, price: 259000 }
    ],
    totalAmount: 1667000,
    shippingFee: 30000,
    grandTotal: 1697000,
    paymentMethod: 'BCA Virtual Account',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    shippingCourier: 'JNE Trucking',
    trackingNumber: 'JTR8817265144',
    orderDate: '2026-11-05 18:30',
    notes: 'Sudah diterima dalam kondisi sangat mulus'
  },
  {
    id: 'ORD-2026-1007',
    userId: 'USR-004',
    customerName: 'Kevin Pratama',
    customerEmail: 'kevin.pratama99@yahoo.com',
    items: [
      { productId: 'PRD-104', name: 'Hirono Shelter Series Figures', qty: 1, price: 259000 },
      { productId: 'PRD-101', name: 'SKULLPANDA The Mirage Series Phone Chain', qty: 1, price: 289000 }
    ],
    totalAmount: 548000,
    shippingFee: 18000,
    grandTotal: 566000,
    paymentMethod: 'QRIS Gopay/OVO',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    shippingCourier: 'SiCepat Regular',
    trackingNumber: '-',
    orderDate: '2026-11-09 21:18',
    notes: 'Titip di resepsionis apartemen'
  }
];

export const SALES_TREND_DATA = [
  { month: 'Jan', revenue: 4.2, orders: 42 },
  { month: 'Feb', revenue: 5.8, orders: 58 },
  { month: 'Mar', revenue: 7.1, orders: 69 },
  { month: 'Apr', revenue: 9.4, orders: 84 },
  { month: 'Mei', revenue: 8.6, orders: 78 },
  { month: 'Jun', revenue: 12.3, orders: 115 },
  { month: 'Jul', revenue: 14.8, orders: 132 },
  { month: 'Agu', revenue: 16.2, orders: 146 },
  { month: 'Sep', revenue: 15.5, orders: 139 },
  { month: 'Okt', revenue: 18.9, orders: 164 },
  { month: 'Nov', revenue: 21.4, orders: 188 },
  { month: 'Des', revenue: 25.6, orders: 220 }
];
