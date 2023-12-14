import config from '~/config';

import Home from '~/pages/home';
import Cart from '~/pages/cart';
import Login from '~/pages/auth/login';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.login, component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
