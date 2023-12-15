import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GoogleSignIn from '~/components/auth/OAuth2';
import style from './form.module.scss';
import VnAddress from '~/components/address/vnAddress';

const cx = classNames.bind(style);

function RegisterForm({ sendUserRegisterData }) {
    const [userData, setUserData] = useState({});
    const [isHaveAddress, setIsHaveAddress] = useState(null);
    //validate
    const registerValidate = yup.object().shape({
        name: yup
            .string()
            .required('Bạn chưa nhập tên')
            .min(2, 'tên phải có ít nhất 2 ký tự')
            .max(30, 'Tên ít hơn 30 ký tự'),
        email: yup
            .string()
            .required('Bạn chưa nhập email')
            .email('email không hợp lệ')
            .max(40, 'email nhỏ hơn 40 ký tự '),
        password: yup
            .string()
            .required('Bạn chưa nhập mật khẩu')
            .max(100, 'Mật khẩu tối đa 100 ký tự.')
            .min(8, 'Tối thiểu 8 ký tự'),
        password_repeat: yup
            .string()
            .required('Mật khẩu không khớp')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
        phone: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({ resolver: yupResolver(registerValidate) });

    const onSubmit = (data) => {
        if (data.OAuthtype) {
            sendUserRegisterData(data);
        } else {
            if (userData.address && userData.address.split(',').length - 1 == 2) {
                sendUserRegisterData({ ...data, ...userData });
                setIsHaveAddress(true);
            } else {
                setIsHaveAddress(false);
            }
        }
    };

    return (
        <div className="container col-md-6 col-10 border border-primary rounded p-0 my-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="bg-success text-white p-2 text-organ text-center">Tạo tài khoản</h3>
                <div className="m-3">
                    <div className="form-group font-weight-bold">
                        <label for="name">
                            Họ tên <strong className="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Họ tên"
                                {...register('name')}
                            />
                        </div>
                        {/* <ErrorMessage name="name" className="text-danger" /> */}
                        <strong className="text-danger">{errors.name?.message}</strong>
                    </div>
                    <div className="form-group font-weight-bold mt-2">
                        <label for="email">
                            Email <strong className="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Vui lòng nhập vào email của bạn"
                                {...register('email')}
                            />
                        </div>
                        <strong className="text-danger">{errors.email?.message}</strong>
                        {/* <span v-if="isShowFailRegister" name="email" className="text-danger">
                            email đã tồn tại
                        </span> */}
                    </div>
                    <div className="form-group font-weight-bold mt-2">
                        <label for="phone">
                            Phone <strong className="text-danger">(*)</strong>{' '}
                        </label>
                        <div>
                            <input
                                type="phone"
                                id="phone"
                                name="phone"
                                className="form-control"
                                placeholder="Vui lòng nhập phone của bạn"
                                {...register('phone')}
                            />
                        </div>
                        <strong className="text-danger">{errors.phone?.message}</strong>
                    </div>
                    <div className="form-group font-weight-bold mt-2">
                        <label for="password">
                            Mật khẩu <strong className="text-danger">(*)</strong>{' '}
                        </label>
                        <div className="input-group border">
                            <input
                                id="password"
                                name="password"
                                // :type="isShowPassword1 ? 'text' : 'password'"
                                className="form-control border-0"
                                placeholder="Nhập mật khẩu của bạn"
                                {...register('password')}
                            />
                        </div>
                        <strong className="text-danger">{errors.password?.message}</strong>
                    </div>
                    <div className="form-group font-weight-bold mt-2">
                        <label for="password_repeat">
                            Lặp lại mật khẩu <strong className="text-danger">(*)</strong>{' '}
                        </label>
                        <div className="input-group border">
                            <input
                                id="password_repeat"
                                name="password_repeat"
                                // :type="isShowPassword2 ? 'text' : 'password'"
                                className="form-control border-0"
                                placeholder="Nhập mật khẩu của bạn"
                                {...register('password_repeat')}
                            />
                        </div>
                        <strong className="text-danger">{errors.password_repeat?.message}</strong>
                    </div>
                    <div className="mb-2">
                        <VnAddress
                            sendAddressData={(data) => {
                                setUserData((prev) => ({ ...prev, ...data }));
                            }}
                        />
                        {isHaveAddress == false && <strong className="text-danger">Chọn địa chỉ</strong>}
                    </div>
                    <div className={cx('btn-login-register-container')}>
                        <button className="btn btn-info me-4" name="dangky" type="submit">
                            Đăng ký
                        </button>
                        <Link to="/login" className="btn btn-info" name="dangky">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </form>
            <div className={cx('login-choice')}>
                <span>Đăng ký với</span>
            </div>
            <div className="mb-3">
                <GoogleSignIn onSignIn={onSubmit} />
            </div>
        </div>
    );
}

export default RegisterForm;
