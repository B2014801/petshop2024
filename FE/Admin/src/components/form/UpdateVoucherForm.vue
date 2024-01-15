<template>
    <div class="col-sm-12 col-md-6 mx-auto mt-4">
        <h4 class="text-center">{{ Add ? 'Thêm Khuyến mãi' : 'Cập nhật Khuyến mãi' }}</h4>
        <strong v-if="isShowUpdateSuccess && CountUpdateProduct > 0" class="update-success">{{
            Add ? `Thêm thành công x  ${CountUpdateProduct}` : `Cập nhật thành công x ${CountUpdateProduct}`
        }}</strong>
        <Form :validation-schema="VoucherValidate" @submit="handleSubmit" enctype="multipart/form-data">
            <table class="table table-bordered">
                <tr>
                    <td><label class="form-check-label mr-2">Tên Voucher</label></td>
                    <td>
                        <Field
                            class="form-control border"
                            name="name"
                            type="text"
                            v-model="VoucherData.name"
                        /><ErrorMessage name="name" class="text-danger error-message" />
                    </td>
                </tr>

                <tr>
                    <td><label class="form-check-label mr-2">Giảm giá (%)</label></td>
                    <td>
                        <Field
                            class="form-control"
                            name="discount"
                            type="number"
                            v-model="VoucherData.discount"
                        /><ErrorMessage name="discount" class="text-danger error-message" />
                        <Field type="hidden" name="desPathUpload" v-model="VoucherData.desPathUpload" />
                    </td>
                </tr>
                <tr>
                    <td>Ngày hết hạn</td>
                    <td>
                        <Field
                            class="form-control"
                            type="date"
                            id="myDate"
                            name="expired_date"
                            required
                            v-model="VoucherData.expired_date"
                            pattern="\d{2}-\d{2}-\d{4}"
                        />
                        <ErrorMessage name="expired_date" class="text-danger error-message" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label class="form-check-label mr-2">Mô tả</label>
                    </td>
                    <td>
                        <Field
                            class="form-control"
                            name="describe"
                            type="text"
                            v-model="VoucherData.describe"
                        /><ErrorMessage name="describe" class="text-danger error-message" />
                    </td>
                </tr>

                <tr>
                    <td>Trạng Thái</td>
                    <td>
                        <select name="status" id="" v-model="VoucherData.status">
                            <option value="active">kích hoạt</option>
                            <option value="disable">ẩn</option>
                        </select>
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

        CountUpdateProduct: { type: Number },
        voucher: { type: Array },
    },
    data() {
        let VoucherValidate = yup.object().shape({
            name: yup.string().required('Vui lòng nhập tên').min(2, 'Tên ít nhất 2 ký tự').max(40, 'Tên quá dài'),

            discount: yup.number().typeError('Giảm giá phải là một số'),
            expired_date: yup
                .date()
                .required('Vui lòng chọn ngày hết hạn')
                .typeError('Vui lòng chọn ngày hết hạn')
                .test('is-future-date', 'Ngày hết hạn phải ở tương lai', (value) => {
                    if (!value) return true; // Handle empty values separately
                    const currentDate = new Date();
                    return value > currentDate;
                }),
        });
        let VoucherData = {};
        if (this.Add) {
            VoucherData = {
                name: '',
                discount: 0,
                describe: '',
                status: 'active',
                expired_date: '',
            };
        } else {
            VoucherData = this.voucher;
        }
        return {
            VoucherValidate,
            VoucherData,
        };
    },
    methods: {
        async handleSubmit() {
            if (this.Add) {
                this.$emit('submit:create', this.VoucherData);
            } else {
                this.$emit('submit:update', this.VoucherData);
            }
        },
    },
    computed: {},
};
</script>

<style lang="scss" scoped></style>
