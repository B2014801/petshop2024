import config from '~/config';

import Home from '~/pages/home';
import Cart from '~/pages/cart';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
