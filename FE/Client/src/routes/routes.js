import config from '~/config';

import Home from '~/pages/home';
import Cart from '~/pages/cart';
import Login from '~/pages/auth/login';
import Register from '~/pages/auth/register';
import NotFound from '~/pages/notFound/notFound';
import Brand from '~/pages/brand/brand';
import { Product, ProductDetail } from '~/pages/product';
import { CheckOut } from '~/pages/checkout';
import { UserHome, Purchase, Profile } from '~/pages/user';

const publicRoutes = [
    { path: config.routes.notfound, component: NotFound },
    { path: config.routes.home, component: Home },
    { path: config.routes.brand, component: Brand },

    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.product, component: Product },
    { path: config.routes.productDetail, component: ProductDetail },
];

const privateRoutes = [
    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: CheckOut },
    {
        path: config.routes.user,
        component: UserHome,
        nestRoute: [
            { path: config.routes.userPurchase, component: Purchase },
            { path: config.routes.userProfile, component: Profile },
        ],
    },
];

export { publicRoutes, privateRoutes };
