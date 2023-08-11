export default {
  apiUrl: 'http://192.168.0.101:3000',
  // test user
  user: {
    id: 'cll37vdfb0000vbg99tieeevd',
    // orgId should actually be identified using API key on the backend
    organizationId: 'cll37vdfb0001vbg9n11gwoq5',
    email: 'user1@abc.com',
  },
  events: {
    SIGN_UP: 'SIGN_UP',
    ADD_TO_CART: 'ADD_TO_CART',
    WRITE_REVIEW: 'WRITE_REVIEW',
  },
};
