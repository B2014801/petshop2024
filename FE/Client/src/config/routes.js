const routes = {
    home: '/',
    cart: '/cart',
    login: '/login',
    register: '/register',
    brand: '/shop/:CategoryName/:CategoryId',
    product: '/shop/:CategoryName/:BrandName/:id',
    productDetail: '/product/:ProductName/:id',

    notfound: '*',
};

export default routes;
