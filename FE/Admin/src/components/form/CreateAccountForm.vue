<template>
    <div class="container col-md-6 col-10 border border-primary rounded p-0 my-2">
        <Form @submit="handleSubmitCreate" :validation-schema="validateCreate">
            <h3 class="bg-success text-white p-2 text-organ text-center">Tạo tài khoản</h3>
            <div class="m-3">
                <div class="form-group font-weight-bold">
                    <label for="username">Họ tên <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field type="text" id="username" name="username" class="form-control" placeholder="Họ tên" />
                    </div>
                    <ErrorMessage name="username" class="text-danger" />
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="email">Email <strong class="text-danger">(*)</strong> </label>
                    <div>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Vui lòng nhập vào email của bạn"
                            v-model="formData.email"
                        />
                    </div>
                    <ErrorMessage name="email" class="text-danger" />
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="password">Mật khẩu <strong class="text-danger">(*)</strong> </label>
                    <div class="input-group border">
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            class="form-control border-0"
                            placeholder="Nhập mật khẩu của bạn"
                            v-model="formData.password"
                        />
                        <i
                            onclick="ShowPassword(document.querySelector('#password-dangky'))"
                            class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                        ></i>
                    </div>
                    <ErrorMessage name="password" class="text-danger" />
                </div>
                <div class="form-group font-weight-bold mt-2">
                    <label for="password_repeat">Lặp lại mật khẩu <strong class="text-danger">(*)</strong> </label>
                    <div class="input-group border">
                        <Field
                            id="password_repeat"
                            name="password_repeat"
                            type="password"
                            class="form-control border-0"
                            placeholder="Nhập mật khẩu của bạn"
                        />
                        <i
                            onclick="ShowPassword(document.querySelector('#password-dangky-laplai'))"
                            class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"
                        ></i>
                    </div>
                    <ErrorMessage name="password_repeat" class="text-danger" />
                </div>
                <div class="mt-2">
                    <button class="btn btn-info me-4" name="dangky" type="submit">Đăng ký</button>
                    <button to="/login" class="btn btn-info" name="dangky" @click="goToLogin">Đăng nhập</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    data() {
        const validateCreate = yup.object().shape({
            username: yup
                .string()
                .required('Bạn chưa nhập tên')
                .min(2, 'tên phải có ít nhất 2 ký tự')
                .max(30, 'Tên ít hơn 30 ký tự'),
            email: yup
                .string()
                .required('Bạn chưa nhập email')
                .email('email không hợp lệ')
                .max(40, 'email nhỏ hơn 40 ký tự '),
            password: yup.string().required('Bạn chưa nhập mật khẩu').max(100, 'Địa chỉ tối đa 100 ký tự.'),
            password_repeat: yup
                .string()
                .required('Mật khẩu không khớp')
                .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
            phone: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
        });
        return {
            validateCreate,
            formData: {
                // Initialize an empty object to store form data
                email: '',
                password: '',
            },
        };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['create:account'],
    methods: {
        handleSubmitCreate() {
            // truyền dữ liệu từ comp con đến comp cha
            this.$emit('create:account', this.formData);
        },
        goToLogin() {
            this.$router.push({ name: 'login' });
        },
    },
};
</script>

<style lang="scss" scoped></style>
