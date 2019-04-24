const dummyData = [
  { id: 1, name: 'User one' },
  { id: 2, name: 'User two' },
  { id: 3, name: 'User three' },
  { id: 4, name: 'User four' },
  { id: 5, name: 'User five' },
];

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler(request, h) {
      return dummyData;
    },
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler(request, h) {
      return h.response().code(204);
    },
  },
];
