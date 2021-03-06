// TODO: State!
const users = [
  { id: 1, name: 'tom' },
];

export const index = (_request, response) => response.render({ users });

export const show = (request, response) => {
  const user = users.find((u) => Number(u.id) === Number(request.params.id));
  if (!user) {
    response.head(404);
    return;
  }

  response.send({ user });
};

export const create = (request, response) => {
  const { user } = request.body;
  if (user.name) { // validation
    users.push(user);
    response.redirectTo('/users');
    return;
  }

  response.send({ user });
};

export const destroy = (request, response) => {
  const { id: userId } = request.params;
  if (userId) { // validation
    users.pop();
  }

  response.redirectTo('/users');
};
