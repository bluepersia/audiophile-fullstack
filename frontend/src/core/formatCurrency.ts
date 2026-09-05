export default function formatCurrency(value: number): string {
  return `$ ${new Intl.NumberFormat("en-US").format(value)}`;
}
