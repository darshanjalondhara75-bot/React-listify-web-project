const getMockProducts = () => {
  const saved = localStorage.getItem('mockProducts');
  return saved ? JSON.parse(saved) : [
    {
      _id: 'p1',
      name: 'iPhone 13 Pro',
      price: 999,
      category: { _id: 'c1', name: 'Electronics' },
      description: 'Latest iPhone model',
      images: [{ url: 'https://placehold.co/600x400?text=iPhone+13+Pro' }],
      status: 'Active'
    },
    {
      _id: 'p2',
      name: 'Running Shoes',
      price: 120,
      category: { _id: 'c2', name: 'Fashion' },
      description: 'Comfortable running shoes',
      images: [{ url: 'https://placehold.co/600x400?text=Running+Shoes' }],
      status: 'Active'
    }
  ];
};

export const addProduct = async (userId, product, token) => {
  console.log('Mock Add Product:', product);
  const products = getMockProducts();
  const newProduct = { ...product, _id: Date.now().toString(), createdAt: new Date().toISOString() };
  localStorage.setItem('mockProducts', JSON.stringify([newProduct, ...products]));
  return Promise.resolve({ data: newProduct });
};

export const allProducts = async () => {
  return Promise.resolve({ data: getMockProducts() });
};

export const singleProduct = async (productId) => {
  const products = getMockProducts();
  const product = products.find(p => p._id === productId) || products[0];
  return Promise.resolve({ data: product });
};

export const relatedProducts = async (categoryId) => {
  const products = getMockProducts();
  return Promise.resolve({ data: products.filter(p => p.category?._id === categoryId) });
};

export const favouriteCount = async (productId) => {
  return Promise.resolve({ data: { count: 5 } });
};

export const getByCategory = async (categoryId) => {
  const products = getMockProducts();
  return Promise.resolve({ data: products.filter(p => p.category?._id === categoryId) });
};

export const updateProduct = async (productId, product, token) => {
  const products = getMockProducts();
  const updated = products.map(p => p._id === productId ? { ...p, ...product } : p);
  localStorage.setItem('mockProducts', JSON.stringify(updated));
  return Promise.resolve({ data: product });
};

export const closeProduct = async (productId, token) => {
  return Promise.resolve({ data: { message: 'Product closed' } });
};

export const deleteProductImage = async (productId, imageId, imageUrl, token) => {
  return Promise.resolve({ data: { message: 'Image deleted' } });
};

export const addFavourite = async (productId, user, token) => {
  return Promise.resolve({ data: { message: 'Added to favorites' } });
};

export const removeFavourite = async (productId, user, token) => {
  return Promise.resolve({ data: { message: 'Removed from favorites' } });
};

export const getFilteredProducts = async (filters = {}, sortBy) => {
  return Promise.resolve({ data: getMockProducts() });
};

export const allCategories = async () => {
  return Promise.resolve({
    data: [
      { _id: 'c1', name: 'Electronics' },
      { _id: 'c2', name: 'Fashion' },
      { _id: 'c3', name: 'Home' }
    ]
  });
};

export const allLocations = async () => {
  return Promise.resolve({
    data: [
      { _id: 'l1', name: 'New York' },
      { _id: 'l2', name: 'London' }
    ]
  });
};

export const searchResults = async (query) => {
  return Promise.resolve({ data: getMockProducts() });
};

export const reportProduct = async (productId, report) => {
  return Promise.resolve({ data: { message: 'Reported' } });
};

export const getReportedProducts = async () => {
  return Promise.resolve({ data: [] });
};

