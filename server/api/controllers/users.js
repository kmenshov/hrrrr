const dummyData = [
  { id: 1, name: 'User one' },
  { id: 2, name: 'User two' },
  { id: 3, name: 'User three' },
  { id: 4, name: 'User four' },
  { id: 5, name: 'User five' },
];

dummyData.addUser = function (name) {
  let nextId = 1;
  this.forEach((user) => {
    if (user.id >= nextId) { nextId = user.id + 1; }
  });

  const newUser = { id: nextId, name };
  this.push(newUser);
  return newUser;
};

////////////////////////////////////////////////////////////////////////////////

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler(request, h) {
      return dummyData.addUser(request.payload.name);
    },
  },
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
