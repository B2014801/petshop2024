<template>
    <div class="col-sm-12 col-md-6 mx-auto mt-4">
        <h4 class="text-center">{{ Add ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm' }}</h4>
        <strong v-if="isShowUpdateSuccess" class="update-success">{{
            Add ? `Thêm thành công x  ${CountAddProduct}` : 'Cập nhật thành công'
        }}</strong>
        <Form :validation-schema="ProductAddValidate" @submit="handleSubmit" enctype="multipart/form-data">
            <table class="table table-bordered">
                <tr>
                    <td><label class="form-check-label mr-2">Tên sản phẩm</label></td>
                    <td>
                        <Field
                            class="form-control border"
                            name="product_name"
                            type="text"
                            v-model="ProductData.name"
                        /><ErrorMessage name="product_name" class="text-danger error-message" />
                    </td>
                </tr>

                <tr>
                    <td><label class="form-check-label mr-2">Giá sản phẩm (đ)</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_price"
                            type="text"
                            v-model="ProductData.price"
                        /><ErrorMessage name="product_price" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><label class="form-check-label mr-2">Số lượng</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_number"
                            type="text"
                            v-model="ProductData.number"
                        /><ErrorMessage name="product_number" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><label class="form-check-label mr-2">Giảm giá (%)</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_discount"
                            type="number"
                            v-model="ProductData.discount"
                        /><ErrorMessage name="product_discount" class="text-danger error-message" />
                        <Field type="hidden" name="desPathUpload" v-model="ProductData.desPathUpload" />
                    </td>
                </tr>
                <tr>
                    <td><label class="form-check-label mr-2">Mô tả</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="product_describe"
                            type="text"
                            v-model="ProductData.describe"
                        /><ErrorMessage name="product_describe" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td><Label class="form-check-label mr-2">Hình ảnh</Label></td>
                    <td>
                        <Field name="img" type="file" v-model="ProductData.img" />
                        <p class="m-0"><ErrorMessage name="img" class="text-danger error-message" /></p>
                    </td>
                </tr>
                <tr>
                    <td>Hiệu sản phẩm</td>
                    <td>
                        <select name="brand" v-model="ProductData.brand">
                            <option v-for="(brand, index) in brands" :value="brand._id">
                                {{ brand.name }}
                            </option>
                        </select>
                        <span v-if="isShowNotChooseBrand" name="brand" class="text-danger ms-2"
                            >Vui lòng chọn hiệu sản phẩm</span
                        >
                    </td>
                </tr>
                <!-- <tr>
                    <td>Tình trạng</td>
                    <td>
                        <select name="tinhtrangsp" id="">
                            <option value="1">kích hoạt</option>
                            <option value="0">ẩn</option>
                        </select>
                    </td>
                </tr> -->

                <tr>
                    <td colspan="2" class="text-left">
                        <Label class="form-check-label mr-2"></Label>
                        <button class="btn btn-secondary w-25" type="submit">{{ Add ? 'Thêm' : 'Cập nhật' }}</button>
                    </td>
                </tr>
            </table>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:create', 'submit:update'],
    props: {
        isShowUpdateSuccess: { type: Boolean, default: false },
        Add: { type: Boolean, default: false },
        Edit: { type: Boolean, default: false },
        Product: { type: Array },
        CountAddProduct: { type: Number },
        brands: { type: Array },
    },
    data() {
        let ProductAddValidate = yup.object().shape({
            product_name: yup
                .string()
                .required('Vui lòng nhập tên')
                .min(2, 'Tên ít nhất 2 ký tự')
                .max(40, 'Tên quá dài'),
            product_price: yup
                .string()
                .required()
                .matches(/^\d{1,3}(\.\d{3})*$/, 'Định dạng 1.000'),
            product_number: yup
                .number('Vui lòng nhập số')
                .typeError('Số lượng phải là một số')
                .required('Vui lòng nhập số lượng'),
            product_discount: yup.number().typeError('Giảm giá phải là một số').max(100, 'Tối đa 100'),
        });
        let ProductData = {};
        if (this.Add) {
            ProductAddValidate = ProductAddValidate.shape({
                img: yup
                    .mixed()
                    .required('Vui lòng chọn ảnh')
                    .test('fileType', 'Invalid file format', (value) => {
                        if (!value) return false;
                        return ['image/jpeg', 'image/png'].includes(value.type);
                    })
                    .test('fileSize', 'File lớn hơn 1MB', (value) => {
                        if (!value) return false;
                        return value.size <= 1024 * 1024; // 1MB
                    }),
            });

            ProductData = {
                desPathUpload: '/product',
                name: '',
                price: 0,
                discount: 0,
                describe: '',
                number: 0,
                img: null,
                brand: null,
            };
        } else {
            ProductData = this.Product;
        }
        return {
            ProductAddValidate,
            ProductData,
            isShowNotChooseBrand: false,
        };
    },
    methods: {
        async handleSubmit() {
            if (this.ProductData.brand) {
                const formData = new FormData();

                // Utility function to append object properties to FormData
                function appendIfDefined(key, value) {
                    if (value !== undefined && value !== null) {
                        formData.append(key, value);
                    }
                }
                for (const key in this.ProductData) {
                    if (this.ProductData.hasOwnProperty(key)) {
                        appendIfDefined(key, this.ProductData[key]);
                    }
                }
                if (this.Edit) {
                    this.$emit('submit:update', formData);
                }
                if (this.Add) {
                    this.$emit('submit:create', formData);
                }
            } else {
                this.isShowNotChooseBrand = true;
            }
        },
    },
    computed: {
        imgFieldName() {
            return this.Add ? 'img' : ''; // Conditionally set the name attribute
        },
    },
};
</script>

<style lang="scss" scoped></style>
