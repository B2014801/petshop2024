<template>
    <div class="mt-3 mb-4 mx-2">
        <h4 class="text-center mt-3">Nhãn hiệu sản phẩm</h4>
        <h4 class="text-center">({{ brands.length }})</h4>
        <div class="text-center">
            <router-link to="/brand/add"><button class="btn btn-secondary">Thêm</button></router-link>
        </div>

        <Table
            v-if="brands.length != 0"
            :Data="getDataTable()"
            :fields="fields"
            :fieldsMap="fieldsMap"
            categoryname="brand"
            @deleteProduct="deleteBrand"
        />
    </div>
    <!-- <ProductList :products="brands" @deleteProduct="deleteBrand" brandorproduct="brand" /> -->
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/Product/ProductList.vue';
import BrandService from '@/services/brand.service';
import Table from '@/components/table/table.vue';
export default {
    data() {
        return {
            brands: [],
            images: images,
            fields: ['STT', 'Tên', 'Hình ảnh', 'Sửa'],
            fieldsMap: ['STT', 'name', 'img', 'edit'],
        };
    },
    components: {
        ProductList,
        Table,
    },
    methods: {
        async getAllBrand() {
            try {
                this.brands = await BrandService.getAllBrand();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBrand(id) {
            try {
                await BrandService.delete(id);
                this.getAllBrand();
            } catch (error) {
                console.log(error);
            }
        },
        getDataTable() {
            let datas = [];
            try {
                if (this.brands.length != 0) {
                    this.brands.map(async (item, index) => {
                        let data = {};
                        data.STT = index;
                        data.id = item._id;
                        data.name = item.name;
                        data.img = item.img;

                        datas.push(data);
                    });
                    return datas;
                }
            } catch (error) {
                console.log(this.brands);
                console.log(error);
            }
        },
    },
    created() {
        document.title = 'Brand';
        this.getAllBrand();
    },
};
</script>

<style lang="scss" scoped></style>
