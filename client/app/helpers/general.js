/* eslint-disable import/prefer-default-export, no-param-reassign */

export function sortArrayByProperty(arr, options) {
  if (!Array.isArray(arr)) { return arr; }

  if (typeof options === 'string') { options = { key: options }; }

  const { key, caseSensitive, descending } = Object.assign({
    key: 'id',
    caseSensitive: false,
    descending: false,
  }, options);

  const order = descending ? -1 : 1;

  function compare(a, b) {
    let valueA = a[key];
    let valueB = b[key];
    if (
      !caseSensitive &&
      (typeof valueA === 'string') &&
      (typeof valueB === 'string')
    ) {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA > valueB) return order;
    if (valueA < valueB) return -order;
    return 0;
  }
  return arr.sort(compare);
}
