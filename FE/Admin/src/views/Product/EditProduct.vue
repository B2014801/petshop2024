<template>
    <div>
        <UpdateProductFrom
            v-if="Product != null"
            @submit:update="update"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :Edit="edit"
            :Product="Product"
            :brands="brands"
        />
    </div>
</template>

<script>
import UpdateProductFrom from '@/components/form/UpdateProductFrom.vue';
import ProductService from '@/services/product.service';
import BrandService from '@/services/brand.service';

export default {
    components: {
        UpdateProductFrom,
    },
    props: {
        id: { type: String },
    },
    data() {
        return { isShowUpdateSuccess: false, edit: true, Product: null, brands: [] };
    },
    methods: {
        async update(data) {
            try {
                const result = await ProductService.update(this.id, data);
                if (result) {
                    this.isShowUpdateSuccess = true;
                    this.$router.push({ name: 'product' });
                }
            } catch (er) {
                console.log(er);
            }
        },
        async findById() {
            try {
                this.Product = await ProductService.findProductById(this.id);
                this.getAllBrand();
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
        this.findById();
        // this.getAllBrand();
    },
};
</script>

<style lang="scss" scoped></style>
