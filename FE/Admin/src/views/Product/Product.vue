<template>
    <div class="mt-3 mx-2 mb-4">
        <h4 class="text-center mt-3">Sản phẩm</h4>
        <h4 class="text-center">{{ '(' + products.length + ')' }}</h4>
        <div class="text-center">
            <router-link to="/product/add"><button class="btn btn-secondary">Thêm</button></router-link>
        </div>
        <Table
            v-if="products.length != 0"
            :Data="getDataTable()"
            :fields="fields"
            :fieldsMap="fieldsMap"
            categoryname="product"
            @deleteProduct="deleteProduct"
        />
    </div>
    <!-- <ProductList :products="products" @deleteProduct="deleteProduct" brandorproduct="product" /> -->
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/product/ProductList.vue';
import ProductService from '@/services/product.service';
import BrandService from '@/services/brand.service';
import Table from '@/components/table/table.vue';

export default {
    data() {
        return {
            products: [],
            images: images,
            fields: ['STT', 'Tên', 'Hình ảnh', 'Giá(₫)', 'Giảm(%)', 'Kho', 'Sửa'],
            fieldsMap: ['STT', 'name', 'img', 'price', 'discount', 'number', 'edit'],
        };
    },
    components: {
        ProductList,
        Table,
    },
    methods: {
        async getAllProduct() {
            try {
                this.products = await ProductService.getAllProduct();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(id) {
            try {
                await ProductService.delete(id);
                this.getAllProduct();
            } catch (error) {
                console.log(error);
            }
        },
        getDataTable() {
            let datas = [];
            try {
                this.products.map(async (item, index) => {
                    let data = {};
                    data.STT = index;
                    data.id = item._id;
                    data.name = item.name;
                    data.img = item.img;
                    data.price = item.price;
                    data.discount = item.discount;
                    data.number = parseInt(item.number);
                    datas.push(data);
                });
                return datas;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        document.title = 'Product';
        this.getAllProduct();
    },
};
</script>

<style lang="scss" scoped></style>
