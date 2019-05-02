/* eslint-disable import/prefer-default-export, no-param-reassign */

import { sortArrayByProperty } from './general';

export const emptyNormalizedObject = { allIds: [], byId: {} };

export function arrayToNormalized(array, options) {
  const { key, sort, def } = Object.assign({
    key: 'id',
    sort: false,
    def: emptyNormalizedObject,
  }, options);

  if (!Array.isArray(array)) { return def; }

  const items = array.slice();
  if (sort) { sortArrayByProperty(items, sort); }

  return {
    allIds: items.map(item => item[key]),
    byId: items.reduce((obj, item) => {
      obj[item[key]] = item;
      return obj;
    }, {}),
  };
}

export function addOrReplaceInNormalized(normalized, newRecord, indexKey = 'id') {
  // can't use Object.assign because it doesn't duplicate nested objects
  const newNormalized = {
    allIds: normalized.allIds.slice(0),
    byId: { ...normalized.byId },
  };

  if (!newNormalized.allIds.includes(newRecord[indexKey])) {
    newNormalized.allIds.push(newRecord[indexKey]);
  }
  newNormalized.byId[newRecord[indexKey]] = { ...newRecord };

  return newNormalized;
}

export function deleteFromNormalized(normalized, id) {
  // can't use Object.assign because it doesn't duplicate nested objects
  const newNormalized = {
    allIds: normalized.allIds.slice(0),
    byId: { ...normalized.byId },
  };

  const index = newNormalized.allIds.indexOf(id);
  if (index !== -1) { newNormalized.allIds.splice(index, 1); }

  delete newNormalized.byId[id];

  return newNormalized;
}
