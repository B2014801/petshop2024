<template>
    <div>
        <UpdateProductFrom
            @submit:create="create"
            :Add="add"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :CountAddProduct="CountAddProduct"
            :brands="brands"
        />
    </div>
</template>

<script>
import UpdateProductFrom from '@/components/form/UpdateProductFrom.vue';
import ProductService from '@/services/product.service';
import BrandService from '@/services/brand.service';

export default {
    components: { UpdateProductFrom },
    data() {
        return {
            add: true,
            isShowUpdateSuccess: false,
            CountAddProduct: 0,
            brands: [],
        };
    },
    methods: {
        async create(data) {
            try {
                const result = await ProductService.add(data);
                if (result) {
                    // console.log(result);
                    this.isShowUpdateSuccess = true;
                    this.CountAddProduct++;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllBrand() {
            try {
                this.brands = await BrandService.getAllBrand();
            } catch (error) {}
        },
    },
    created() {
        this.getAllBrand();
    },
};
</script>

<style lang="scss" scoped></style>
