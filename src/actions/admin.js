export const getUsers = async () =>
  Promise.resolve({ data: [] });

export const getUser = async (userId) =>
  Promise.resolve({ data: { _id: userId, name: 'Mock User' } });

export const editUser = async (userId, user, token) =>
  Promise.resolve({ data: user });

export const deleteUser = async (userId, admin, token) =>
  Promise.resolve({ data: { message: 'User deleted' } });

export const banUser = async (userId, admin, token) =>
  Promise.resolve({ data: { message: 'User banned' } });

export const unBanUser = async (userId, admin, token) =>
  Promise.resolve({ data: { message: 'User unbanned' } });

export const addCategory = async (category) =>
  Promise.resolve({ data: category });

export const allCategories = async (token) =>
  Promise.resolve({ data: [] });

export const getCategory = async (categoryId) =>
  Promise.resolve({ data: { _id: categoryId, name: 'Mock Category' } });

export const editCategory = async (categoryId, category, token) =>
  Promise.resolve({ data: category });

export const deleteCategory = async (categoryId, token) =>
  Promise.resolve({ data: { message: 'Category deleted' } });

export const addLocation = async (location) =>
  Promise.resolve({ data: location });

export const allLocations = async () =>
  Promise.resolve({ data: [] });

export const getLocation = async (locationId) =>
  Promise.resolve({ data: { _id: locationId, name: 'Mock Location' } });

export const editLocation = async (locationId, location, token) =>
  Promise.resolve({ data: location });

export const deleteLocation = async (locationId, token) =>
  Promise.resolve({ data: { message: 'Location deleted' } });

export const productStatus = async () =>
  Promise.resolve({ data: [] });

export const updateproductStatus = async (productId, status, token) =>
  Promise.resolve({ data: { message: 'Status updated' } });

export const pendingProducts = async () =>
  Promise.resolve({ data: [] });

export const activeProducts = async () =>
  Promise.resolve({ data: [] });

export const approveReport = async (productId, action, token) =>
  Promise.resolve({ data: { message: 'Report approved' } });

export const rejectReport = async (productId, token) =>
  Promise.resolve({ data: { message: 'Report rejected' } });

export const updateAdVideo = async (videoId, videoData, token) =>
  Promise.resolve({ data: { message: 'Video updated' } });

export const deleteAdVideo = async (videoId, token) =>
  Promise.resolve({ data: { message: 'Video deleted' } });
