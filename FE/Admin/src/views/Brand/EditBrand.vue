<template>
    <div>
        <UpdateBrandForm
            v-if="Product != null"
            @submit:update="update"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :Edit="edit"
            :Brand="Product"
            :Categorys="Categorys"
        />
    </div>
</template>

<script>
import UpdateBrandForm from '@/components/form/UpdateBrandForm.vue';
import BrandService from '@/services/brand.service';
import CategoryService from '@/services/category.service';

export default {
    components: {
        UpdateBrandForm,
    },
    props: {
        id: { type: String },
    },
    data() {
        return { isShowUpdateSuccess: false, edit: true, Product: null, Categorys: [] };
    },
    methods: {
        async update(data) {
            try {
                const result = await BrandService.update(this.id, data);
                if (result) {
                    this.isShowUpdateSuccess = true;
                }
            } catch (er) {
                console.log(er);
            }
        },
        async findById() {
            try {
                this.Product = await BrandService.findBrandById(this.id);
                this.getCategory();
            } catch (error) {
                console.log(error);
            }
        },
        async getCategory() {
            try {
                this.Categorys = await CategoryService.getAll();
            } catch (error) {}
        },
    },
    created() {
        this.findById();
    },
};
</script>

<style lang="scss" scoped></style>
