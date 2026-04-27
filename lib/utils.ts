export function unsplashUrl(query: string, width = 800, height = 600) {
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)},travel`;
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
