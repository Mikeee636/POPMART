export const rp = (n) => 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
