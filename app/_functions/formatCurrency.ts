export const FormatCurrencyToBRL = (price: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}
