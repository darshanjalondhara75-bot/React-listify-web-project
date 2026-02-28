
export const register = async (user) => {
  console.log('Mock Register:', user);
  return Promise.resolve({ data: { message: 'Success' } });
};

export const login = async (user) => {
  console.log('Mock Login:', user);
  // Return a mock user and token
  return Promise.resolve({
    data: {
      token: 'mock-token-' + Date.now(),
      user: {
        _id: 'mock-user-id',
        name: user.email.split('@')[0],
        email: user.email,
        role: 'admin'
      }
    }
  });
};

export const authenticate = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('buynsell', JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('buynsell')) {
    return JSON.parse(localStorage.getItem('buynsell'));
  } else {
    return false;
  }
};

