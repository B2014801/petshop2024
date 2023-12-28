import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';

import style from './form.module.scss';
import GoogleSignIn from '~/components/auth/OAuth2';

const cx = classNames.bind(style);

const loginValidate = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

function LoginForm({ sendUserData, wrongEmailOrPass }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(loginValidate),
    });
    const onSubmit = (data) => {
        if (savePassword) {
            setCookie(data);
        }
        sendUserData(data);
    };

    //yup register is already set two way binding
    // const [user, setUser] = useState({ email: '', password: '' });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser((prevUser) => ({
    //         ...prevUser,
    //         [name]: value,
    //     }));
    // };

    const [showPassword, setShowPassword] = useState(false);
    const [savePassword, setSavePassword] = useState(false);

    useEffect(() => {
        getCookie();
    }, []);

    function setCookie(user) {
        if (Cookies.get('userclient')) {
            Cookies.remove('userclient');
        }
        // Set a cookie to store the password
        Cookies.set('userclient', JSON.stringify(user), { expires: 7 }); // 'passwordCookie' is the cookie name
    }
    function getCookie() {
        if (Cookies.get('userclient')) {
            let cookie = JSON.parse(Cookies.get('userclient'));
            // this.user.email = cookie.email;
            // this.user.password = cookie.password;
            setValue('email', cookie.email);
            setValue('password', cookie.password);
        }
    }
    return (
        <div className="container w-50 border border-primary rounded my-3 p-0">
            <h3 className="bg-success text-white p-2 text-organ text-center">Chào mừng bạn đến với shop thú cưng</h3>
            {/* <Form @submit="submitLogin" :validation-schema="loginValidate"> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="m-3">
                    {wrongEmailOrPass && <strong class="text-danger">Email hoặc mật khẩu không hợp lệ</strong>}
                    <div className="form-group font-weight-bold">
                        <label for="email">
                            Email <strong class="text-danger">(*)</strong>{' '}
                        </label>
                        <div className="input-group border">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control border-0"
                                placeholder="Vui lòng nhập vào email của bạn"
                                {...register('email')}
                            />
                        </div>
                        <strong className="text-danger">{errors.email?.message}</strong>
                    </div>
                    <div className="form-group font-weight-bold">
                        <label for="password" class="my-2">
                            Mật khẩu <strong class="text-danger">(*)</strong>
                        </label>
                        <div className="input-group border">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                className="form-control border-0"
                                placeholder="Nhập mật khẩu của bạn"
                                // onChange={handleInputChange}
                                {...register('password')}
                            />
                            <FontAwesomeIcon
                                onClick={() => setShowPassword(!showPassword)}
                                className="border-0 bg-white px-2 my-auto"
                                icon={faEye}
                            />
                        </div>
                        <strong className="text-danger">{errors.password?.message}</strong>
                    </div>
                    <div className="form-group form-check my-2">
                        <input
                            type="checkbox"
                            id="remember"
                            name="nho-mat-khau"
                            className="form-check-input"
                            onClick={() => setSavePassword(!savePassword)}
                            // v-model="isSavePassword"
                        />
                        <label for="remember" className="form-check-label">
                            Ghi nhớ tôi
                        </label>
                    </div>
                    <div className={cx('btn-login-register-container')}>
                        <button class="btn btn-info" type="submit">
                            Đăng nhập
                        </button>
                        <Link class="btn btn-info ms-4" to="/register" role="button">
                            Tạo tài khoản
                        </Link>
                    </div>
                </div>
            </form>
            <div className={cx('login-choice')}>
                <span>Đăng nhập với</span>
            </div>
            <div className="mb-3">
                <GoogleSignIn onSignIn={onSubmit} />
            </div>
        </div>
    );
}

export default LoginForm;
