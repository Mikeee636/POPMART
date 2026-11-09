export const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num || 0);
};

