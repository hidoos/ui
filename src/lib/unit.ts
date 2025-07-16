export const formatToDecimal = (num: string | number | undefined | null, precision: number = 1): string | null => {
    const n = num == null || num === '' ? NaN : Number(num);
    return isNaN(n) ? null : n.toFixed(precision);
  };