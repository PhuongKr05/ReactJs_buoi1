export const mockProducts = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Sản phẩm ${index + 1}`,
  price: Math.floor(Math.random() * 100000) + 10000,
  quantity: 1,
}));
