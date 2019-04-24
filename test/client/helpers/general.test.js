import * as genHelper from 'app/helpers/general';

describe('sortArrayByProperty', () => {
  const source = [
    {
      id: 11,
      name: 'eleven',
    },
    {
      id: 1,
      name: 'one',
    },
    {
      id: 2,
      name: 'Two',
    },
  ];

  test('can sort arrays by objects property', () => {
    expect(genHelper.sortArrayByProperty(source)).toEqual(
      [
        {
          id: 1,
          name: 'one',
        },
        {
          id: 2,
          name: 'Two',
        },
        {
          id: 11,
          name: 'eleven',
        },
      ],
    );
  });

  test('can sort in descending order', () => {
    expect(genHelper.sortArrayByProperty(source, { descending: true })).toEqual(
      [
        {
          id: 11,
          name: 'eleven',
        },
        {
          id: 2,
          name: 'Two',
        },
        {
          id: 1,
          name: 'one',
        },
      ],
    );
  });

  test('can sort arrays by any property', () => {
    expect(genHelper.sortArrayByProperty(source, 'name')).toEqual(
      [
        {
          id: 11,
          name: 'eleven',
        },
        {
          id: 1,
          name: 'one',
        },
        {
          id: 2,
          name: 'Two',
        },
      ],
    );
  });

  test('can sort by any property in descending order', () => {
    expect(genHelper.sortArrayByProperty(source, { key: 'name', descending: true })).toEqual(
      [
        {
          id: 2,
          name: 'Two',
        },
        {
          id: 1,
          name: 'one',
        },
        {
          id: 11,
          name: 'eleven',
        },
      ],
    );
  });

  test('can sort case sensitive', () => {
    expect(genHelper.sortArrayByProperty(source, { key: 'name', caseSensitive: true })).toEqual(
      [
        {
          id: 2,
          name: 'Two',
        },
        {
          id: 11,
          name: 'eleven',
        },
        {
          id: 1,
          name: 'one',
        },
      ],
    );
  });

  test('can sort case sensitive in descending order', () => {
    expect(genHelper.sortArrayByProperty(source, { key: 'name', caseSensitive: true, descending: true })).toEqual(
      [
        {
          id: 1,
          name: 'one',
        },
        {
          id: 11,
          name: 'eleven',
        },
        {
          id: 2,
          name: 'Two',
        },
      ],
    );
  });
});
