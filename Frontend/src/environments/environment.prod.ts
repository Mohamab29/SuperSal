const baseUrl = 'http://localhost:3001/api/';

export const environment = {
  production: true,
  categoriesUrl: baseUrl + 'categories/',
  imagesUrl: baseUrl + 'images/',
  productsUrl: baseUrl + 'products/',
  cartsUrl: baseUrl + 'carts/',
  cartsByUserIdUrl: baseUrl + 'carts/get-by-user-id/',
  itemsUrl: baseUrl + 'items/',
  ordersUrl: baseUrl + 'orders/',
  registerUrl: baseUrl + 'auth/register/',
  loginUrl: baseUrl + 'auth/login/',
};
