const config: Record<string, any> = {
  apiUrl: 'http://192.168.0.101:3000',
  // test organization
  organization: {
    id: 'cll37vdfb0001vbg9n11gwoq5',
  },
  events: {
    SIGN_UP: {
      text: 'Sign Up',
      title: 'Join now!',
      body: 'Sign up now for a 15% discount on your first purchase!',
    },
    ADD_TO_CART: {
      text: 'Add To Cart',
      title: 'Grab your groceries!',
      body: 'Hi there, noticed you left groceries in your cart. Remember to grab them today!',
    },
    WRITE_REVIEW: {
      text: 'Write Review',
      title: 'Did you like it?',
      body: 'How was your recent purchase? Write a review and help fellow shoppers!',
    },
  },
};

export default config;
