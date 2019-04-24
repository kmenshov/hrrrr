import * as normHelper from 'app/helpers/normalization';

describe('arrayToNormalized', () => {
  test('can sort normalized objects', () => {
    const source = [
      { id: 7, name: 'Seven' },
      { id: 1, name: 'One' },
      { id: 5, name: 'Five' },
    ];

    const expected = {
      allIds: [1, 5, 7],
      byId: {
        1: { id: 1, name: 'One' },
        5: { id: 5, name: 'Five' },
        7: { id: 7, name: 'Seven' },
      },
    };

    expect(normHelper.arrayToNormalized(source, { sort: true })).toEqual(expected);
  });

  test('sorting during normalization is optional', () => {
    const source = [
      { id: 7, name: 'Seven' },
      { id: 1, name: 'One' },
      { id: 5, name: 'Five' },
    ];

    const expected = {
      allIds: [7, 1, 5],
      byId: {
        7: { id: 7, name: 'Seven' },
        1: { id: 1, name: 'One' },
        5: { id: 5, name: 'Five' },
      },
    };

    expect(normHelper.arrayToNormalized(source)).toEqual(expected);
  });

  test('can sort normalized objects by any property', () => {
    const source = [
      { id: 7, name: 'Seven' },
      { id: 1, name: 'One' },
      { id: 5, name: 'Five' },
    ];

    const expected = {
      allIds: [5, 1, 7],
      byId: {
        5: { id: 5, name: 'Five' },
        1: { id: 1, name: 'One' },
        7: { id: 7, name: 'Seven' },
      },
    };

    expect(normHelper.arrayToNormalized(source, { sort: 'name' })).toEqual(expected);
  });

  test('can use any property as an id in Normalized Object', () => {
    const source = [
      { id: 7, name: 'Seven' },
      { id: 1, name: 'One' },
      { id: 5, name: 'Five' },
    ];

    const expected = {
      allIds: ['Seven', 'One', 'Five'],
      byId: {
        Five: { id: 5, name: 'Five' },
        One: { id: 1, name: 'One' },
        Seven: { id: 7, name: 'Seven' },
      },
    };

    expect(normHelper.arrayToNormalized(source, { key: 'name' })).toEqual(expected);
  });

  test('returns empty normalized object by default if source is not array', () => {
    expect(normHelper.arrayToNormalized('')).toEqual(
      { allIds: [], byId: {} },
    );
  });

  test('can return anything else if source is not array', () => {
    expect(normHelper.arrayToNormalized('', { def: null })).toBe(null);
  });
});


describe('deleteFromNormalized', () => {
  test('can delete from a normalized object by any property', () => {
    expect(normHelper.deleteFromNormalized({
      allIds: [5, 1, 7],
      byId: {
        5: { id: 5, name: 'Five' },
        1: { id: 1, name: 'Eleven' },
        7: { id: 7, name: 'Seven' },
      },
    }, 1)).toEqual({
      allIds: [5, 7],
      byId: {
        5: { id: 5, name: 'Five' },
        7: { id: 7, name: 'Seven' },
      },
    });

    expect(normHelper.deleteFromNormalized({
      allIds: ['Five', 'One', 'Seven'],
      byId: {
        Five: { id: 5, name: 'Five' },
        One: { id: 1, name: 'One' },
        Seven: { id: 7, name: 'Seven' },
      },
    }, 'One')).toEqual({
      allIds: ['Five', 'Seven'],
      byId: {
        Five: { id: 5, name: 'Five' },
        Seven: { id: 7, name: 'Seven' },
      },
    });
  });
});
