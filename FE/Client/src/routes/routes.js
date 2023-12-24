import config from '~/config';

import Home from '~/pages/home';
import Cart from '~/pages/cart';
import Login from '~/pages/auth/login';
import Register from '~/pages/auth/register';
import NotFound from '~/pages/notFound/notFound';
import Brand from '~/pages/brand/brand';
import { Product, ProductDetail } from '~/pages/product';

const publicRoutes = [
    { path: config.routes.notfound, component: NotFound },
    { path: config.routes.home, component: Home },
    { path: config.routes.brand, component: Brand },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.product, component: Product },
    { path: config.routes.productDetail, component: ProductDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
