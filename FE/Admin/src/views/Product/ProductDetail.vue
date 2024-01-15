<template>
    <section class="mx-5">
        <section>
            <div class="row my-2">
                <div class="col-md-5 col-12">
                    <div class="card text-center border-0">
                        <div class="mt-2" style="text-align: left">
                            <img class="img-fluid" :src="images.logo" alt="book1" style="width: 500px; height: 400px" />
                        </div>
                        <div class="card-body"></div>
                    </div>
                </div>
                <div class="col-md-7 col-12 pl-0">
                    <div class="row">
                        <!-- <form  action="pages/main/xulygiohang.php?id_sanpham=<?php echo $row['id_sanpham']; ?>" method="POST"> -->
                        <h2 class="text-uppercase">{{ products.name }}</h2>
                    </div>
                    <div class="row">
                        <h4 class="text-uppercase">
                            <del style="opacity: 0.5; margin-right: 6px">100 ₫ </del
                            ><bdi class="text-danger">80 ₫</bdi> : 100 ₫
                        </h4>
                    </div>
                    <div class="mt-4">
                        <div class="d-flex">
                            <label class="d-inline mt-2" for="">Số lượng:</label>
                            <div class="add-minus d-flex mx-1 minus-and-plus">
                                <button
                                    type="text"
                                    class="minus-sp congtru bg-light border border-light-subtle"
                                    id="minus-sp"
                                >
                                    -
                                </button>
                                <input
                                    class="text-center bg-light border border-light-subtle"
                                    type="text"
                                    name="soluong"
                                    id="amount"
                                    data-id="<?php echo $row['id_sanpham']?>"
                                    size="2"
                                    value="1"
                                    style="outline: none"
                                />
                                <button class="plus-sp congtru bg-light border border-light-subtle" id="plus-sp">
                                    +
                                </button>
                            </div>
                        </div>
                        <div class="mt-3">
                            <label for="" class="mb-0"
                                >Kho: <span class="text-danger font-weight-bold">Sản phẩm hiện đang hết hàng</span>';
                                ?></label
                            >
                        </div>
                        <div class="mt-3">
                            <p>
                                <b>Lưu ý</b>: Giá sản phẩm có thể thay đổi theo từng thời điểm.
                                <span class="text-primary font-weight-bold">Kết Bạn Zalo</span> hoặc
                                <span class="text-danger font-weight-bold">Gọi Hotline</span> để xem thêm hình ảnh/video
                                chi tiết.
                            </p>
                        </div>
                        <div class="d-flex mt-3">
                            <!-- <?php if ($row['soluongsp'] > 0){ ?> -->
                            <button class="btn btn-lg btn-primary text-white ml-0" type="submit" name="themvaogio">
                                Thêm vào giỏ
                            </button>
                            <!-- <?php }?> -->
                        </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button
                            class="accordion-button collapsed fs-5"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                            @click="handleCollapse1"
                        >
                            Mô tả
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        class="accordion-collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample"
                        v-if="isShowCollapse1"
                    >
                        <div class="accordion-body">
                            <p><b>tensp</b>mota</p>
                            <p class="text-center"><b>Quyền lợi có được khi mua tensp tại Pet Shop.</b></p>
                            <ol>
                                <li>Bảo hành thuần chủng trọn đời.</li>
                                <li>
                                    Bảo hành bệnh truyền nhiễm nguy hiểm ở chó là Care và Parvo 7 ngày đầu về nhà mới.
                                    Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức khỏe 1 năm nếu có nhu cầu. (Thú
                                    cưng là động vật sống, nhạy cảm với môi trường sống, thức ăn… bởi vậy hãy chăm sóc
                                    theo hướng dẫn của PetHouse hướng dẫn nhé)
                                </li>
                                <li>Miễn phí vận chuyển toàn quốc</li>
                                <li>Giảm giá 10% cho các lần mua thú cưng tiếp theo.</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button
                            class="accordion-button collapsed fs-5"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                            @click="handleCollapse2"
                        >
                            Đánh giá
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        class="accordion-collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample"
                        v-if="isShowCollapse2"
                    >
                        <div class="accordion-body mt-3">
                            <h5 class="text-center">Nhận xét về tensp</h5>
                            <div class="card-comment w-100">
                                <div class="d-flex">
                                    <div>
                                        <img
                                            src="./pages/main/quanlytaikhoan/uploads/<?php echo $row['hinhanh']!=''? $row['hinhanh'] :'user.jpg' ?>"
                                            width="40"
                                            height="40"
                                            class="rounded-circle mt-2"
                                        />
                                    </div>
                                    <div class="col-10">
                                        <div class="comment-box">
                                            <h6>hoten</h6>

                                            <div class="rating-other-user d-inline-block w-100">
                                                <!-- <?php for($i=0;$i<$row['so_sao'];$i++){ ?> -->
                                                <i class="fa-solid fa-star" style="color: #ff0000"></i>
                                                <!-- <?php }?> -->
                                                <!-- <?php for($i=0;$i<5-$row['so_sao'];$i++){ ?> -->
                                                <i class="fa-sharp fa-regular fa-star" style="color: #ff0000"></i>
                                                <!-- <?php }?> -->
                                            </div>
                                            <p class="mb-0">ngay</p>
                                            <p class="mb-0">noi dung</p>

                                            <!-- <?php if((isset($_SESSION['ktradangnhap'])&&$_SESSION['ktradangnhap']==$row['id_taikhoan'])||isset( $_SESSION['tendangnhapadmin'])){ echo '<a href="pages/main/binhluan.php?action=xoabinhluan&&id='.$row['id_binhluan'].'"class="btn btn-danger">Xoá</a>';} ?> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                action="pages/main/binhluan.php?id_sanpham=<?php echo $_GET['sanpham'] ?>"
                                method="POST"
                            >
                                <div class="card-comment">
                                    <div class="d-flex">
                                        <div>
                                            <!-- <img src=> -->
                                        </div>
                                        <div class="col-10">
                                            <div class="comment-box ml-2">
                                                <h4>Thêm bình luận</h4>
                                                <div class="rating">
                                                    <input type="radio" name="rating" value="5" id="5" /><label for="5"
                                                        >☆</label
                                                    >
                                                    <input type="radio" name="rating" value="4" id="4" /><label for="4"
                                                        >☆</label
                                                    >
                                                    <input type="radio" name="rating" value="3" id="3" /><label for="3"
                                                        >☆</label
                                                    >
                                                    <input type="radio" name="rating" value="2" id="2" /><label for="2"
                                                        >☆</label
                                                    >
                                                    <input type="radio" name="rating" value="1" id="1" /><label for="1"
                                                        >☆</label
                                                    >
                                                </div>
                                                <div class="comment-area">
                                                    <textarea
                                                        class="form-control"
                                                        name="noidung"
                                                        placeholder="Bạn cảm thấy sản phẩm này thế nào?"
                                                        rows="3"
                                                    ></textarea>
                                                </div>
                                                <div class="comment-btns mt-2">
                                                    <!-- <div class="row"> -->
                                                    <!-- <div class="col-6"> -->
                                                    <div class="text-left">
                                                        <button
                                                            class="btn btn-success"
                                                            name="thembinhluan"
                                                            type="submit"
                                                        >
                                                            GỬI
                                                        </button>
                                                    </div>
                                                    <!-- </div> -->
                                                    <!-- </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <hr />
            <h4>SẢN PHẨM TƯƠNG TỰ</h4>
            <ProductList />
        </section>
    </section>
</template>

<script>
import images from '@/assets/imgs';
import ProductList from '@/views/product/ProductList.vue';
import PetshopService from '@/services/petshop.service';
export default {
    data() {
        return {
            products: [],
            images: images,
            isShowCollapse1: false,
            isShowCollapse2: false,
        };
    },
    props: { id: { type: String } },
    components: { ProductList },
    methods: {
        async findById(id) {
            try {
                this.products = await PetshopService.findProductById(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: 'notfound',
                    params: {
                        pathMatch: this.$route.path.split('/').slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        handleCollapse1() {
            this.isShowCollapse1 = !this.isShowCollapse1;
            if (this.isShowCollapse1) {
                this.isShowCollapse2 = false; // Close the other collapse
            }
        },
        handleCollapse2() {
            this.isShowCollapse2 = !this.isShowCollapse2;
            if (this.isShowCollapse2) {
                this.isShowCollapse1 = false; // Close the other collapse
            }
        },
    },
    created() {
        this.findById(this.id);
    },
};
</script>

<style lang="scss" scoped>
.rating {
    display: flex;
    margin-top: -10px;
    flex-direction: row-reverse;
    margin-left: -4px;
    float: left;

    input {
        display: none;
    }
    input:checked ~ label:before {
        opacity: 1;
    }
}

.rating > label,
.start-icon {
    position: relative;
    width: 19px;
    font-size: 25px;
    color: #ff0000;
    cursor: pointer;
}

.rating > label::before,
.star-icon::before {
    content: '\2605';
    position: absolute;
    opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before,
.star-icon:before {
    opacity: 1 !important;
}

.rating:hover > input:checked ~ label:before {
    opacity: 0.4;
}
</style>
