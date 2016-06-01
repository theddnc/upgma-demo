/**
 * Formatuje liczbę do postaci X,XXX.XX
 * @param number
 * @returns {string}
 */
export default (number) => {
  if (typeof number === 'number') {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

  return number;
}