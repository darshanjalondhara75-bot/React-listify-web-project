export const getChats = async (userId) =>
  Promise.resolve({ data: [] });

export const deleteChat = async (messagesWith, userId, token) =>
  Promise.resolve({ data: { message: 'Chat deleted' } });

