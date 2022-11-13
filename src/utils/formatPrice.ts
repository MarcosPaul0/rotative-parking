export function formatPrice(price: number) {
  const formattedPrice = `R$ ${String(price.toFixed(2)).replace('.', ',')}`;

  return formattedPrice;
}
