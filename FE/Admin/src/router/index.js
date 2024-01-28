import { createWebHistory, createRouter } from 'vue-router';
import {
    Home,
    NotFound,
    Login,
    Register,
    Product,
    AddProduct,
    EditProduct,
    Category,
    Brand,
    AddBrand,
    EditBrand,
    Order,
    Revenue,
    Voucher,
    NewsList,
    NewsAdd,
    NewsDetail,
} from '@/views/';

import { useAuthStore } from '@/stores/auth.store';
const routes = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: Home,
    // },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            publicPage: true,
            layout: 'notCategoryLayout',
        },
        props: true,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            publicPage: true,
        },
    },
    {
        path: '/product',
        name: 'product',
        component: Product,
    },
    {
        path: '/product/add',
        name: 'product.add',
        component: AddProduct,
    },
    {
        path: '/product/:id',
        name: 'product.edit',
        component: EditProduct,
        props: true,
    },
    {
        path: '/',
        name: 'category',
        component: Category,
        props: true,
    },
    {
        path: '/Brand',
        name: 'Brand',
        component: Brand,
        props: true,
    },
    {
        path: '/brand/add',
        name: 'brand.add',
        component: AddBrand,
    },
    {
        path: '/brand/:id',
        name: 'brand.edit',
        component: EditBrand,
        props: true,
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        // props: true,
    },
    {
        path: '/revenue',
        name: 'revenue',
        component: Revenue,
        // props: true,
    },
    {
        path: '/voucher',
        name: 'voucher',
        component: Voucher,
        props: true,
        // props: true,
    },
    {
        path: '/voucher/:id',
        component: Voucher,
        props: true,
        // props: true,
    },
    {
        path: '/news',
        component: NewsList,
    },
    {
        path: '/news/add',
        component: NewsAdd,
    },
    {
        path: '/news/:id',
        component: NewsDetail,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, _from) => {
    const authRequired = !to.meta.publicPage; // have one equal false to interrupt loop (show comp)
    const auth = useAuthStore();
    await auth.loadAuthState();

    if (authRequired && !auth.user) {
        const query = to.fullPath === '/' ? {} : { redirect: to.fullPath };
        return {
            name: 'login',
            query,
        };
    }
});
export default router;
