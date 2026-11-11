export const DEFAULT_CATEGORIES = [];

export const DEFAULT_IPS = [
  {
    id: 'ip-hirono',
    name: 'HIRONO',
    artist: 'Lang',
    description: 'Eksplorasi emosional masa kecil, kerapuhan jiwa, dan kejujuran puitis yang menyentuh hati melalui patung karakter ekspresif.',
    badgeColor: '#52525b',
    avatar: '/images/ip/HIRONO.png'
  },
  {
    id: 'ip-molly',
    name: 'MOLLY',
    artist: 'Kenny Wong',
    description: 'Karakter ikonik gadis cilik bermata danau besar dengan bibir cemberut khas, penuh rasa ingin tahu dan imajinasi tanpa batas.',
    badgeColor: '#2563eb',
    avatar: '/images/ip/MOLLY.png'
  },
  {
    id: 'ip-skullpanda',
    name: 'SKULLPANDA',
    artist: 'Xiongmao',
    description: 'Karakter ikonik bergaya avant-garde, gothic, dan futuristik dengan telinga bola bulat khas serta estetika modern yang berani.',
    badgeColor: '#18181b',
    avatar: '/images/ip/SKULLPANDA.png'
  },
  {
    id: 'ip-the-monsters',
    name: 'THE MONSTERS',
    artist: 'Kasing Lung',
    description: 'Dunia dongeng nordik yang dipimpin oleh Labubu dengan deretan taring nakal berhati hangat, berjiwa petualang dan ceria.',
    badgeColor: '#16a34a',
    avatar: '/images/ip/THE MONSTERS.png'
  }
];

export const DEFAULT_PRODUCTS = [
  // --- HIRONO (6 Products) ---
  {
    id: 'PRD-101',
    sku: 'PM-HRN-MW-PDP',
    name: 'Hirono Mist-Walker Series - Plush Doll Pendant',
    ipId: 'ip-hirono',
    price: 279000,
    costPrice: 140000,
    stock: 45,
    sold: 120,
    status: 'active',
    editionType: 'Plush Doll Pendant',
    image: '/images/products/HIRONO/Hirono Mist-Walker Series - Plush Doll Pendant.png',
    description: 'Gantungan plush doll seri Mist-Walker dengan material bulu lembut premium dan sentuhan estetika ekspresif Hirono.'
  },
  {
    id: 'PRD-102',
    sku: 'PM-HRN-SHL-FIG',
    name: 'Hirono Shelter Series Figures',
    ipId: 'ip-hirono',
    price: 259000,
    costPrice: 130000,
    stock: 35,
    sold: 180,
    status: 'active',
    editionType: 'Figures',
    image: '/images/products/HIRONO/Hirono Shelter Series Figures.png',
    description: 'Seri Shelter yang menggambarkan perlindungan emosional masa kecil dengan tekstur tanah liat matte puitis khas seniman Lang.'
  },
  {
    id: 'PRD-103',
    sku: 'PM-HRN-HP-BB',
    name: 'Hirono x Harry Potter Series Figures Blind Box',
    ipId: 'ip-hirono',
    price: 289000,
    costPrice: 145000,
    stock: 60,
    sold: 240,
    status: 'active',
    editionType: 'Blind Box',
    image: '/images/products/HIRONO/Hirono x Harry Potter Series Figures Blind Box.png',
    description: 'Kolaborasi magis Hirono x Harry Potter dalam format blind box menampilkan karakter dunia sihir dengan interpretasi emosional Hirono.'
  },
  {
    id: 'PRD-104',
    sku: 'PM-HRN-KDK-PLP',
    name: 'Hirono x Kodak Click Bear Plush Doll Pendant',
    ipId: 'ip-hirono',
    price: 319000,
    costPrice: 160000,
    stock: 28,
    sold: 95,
    status: 'active',
    editionType: 'Plush Doll Pendant',
    image: '/images/products/HIRONO/Hirono x Kodak Click Bear Plush Doll Pendant.png',
    description: 'Kolaborasi retro Hirono bersama Kodak menghadirkan boneka gantung Click Bear dengan detail kamera vintage.'
  },
  {
    id: 'PRD-105',
    sku: 'PM-HRN-LPP-FIG',
    name: 'Hirono x Le Petit Prince Series Figures',
    ipId: 'ip-hirono',
    price: 299000,
    costPrice: 150000,
    stock: 40,
    sold: 165,
    status: 'active',
    editionType: 'Figures',
    image: '/images/products/HIRONO/Hirono x Le Petit Prince Series Figures.png',
    description: 'Interpretasi puitis Hirono tentang kisah Sang Pangeran Cilik (Le Petit Prince) lengkap dengan mawar kaca dan sentuhan nostalgia.'
  },
  {
    id: 'PRD-106',
    sku: 'PM-HRN-WWR-FIG',
    name: 'Hirono x UV WWR Lucky Bertie Figurine',
    ipId: 'ip-hirono',
    price: 1250000,
    costPrice: 720000,
    stock: 12,
    sold: 48,
    status: 'active',
    editionType: 'Figurine',
    image: '/images/products/HIRONO/Hirono x UV WWR Lucky Bertie Figurine.png',
    description: 'Figurine edisi kolektor kolaborasi Hirono x Underverse WWR Lucky Bertie dengan detail mecha weathered dan finishing presisi tinggi.'
  },

  // --- MOLLY (6 Products) ---
  {
    id: 'PRD-107',
    sku: 'PM-MLY-BMT-PPB',
    name: 'Baby Molly & baby Tabby Series-Pinch Pendant Blind Box',
    ipId: 'ip-molly',
    price: 199000,
    costPrice: 95000,
    stock: 55,
    sold: 140,
    status: 'active',
    editionType: 'Pinch Pendant Blind Box',
    image: '/images/products/MOLLY/Baby Molly & baby Tabby Series-Pinch Pendant Blind Box.png',
    description: 'Gantungan squishy lembut Baby Molly & Baby Tabby yang menggemaskan dengan material slow-rebound berkualitas.'
  },
  {
    id: 'PRD-108',
    sku: 'PM-MLY-MSM-1000ST',
    name: 'MEGA SPACE MOLLY 1000% Stranger Things',
    ipId: 'ip-molly',
    price: 14500000,
    costPrice: 9800000,
    stock: 3,
    sold: 11,
    status: 'active',
    editionType: 'MEGA 1000%',
    image: '/images/products/MOLLY/MEGA SPACE MOLLY 1000 Stranger Things.png',
    description: 'Mahakarya koleksi skala raksasa 1000% MEGA SPACE MOLLY berkolaborasi dengan Stranger Things edisi terbatas museum grade.'
  },
  {
    id: 'PRD-109',
    sku: 'PM-MLY-MSM-400DUC',
    name: 'MEGA SPACE MOLLY 400% DUCATI',
    ipId: 'ip-molly',
    price: 4200000,
    costPrice: 2600000,
    stock: 8,
    sold: 29,
    status: 'active',
    editionType: 'MEGA 400%',
    image: '/images/products/MOLLY/MEGA SPACE MOLLY 400 DUCATI.png',
    description: 'Edisi spektakuler MEGA SPACE MOLLY 400% kolaborasi Ducati dengan livery balap merah ikonik dan visor helm movable.'
  },
  {
    id: 'PRD-110',
    sku: 'PM-MLY-DUC-VP',
    name: 'MEGA SPACE MOLLY DUCATI Vinly Pendant',
    ipId: 'ip-molly',
    price: 349000,
    costPrice: 175000,
    stock: 32,
    sold: 110,
    status: 'active',
    editionType: 'Vinyl Pendant',
    image: '/images/products/MOLLY/MEGA SPACE MOLLY DUCATI Vinly Pendant.png',
    description: 'Gantungan vinyl SPACE MOLLY Ducati berukuran kompak dengan detail presisi racing suit dan logo Ducati Corse.'
  },
  {
    id: 'PRD-111',
    sku: 'PM-MLY-SAW-DCB',
    name: 'MOLLY Scenery Along the Way Series-Decorative Charm Blind Box',
    ipId: 'ip-molly',
    price: 219000,
    costPrice: 110000,
    stock: 42,
    sold: 175,
    status: 'active',
    editionType: 'Blind Box',
    image: '/images/products/MOLLY/MOLLY Scenery Along the Way Series-Decorative Charm Blind Box.png',
    description: 'Blind box charm dekoratif seri Scenery Along the Way menggambarkan perjalanan liburan Molly yang penuh keceriaan.'
  },
  {
    id: 'PRD-112',
    sku: 'PM-MLY-YQ-18AF',
    name: 'MOLLY x YUQI Series 1per8 Action Figure',
    ipId: 'ip-molly',
    price: 2450000,
    costPrice: 1450000,
    stock: 10,
    sold: 36,
    status: 'active',
    editionType: '1/8 Action Figure',
    image: '/images/products/MOLLY/MOLLY x YUQI Series 1per8 Action Figure.png',
    description: 'Action figure 1/8 edisi kolaborasi eksklusif MOLLY x YUQI dengan kostum panggung glamor dan aksesoris mikrofon.'
  },

  // --- SKULLPANDA (6 Products) ---
  {
    id: 'PRD-113',
    sku: 'PM-SKP-P4A-FM',
    name: 'SKULLPANDA Petals in Four Acts Series Fridge Magnet',
    ipId: 'ip-skullpanda',
    price: 179000,
    costPrice: 89000,
    stock: 50,
    sold: 190,
    status: 'active',
    editionType: 'Fridge Magnet',
    image: '/images/products/SKULLPANDA/SKULLPANDA Petals in Four Acts Series Fridge Magnet.png',
    description: 'Magnet kulkas artistik seri Petals in Four Acts dengan kelopak bunga bertekstur porcelain dan sentuhan warna gradasi.'
  },
  {
    id: 'PRD-114',
    sku: 'PM-SKP-MRG-HB',
    name: 'SKULLPANDA The Mirage Series Handbag',
    ipId: 'ip-skullpanda',
    price: 1450000,
    costPrice: 850000,
    stock: 14,
    sold: 56,
    status: 'active',
    editionType: 'Handbag',
    image: '/images/products/SKULLPANDA/SKULLPANDA The Mirage Series Handbag.png',
    description: 'Handbag kulit sintetis premium bertema The Mirage dengan tekstur embossed motif Skullpanda dan rantai logam matte silver.'
  },
  {
    id: 'PRD-115',
    sku: 'PM-SKP-DUC-16',
    name: 'SKULLPANDA x DUCATI 1per6 Action Figure',
    ipId: 'ip-skullpanda',
    price: 4850000,
    costPrice: 2950000,
    stock: 5,
    sold: 32,
    status: 'active',
    editionType: '1/6 Action Figure',
    image: '/images/products/SKULLPANDA/SKULLPANDA x DUCATI 1per6 Action Figure.png',
    description: 'Kolaborasi spektakuler Skullpanda bersama Ducati skala 1/6 dengan helm balap custom, jaket kulit biker, dan artikulasi sendi presisi.'
  },
  {
    id: 'PRD-116',
    sku: 'PM-SKP-HMC-16',
    name: 'SKULLPANDA x HAMCUS 1per6 Action Figure',
    ipId: 'ip-skullpanda',
    price: 5200000,
    costPrice: 3200000,
    stock: 4,
    sold: 25,
    status: 'active',
    editionType: '1/6 Action Figure',
    image: '/images/products/SKULLPANDA/SKULLPANDA x HAMCUS 1per6 Action Figure.png',
    description: 'Action figure kolaborasi Skullpanda x HAMCUS skala 1/6 bergaya sci-fi dystopia techwear dengan multi-layer apparel realistis.'
  },
  {
    id: 'PRD-117',
    sku: 'PM-SKP-MLP-PDP',
    name: 'SKULLPANDA x My Little Pony Series Plush Doll Pendent',
    ipId: 'ip-skullpanda',
    price: 299000,
    costPrice: 150000,
    stock: 40,
    sold: 135,
    status: 'active',
    editionType: 'Plush Doll Pendant',
    image: '/images/products/SKULLPANDA/SKULLPANDA x My Little Pony Series Plush Doll Pendent.png',
    description: 'Boneka gantung plush edisi kolaborasi unik SKULLPANDA x My Little Pony dengan rambut pastel gradasi dan charm bintang.'
  },
  {
    id: 'PRD-118',
    sku: 'PM-SKP-RW-16AF',
    name: 'SKULLPANDA x ROBERT WUN The Innocence 1per6 Action Figure',
    ipId: 'ip-skullpanda',
    price: 5600000,
    costPrice: 3500000,
    stock: 3,
    sold: 18,
    status: 'active',
    editionType: '1/6 Action Figure',
    image: '/images/products/SKULLPANDA/SKULLPANDA x ROBERT WUN The Innocence 1per6 Action Figure.png',
    description: 'Kolaborasi haute couture spektakuler bersama perancang busana Robert Wun The Innocence skala 1/6 dengan gaun lipat dramatis.'
  },

  // --- THE MONSTERS (6 Products) ---
  {
    id: 'PRD-119',
    sku: 'PM-TMS-RTU-VPD',
    name: 'THE MONSTERS Big into Energy Series - ROCK THE UNIVERSE Vinly Plush Doll',
    ipId: 'ip-the-monsters',
    price: 1850000,
    costPrice: 1050000,
    stock: 15,
    sold: 82,
    status: 'active',
    editionType: 'Vinyl Plush Doll',
    image: '/images/products/THE MONSTERS/THE MONSTERS Big into Energy Series - ROCK THE UNIVERSE Vinly Plush Doll.png',
    description: 'Boneka vinyl plush Labubu ROCK THE UNIVERSE edisi Big into Energy dengan jaket rockstar metalik dan ekspresi taring ikonik.'
  },
  {
    id: 'PRD-120',
    sku: 'PM-TMS-CMO-IC',
    name: 'THE MONSTERS CAT MODE ON SERIES - Insulated Cup',
    ipId: 'ip-the-monsters',
    price: 429000,
    costPrice: 215000,
    stock: 30,
    sold: 115,
    status: 'active',
    editionType: 'Insulated Cup',
    image: '/images/products/THE MONSTERS/THE MONSTERS CAT MODE ON SERIES - Insulated Cup.png',
    description: 'Tumbler termal stainless steel seri CAT MODE ON menjaga suhu minuman panas/dingin hingga 12 jam dengan tutup telinga kucing.'
  },
  {
    id: 'PRD-121',
    sku: 'PM-TMS-CMO-MUG',
    name: 'THE MONSTERS CAT MODE ON SERIES - Mug',
    ipId: 'ip-the-monsters',
    price: 269000,
    costPrice: 130000,
    stock: 48,
    sold: 160,
    status: 'active',
    editionType: 'Ceramic Mug',
    image: '/images/products/THE MONSTERS/THE MONSTERS CAT MODE ON SERIES - Mug.png',
    description: 'Mug keramik tebal seri CAT MODE ON dengan gagang ekor kucing dan ilustrasi Labubu menggemaskan yang tahan microwave.'
  },
  {
    id: 'PRD-122',
    sku: 'PM-TMS-CMO-VPB',
    name: 'THE MONSTERS CAT MODE ON SERIES - Vinly Plush Pendant Blind Box',
    ipId: 'ip-the-monsters',
    price: 289000,
    costPrice: 145000,
    stock: 50,
    sold: 210,
    status: 'active',
    editionType: 'Vinyl Plush Pendant Blind Box',
    image: '/images/products/THE MONSTERS/THE MONSTERS CAT MODE ON SERIES - Vinly Plush Pendant Blind Box.png',
    description: 'Gantungan blind box vinyl plush Labubu berkostum kucing berbulu lembut aneka warna yang sangat viral dan diburu kolektor.'
  },
  {
    id: 'PRD-123',
    sku: 'PM-TMS-HSS-VPB',
    name: 'THE MONSTERS Hair Salon Series - Vinly Plush Pendant Blind Box',
    ipId: 'ip-the-monsters',
    price: 289000,
    costPrice: 145000,
    stock: 40,
    sold: 195,
    status: 'active',
    editionType: 'Vinyl Plush Pendant Blind Box',
    image: '/images/products/THE MONSTERS/THE MONSTERS Hair Salon Series - Vinly Plush Pendant Blind Box.png',
    description: 'Blind box gantungan Labubu edisi Hair Salon dengan gaya rambut nyentrik, warna-warni pop art, dan aksesoris salon mini.'
  },
  {
    id: 'PRD-124',
    sku: 'PM-TMS-LCS-VPH',
    name: 'THE MONSTERS Let\'s Checkmate Series - Vinly Plush Hanging Card',
    ipId: 'ip-the-monsters',
    price: 359000,
    costPrice: 180000,
    stock: 25,
    sold: 98,
    status: 'active',
    editionType: 'Vinyl Plush Hanging Card',
    image: '/images/products/THE MONSTERS/THE MONSTERS Let\'s Checkmate Series - Vinly Plush Hanging Card.png',
    description: 'Hanging card vinyl plush bertema catur kerajaan Let\'s Checkmate menampilkan Labubu sebagai raja dan bidak catur megah.'
  }
];

export const DEFAULT_USERS = [
  {
    id: 'USR-001',
    name: 'Admin Pop Mart',
    email: 'admin@popmart.co.id',
    phone: '0811-1234-5678',
    role: 'admin',
    avatar: '',
    status: 'active',
    registeredAt: '2024-01-01',
    totalSpent: 0,
    orderCount: 0,
    address: 'HQ Pop Mart Indonesia, SCBD Lot 11, Jakarta Pusat'
  },
  {
    id: 'USR-002',
    name: 'Mikel',
    email: 'mikel@popmart.com',
    phone: '0812-3456-7890',
    role: 'customer',
    avatar: '',
    status: 'active',
    registeredAt: '2025-01-15',
    totalSpent: 11440000,
    orderCount: 6,
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan'
  }
];

export const DEFAULT_ORDERS = [
  {
    id: 'ORD-2026-1001',
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-114', name: 'SKULLPANDA The Mirage Series Handbag', qty: 1, price: 1450000 },
      { productId: 'PRD-102', name: 'Hirono Shelter Series Figures', qty: 1, price: 259000 }
    ],
    totalAmount: 1709000,
    shippingFee: 25000,
    grandTotal: 1734000,
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
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-115', name: 'SKULLPANDA x DUCATI 1per6 Action Figure', qty: 1, price: 4850000 }
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
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-119', name: 'THE MONSTERS Big into Energy Series - ROCK THE UNIVERSE Vinly Plush Doll', qty: 1, price: 1850000 },
      { productId: 'PRD-122', name: 'THE MONSTERS CAT MODE ON SERIES - Vinly Plush Pendant Blind Box', qty: 2, price: 289000 }
    ],
    totalAmount: 2428000,
    shippingFee: 25000,
    grandTotal: 2453000,
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
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-109', name: 'MEGA SPACE MOLLY 400% DUCATI', qty: 1, price: 4200000 }
    ],
    totalAmount: 4200000,
    shippingFee: 50000,
    grandTotal: 4250000,
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
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-101', name: 'Hirono Mist-Walker Series - Plush Doll Pendant', qty: 1, price: 279000 }
    ],
    totalAmount: 279000,
    shippingFee: 15000,
    grandTotal: 294000,
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
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-105', name: 'Hirono x Le Petit Prince Series Figures', qty: 1, price: 299000 },
      { productId: 'PRD-103', name: 'Hirono x Harry Potter Series Figures Blind Box', qty: 2, price: 289000 }
    ],
    totalAmount: 877000,
    shippingFee: 25000,
    grandTotal: 902000,
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
    userId: 'USR-002',
    customerName: 'Mikel',
    customerEmail: 'mikel@popmart.com',
    items: [
      { productId: 'PRD-123', name: 'THE MONSTERS Hair Salon Series - Vinly Plush Pendant Blind Box', qty: 2, price: 289000 }
    ],
    totalAmount: 578000,
    shippingFee: 20000,
    grandTotal: 598000,
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
