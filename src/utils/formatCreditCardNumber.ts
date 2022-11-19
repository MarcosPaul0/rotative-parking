export function formatCreditCardNumber(number: string) {
  return `${number.slice(0, 4)} **** **** ${number.slice(12, 16)}`;
}
