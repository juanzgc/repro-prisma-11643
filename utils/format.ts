export function formatAmount(
    amount: number,
    currency: string
  ): string {
    let numberFormat = new Intl.NumberFormat(['en-US'], {
      style: 'currency',
      currency: currency
    })
  
    return numberFormat.format(amount);
  }