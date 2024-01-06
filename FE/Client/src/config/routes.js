const routes = {
    home: '/',
    cart: '/cart',
    login: '/login',
    register: '/register',
    brand: '/shop/:CategoryName/:CategoryId',
    product: '/shop/:CategoryName/:BrandName/:id',
    productDetail: '/product/:ProductName/:id',
    checkout: '/checkout',
    user: 'user',
    userPurchase: 'purchase/:stateId',
    userProfile: 'profile',
    pictureSearch: '/pictureSearch',
    nameSearch: '/search',
    notfound: '*',
};

export default routes;
