import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const loginValidate = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

function LoginForm({ sendUserData }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginValidate),
    });
    const onSubmit = (data) => sendUserData(data);

    //yup register is already set two way binding
    // const [user, setUser] = useState({ email: '', password: '' });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser((prevUser) => ({
    //         ...prevUser,
    //         [name]: value,
    //     }));
    // };
    return (
        <div class="container w-50 border border-primary rounded my-3 p-0">
            <h3 class="bg-success text-white p-2 text-organ text-center">Chào mừng bạn đến với shop thú cưng</h3>
            {/* <Form @submit="submitLogin" :validation-schema="loginValidate"> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="m-3">
                    {/* <strong v-if="errorLoginEmailOrPassword" class="text-danger">
                        Email hoặc mật khẩu không hợp lệ
                    </strong> */}
                    <div class="form-group font-weight-bold">
                        <label for="email">
                            Email <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                // value={user.email}
                                class="form-control"
                                placeholder="Vui lòng nhập vào email của bạn"
                                // onChange={handleInputChange}
                                {...register('email')}
                            />
                        </div>
                        <strong class="text-danger">{errors.email?.message}</strong>
                    </div>
                    <div class="form-group font-weight-bold">
                        <label for="password" class="my-2">
                            Mật khẩu <strong class="text-danger">(*)</strong>
                        </label>
                        <div class="input-group border">
                            <input
                                id="password"
                                name="password"
                                // :type="isShowPassword ? 'text' : 'password'"
                                // value={user.password}
                                class="form-control border-0"
                                placeholder="Nhập mật khẩu của bạn"
                                // onChange={handleInputChange}
                                {...register('password')}
                            />
                            {/* <i @click="showPassword" class="fa-sharp fa-solid fa-eye border-0 bg-white px-2 my-auto"></i> */}
                        </div>
                        <strong class="text-danger">{errors.password?.message}</strong>
                    </div>
                    <div class="form-group form-check my-2">
                        {/* <input
                            type="checkbox"
                            id="remember"
                            name="nho-mat-khau"
                            class="form-check-input"
                            // @click="isSavePassword = !isSavePassword"
                            // v-model="isSavePassword"
                        /> */}
                        <label for="remember" class="form-check-label">
                            Ghi nhớ tôi
                        </label>
                    </div>
                    <div class="btn-login-register-container">
                        <button class="btn btn-info" type="submit">
                            Đăng nhập
                        </button>
                        <Link class="btn btn-info ms-4" to="/register" role="button">
                            Tạo tài khoản
                        </Link>
                    </div>
                    <div class="login-choice">
                        <span>Đăng nhập với</span>
                    </div>
                    {/* <Oauth @submit:oauthdata="handleSubmitOauth" /> */}
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
