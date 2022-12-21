export function formatPrice(price) {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
}
