const getMockUser = (userId) => ({
  _id: userId || 'mock-user-id',
  name: 'Mock User',
  email: 'mock@example.com',
  role: 'user',
  avatar: 'https://listify.codderlab.com/uploads/user/default-avatar.jpg'
});

export const viewUser = async (userId) =>
  Promise.resolve({ data: getMockUser(userId) });

export const viewUser2 = async (userId) =>
  Promise.resolve({ data: getMockUser(userId) });

export const reduxUser = async (userId) =>
  Promise.resolve({ data: getMockUser(userId) });

export const getUser = async (userId) =>
  Promise.resolve({ data: getMockUser(userId) });

export const updateProfile = async (userId, user, token) => {
  console.log('Mock Update Profile:', user);
  updateUser(user);
  return Promise.resolve({ data: user });
};

export const updatePassword = async (userId, user, token) => {
  console.log('Mock Update Password');
  return Promise.resolve({ data: { message: 'Password updated' } });
};

// update user localStorage
export const updateUser = (user) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('buynsell')) {
      let auth = JSON.parse(localStorage.getItem('buynsell'));
      auth.user = { ...auth.user, ...user };
      localStorage.setItem('buynsell', JSON.stringify(auth));
    }
  }
};

export const followUser = async (userId, user, token) =>
  Promise.resolve({ data: { message: 'Followed' } });

export const unfollowUser = async (userId, user, token) =>
  Promise.resolve({ data: { message: 'Unfollowed' } });

export const getUserProducts = async (userId, filter) =>
  Promise.resolve({ data: [] });

export const userActiveProducts = async (userId) =>
  Promise.resolve({ data: [] });

export const userPendingProducts = async (userId) =>
  Promise.resolve({ data: [] });

export const userClosedProducts = async (userId) =>
  Promise.resolve({ data: [] });

export const userFavouriteProducts = async (userId) =>
  Promise.resolve({ data: [] });

export const getUserNotifications = async (userId) =>
  Promise.resolve({ data: [] });

export const markNotificationsRead = async (userId, notificationCount) =>
  Promise.resolve({ data: { message: 'Notifications read' } });

export const setMsgToUnread = async (userId) =>
  Promise.resolve({ data: { message: 'Message set to unread' } });

export const markMessageRead = async (userId) =>
  Promise.resolve({ data: { message: 'Message marked as read' } });

