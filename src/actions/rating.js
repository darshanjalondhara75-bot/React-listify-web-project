export const rateUser = async (userId, rating) =>
  Promise.resolve({ data: { message: 'Rated' } });

export const deleteRating = async (ratingId, userId) =>
  Promise.resolve({ data: { message: 'Rating deleted' } });

