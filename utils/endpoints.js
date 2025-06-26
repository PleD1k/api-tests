module.exports = {
  users: {
    list: '/users',
    single: (id) => `/users/${id}`,
    create: '/users',
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
  },
  resources: {
    list: '/unknown',
    single: (id) => `/unknown/${id}`,
  },
  auth: {
    register: '/register',
    login: '/login',
  },
};
