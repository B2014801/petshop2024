<template>
    <div>
        <UpdateBrandForm
            @submit:create="create"
            :Add="add"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :CountAddBrand="CountAddBrand"
            :Categorys="Categorys"
        />
    </div>
</template>

<script>
import UpdateBrandForm from '@/components/form/UpdateBrandForm.vue';
import BrandService from '@/services/brand.service';
import CategoryService from '@/services/category.service';

export default {
    components: { UpdateBrandForm },
    data() {
        return {
            add: true,
            isShowUpdateSuccess: false,
            CountAddBrand: 0,
            Categorys: [],
        };
    },
    methods: {
        async create(data) {
            try {
                const result = await BrandService.add(data);
                if (result) {
                    // console.log(result);
                    this.isShowUpdateSuccess = true;
                    this.CountAddBrand++;
                }
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
        this.getCategory();
    },
};
</script>

<style lang="scss" scoped></style>
