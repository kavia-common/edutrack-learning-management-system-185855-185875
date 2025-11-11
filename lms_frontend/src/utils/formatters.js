//
// Basic formatters used across UI
//

// PUBLIC_INTERFACE
export function formatMoney(v) {
  if (v === undefined || v === null || Number.isNaN(Number(v))) return '$0.00';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(v));
}
