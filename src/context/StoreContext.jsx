import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_IPS,
  DEFAULT_PRODUCTS,
  DEFAULT_USERS,
  DEFAULT_ORDERS
} from '../data/mockData';

const StoreContext = createContext(null);

const STORAGE_KEYS = {
  CATEGORIES: 'popmart_react_categories',
  IPS: 'popmart_react_ips',
  PRODUCTS: 'popmart_react_products',
  USERS: 'popmart_react_users',
  ORDERS: 'popmart_react_orders',
  THEME: 'popmart_react_theme'
};

const DATASET_VERSION_KEY = 'popmart_dataset_version';
const CURRENT_DATASET_VERSION = 'v2026_strict_skullpanda_hirono_v2';

// Helper for safe JSON parse from localStorage
const safeParse = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
    return parsed;
  } catch (err) {
    console.warn(`[StoreContext] Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

// Seed and invalidate stale cached datasets
if (typeof window !== 'undefined') {
  try {
    const cachedVer = localStorage.getItem(DATASET_VERSION_KEY);
    if (cachedVer !== CURRENT_DATASET_VERSION) {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.IPS);
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.USERS);
      localStorage.removeItem(STORAGE_KEYS.ORDERS);
      localStorage.setItem(DATASET_VERSION_KEY, CURRENT_DATASET_VERSION);
    }
  } catch (err) {
    console.error('LocalStorage sync error:', err);
  }
}

export const StoreProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Failed to save theme:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Master Data: Categories
  const [categories, setCategories] = useState(() => safeParse(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES));

  // Master Data: Character IPs
  const [ips, setIps] = useState(() => safeParse(STORAGE_KEYS.IPS, DEFAULT_IPS));

  // Core Data: Products
  const [products, setProducts] = useState(() => safeParse(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS));

  // Core Data: Users
  const [users, setUsers] = useState(() => safeParse(STORAGE_KEYS.USERS, DEFAULT_USERS));

  // Core Data: Orders
  const [orders, setOrders] = useState(() => safeParse(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS));

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IPS, JSON.stringify(ips));
  }, [ips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  // Enriched Products with IP (Kategori IP)
  const enrichedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products
      .filter(Boolean)
      .map(p => {
        const ip = Array.isArray(ips) ? ips.find(i => i && i.id === p.ipId) : null;
        return {
          ...p,
          ipName: ip ? ip.name : 'Unknown IP',
          ipColor: ip ? ip.badgeColor : '#64748b',
          categoryName: ip ? ip.name : 'Unknown IP'
        };
      });
  }, [products, ips]);

  // Product Actions
  const saveProduct = (productData) => {
    if (!productData.id) {
      const newProduct = {
        ...productData,
        id: 'PRD-' + Math.floor(100 + Math.random() * 900),
        sold: 0
      };
      setProducts(prev => [newProduct, ...prev]);
      showToast(`Produk "${newProduct.name}" berhasil ditambahkan!`);
    } else {
      setProducts(prev => prev.map(p => (p.id === productData.id ? { ...p, ...productData } : p)));
      showToast(`Produk "${productData.name}" berhasil diperbarui!`);
    }
  };

  const deleteProduct = (id) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Produk "${target?.name || id}" berhasil dihapus.`, 'info');
  };

  const updateStock = (id, newStock) => {
    const stockInt = Math.max(0, parseInt(newStock, 10));
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const status = stockInt === 0 ? 'out_of_stock' : p.status === 'out_of_stock' ? 'active' : p.status;
          return { ...p, stock: stockInt, status };
        }
        return p;
      })
    );
    showToast(`Stok berhasil diubah menjadi ${stockInt} unit.`);
  };

  // User Actions
  const saveUser = (userData) => {
    if (!userData.id) {
      const newUser = {
        ...userData,
        id: 'USR-' + String(users.length + 1).padStart(3, '0'),
        totalSpent: 0,
        orderCount: 0,
        registeredAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [newUser, ...prev]);
      showToast(`Pengguna "${newUser.name}" berhasil didaftarkan!`);
    } else {
      setUsers(prev => prev.map(u => (u.id === userData.id ? { ...u, ...userData } : u)));
      showToast(`Data "${userData.name}" berhasil diperbarui!`);
    }
  };

  const deleteUser = (id) => {
    const target = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(`Akun "${target?.name || id}" berhasil dihapus.`, 'info');
  };

  const toggleUserStatus = (id) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === id) {
          const newStatus = u.status === 'active' ? 'banned' : 'active';
          showToast(`Akun ${u.name} kini ${newStatus === 'active' ? 'Aktif' : 'Diblokir'}.`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Order Actions
  const createOrder = (orderData) => {
    const newId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      ...orderData,
      id: newId,
      orderDate: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    // Deduct product stock & increase sold count
    setProducts(prev =>
      prev.map(p => {
        const itemPurchased = orderData.items.find(i => i.productId === p.id);
        if (itemPurchased) {
          const newStock = Math.max(0, p.stock - itemPurchased.qty);
          const newSold = (p.sold || 0) + itemPurchased.qty;
          const newStatus = newStock === 0 ? 'out_of_stock' : p.status;
          return { ...p, stock: newStock, sold: newSold, status: newStatus };
        }
        return p;
      })
    );

    // Update customer spending & order count if registered
    if (orderData.userId) {
      setUsers(prev =>
        prev.map(u => {
          if (u.id === orderData.userId) {
            return {
              ...u,
              totalSpent: (u.totalSpent || 0) + (orderData.grandTotal || orderData.totalAmount),
              orderCount: (u.orderCount || 0) + 1
            };
          }
          return u;
        })
      );
    }

    setOrders(prev => [newOrder, ...prev]);
    showToast(`Pesanan #${newId} berhasil dibuat dan stok produk telah diperbarui!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, newTracking = '') => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: newStatus,
            trackingNumber: newTracking || o.trackingNumber,
            paymentStatus: newStatus === 'completed' ? 'paid' : o.paymentStatus
          };
        }
        return o;
      })
    );
    showToast(`Status pesanan ${orderId} berhasil diubah ke ${newStatus}.`);
  };

  // Category Actions
  const saveCategory = (catData) => {
    if (!catData.id) {
      const newCat = {
        ...catData,
        id: 'cat-' + Date.now().toString().slice(-5)
      };
      setCategories(prev => [...prev, newCat]);
      showToast(`Kategori "${newCat.name}" berhasil dibuat!`);
    } else {
      setCategories(prev => prev.map(c => (c.id === catData.id ? { ...c, ...catData } : c)));
      showToast(`Kategori "${catData.name}" berhasil diperbarui!`);
    }
  };

  const deleteCategory = (id) => {
    const isUsed = products.some(p => p.categoryId === id);
    if (isUsed) {
      showToast('Kategori ini masih digunakan oleh produk! Ubah kategori produk terlebih dahulu.', 'error');
      return false;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Kategori berhasil dihapus.', 'info');
    return true;
  };

  // Character IP Actions
  const saveIP = (ipData) => {
    if (!ipData.id) {
      const newIp = {
        ...ipData,
        id: 'ip-' + Date.now().toString().slice(-5)
      };
      setIps(prev => [...prev, newIp]);
      showToast(`Karakter IP "${newIp.name}" berhasil ditambahkan!`);
    } else {
      setIps(prev => prev.map(i => (i.id === ipData.id ? { ...i, ...ipData } : i)));
      showToast(`Karakter IP "${ipData.name}" berhasil diperbarui!`);
    }
  };

  const deleteIP = (id) => {
    const isUsed = products.some(p => p.ipId === id);
    if (isUsed) {
      showToast('Karakter IP ini masih memiliki produk terdaftar! Hapus produk terkait terlebih dahulu.', 'error');
      return false;
    }
    setIps(prev => prev.filter(i => i.id !== id));
    showToast('Karakter IP berhasil dihapus.', 'info');
    return true;
  };

  // Aggregate Analytics
  const analytics = useMemo(() => {
    const totalRevenue = orders
      .filter(o => o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + (o.grandTotal || o.totalAmount), 0);

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.orderStatus === 'completed').length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;
    const activeProducts = products.filter(p => p.stock > 0 && p.status === 'active').length;
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10);
    const outOfStockProducts = products.filter(p => p.stock === 0);

    // IP Sales breakdown
    const ipMap = {};
    ips.forEach(ip => {
      ipMap[ip.id] = { name: ip.name, count: 0, revenue: 0, color: ip.badgeColor };
    });

    products.forEach(p => {
      if (ipMap[p.ipId]) {
        ipMap[p.ipId].count += p.sold || 0;
        ipMap[p.ipId].revenue += (p.sold || 0) * p.price;
      }
    });

    const ipSales = Object.values(ipMap).sort((a, b) => b.count - a.count);

    return {
      totalRevenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      activeProducts,
      totalProducts: products.length,
      lowStockProducts,
      outOfStockCount: outOfStockProducts.length,
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      ipSales
    };
  }, [products, orders, users, ips]);

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        toast,
        showToast,
        activeTab,
        setActiveTab,
        categories,
        ips,
        products: enrichedProducts,
        rawProducts: products,
        users,
        orders,
        analytics,
        saveProduct,
        deleteProduct,
        updateStock,
        saveUser,
        deleteUser,
        toggleUserStatus,
        createOrder,
        updateOrderStatus,
        saveCategory,
        deleteCategory,
        saveIP,
        deleteIP
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

