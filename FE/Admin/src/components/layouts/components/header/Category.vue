<template>
    <div>
        <ul class="navbar-nav">
            <li v-for="(category, index) in CategoryList" class="nav-item dropdown">
                <router-link
                    class="nav-link"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    :to="category.link"
                >
                    {{ category.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
const CategoryList = [
    {
        title: 'Danh mục',
        link: '/',
    },
    {
        title: 'Nhãn hiệu',
        link: '/brand',
    },
    {
        title: 'Sản phẩm',
        link: '/product',
    },
    {
        title: 'Đơn hàng',
        link: '/order',
    },
    {
        title: 'Doanh thu',
        link: '/revenue',
    },
    {
        title: 'Khuyến Mãi',
        link: '/voucher',
    },
    {
        title: 'Tin tức',
        link: '/news',
    },
];
export default {
    data() {
        return {
            CategoryList,
        };
    },
};
</script>

<style lang="scss" scoped></style>
