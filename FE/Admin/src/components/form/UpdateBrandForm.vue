<template>
    <div class="col-sm-12 col-md-6 mx-auto mt-4">
        <h4 class="text-center">{{ Add ? 'Thêm hiệu sản phẩm ' : 'Cập nhật hiệu sản phẩm' }}</h4>
        <strong v-if="isShowUpdateSuccess" class="update-success">{{
            Add ? `Thêm thành công x  ${CountAddBrand}` : 'Cập nhật thành công'
        }}</strong>
        <Form :validation-schema="ProductAddValidate" @submit="handleSubmit" enctype="multipart/form-data">
            <table class="table table-bordered">
                <tr>
                    <td><label class="form-check-label mr-2">Tên</label></td>
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
                    <td><Label class="form-check-label mr-2">Hình ảnh</Label></td>
                    <td>
                        <Field name="img" type="file" v-model="ProductData.img" />
                        <p class="m-0"><ErrorMessage name="img" class="text-danger error-message" /></p>
                    </td>
                </tr>
                <tr>
                    <td>Danh mục</td>
                    <td>
                        <select name="brand" v-model="ProductData.categoryId">
                            <option v-for="(Category, index) in Categorys" :value="Category._id">
                                {{ Category.name }}
                            </option>
                        </select>
                        <span v-if="isShowNotChooseBrand" name="brand" class="text-danger ms-2"
                            >Vui lòng chọn danh mục</span
                        >
                    </td>
                </tr>
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
        Brand: { type: Object },
        CountAddBrand: { type: Number },
        Categorys: { type: Array },
    },
    data() {
        let ProductAddValidate = yup.object().shape({
            product_name: yup
                .string()
                .required('Vui lòng nhập tên')
                .min(2, 'Tên ít nhất 2 ký tự')
                .max(40, 'Tên quá dài'),
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
                name: '',
                desPathUpload: '/brand',
                categoryId: '',
                img: null,
                // brand: '',
                // state: '',
            };
        } else {
            ProductData = this.Brand;
        }
        return {
            ProductAddValidate,
            ProductData,
            isShowNotChooseBrand: false,
        };
    },
    methods: {
        async handleSubmit() {
            if (this.ProductData.categoryId) {
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
