<template>
    <div class="row card-group mx-3 mt-2">
        <div class="col-sm-4 col-md-3 col-lg-2 col-6 mb-3" v-for="(product, index) in products">
            <div class="product-item">
                <!-- <router-link
                    :to="{ name: 'productdetail', params: { id: product._id } }"
                    class="text-dark text-decoration-none"
                > -->
                <div class="card position-relative border-0">
                    <!-- <div class="selloff">
                        <h6 class="text-center m-1">{{ product.discount }} %</h6>
                    </div> -->
                    <img width="310" height="150" :src="product.img" class="card-img-top" alt="#" />
                    <div class="card-body text-center py-1">
                        <p class="mb-1">{{ product.name }}</p>
                        <h5 class="card-title"></h5>
                        <div class="update-icon">
                            <router-link :to="'/' + brandorproduct + '/' + product._id">
                                <i class="fas fa-edit"></i>
                            </router-link>
                            <i @click="() => deleteProduct(product._id)" class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import images from '@/assets/imgs';
export default {
    props: { products: { type: Array, default: [] }, brandorproduct: { type: String, default: '' } },
    data() {
        return {
            images: images,
        };
    },
    methods: {
        async deleteProduct(id) {
            this.$emit('deleteProduct', id);
        },
    },
};
</script>

<style lang="scss" scoped></style>
