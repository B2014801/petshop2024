import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import style from './form.module.scss';
import Model1 from '../modals/modal1';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSerVice } from '~/services';
import VnAddress from '../address/vnAddress';
import { Success } from '../notification';
import { logout } from '~/stores/auth.store';
import Warning from '../notification/warning';
import { areObjectsEqual } from '~/components/functions';
import { useNavigate } from 'react-router-dom';
import { setAmount } from '~/stores/cart.store';

const cx = classNames.bind(style);
function UpdateUserInforForm({ isShowImg = false, sendIsValid = () => {} }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user);
    const [state, setState] = useState({
        user: null,
        address: null,
        isChosenAddres: true,
        imageUrl: null,
        isuserValid: null,
        showModal: false,
        countUpdateTime: 0,
        sWrongOldPass: false,
        sP1: false,
        sP2: false,
        sP3: false,
    });
    const userValidate = yup.object().shape({
        name: yup
            .string()
            .required('Bạn chưa nhập tên')
            .min(2, 'tên phải có ít nhất 2 ký tự')
            .max(30, 'Tên ít hơn 30 ký tự'),

        phone: yup
            .string()
            .required('vui lòng nhập số điện thoại')
            .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ.'),
    });
    const passwordValidate = yup.object().shape({
        password: yup
            .string()
            .required('Bạn chưa nhập mật khẩu')
            .max(100, 'Mật khẩu tối đa 100 ký tự.')
            .min(8, 'Tối thiếu 8 ký tự')
            .notOneOf([yup.ref('old_password')], 'Phải khác mật khẩu cũ'),
        old_password: yup
            .string()
            .required('Bạn chưa nhập mật khẩu')
            .max(100, 'Mật khẩu tối đa 100 ký tự.')
            .min(8, 'Tối thiếu 8 ký tự'),

        password_repeat: yup
            .string()
            .required('Mật khẩu không khớp')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
    });
    const {
        handleSubmit: userFormSubmit,
        register: userFormRegister,
        formState: userFormError,
        setValue,
    } = useForm({ resolver: yupResolver(userValidate) });
    const {
        handleSubmit: passwordFormSubmit,
        register: passwordFormRegister,
        formState: passwordFormError,
        setValue: passwordFormSetvalue,
    } = useForm({ resolver: yupResolver(passwordValidate) });

    useEffect(() => {
        if (user) {
            (async () => {
                let rs = await userSerVice.getUser(user.user._id);
                if (rs) {
                    setState((prev) => ({ ...prev, user: rs }));
                    setValue('name', rs.name);
                    setValue('phone', rs.phone);
                }
            })();
        }
    }, [setValue, user, state.countUpdateTime]);
    const handleSubmitUser = async (data, passwords = null) => {
        try {
            if (state.isChosenAddres) {
                let formData = new FormData();
                let user = {
                    ...state.user,
                    phone: data.phone,
                    name: data.name,
                    address: state.address,
                    password: passwords ?? state.user.password,
                };
                if (passwords) {
                    user.password = passwords;
                }
                if (!areObjectsEqual(user, state.user)) {
                    // Utility function to append object properties to FormData
                    function appendIfDefined(key, value) {
                        if (value !== undefined && value !== null) {
                            formData.append(key, value);
                        }
                    }
                    for (const key in user) {
                        if (user.hasOwnProperty(key)) {
                            appendIfDefined(key, user[key]);
                        }
                    }
                    let rs = await userSerVice.update(formData);
                    if (rs) {
                        console.log(rs);
                        setState((prev) => ({ ...prev, countUpdateTime: prev.countUpdateTime + 1 }));
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleChangePassword = async (data) => {
        // const hashedPassword = await bcrypt.hash(this.newpassword, saltRounds);
        try {
            //(text, hash)
            const isMatch = await bcrypt.compare(data.old_password, state.user.password);
            if (isMatch) {
                const saltRounds = 10; // Number of salt rounds
                const hashedPassword = await bcrypt.hash(data.password_repeat, saltRounds);
                // this.handleSubmit();
                const dataUser = { ...state.user, password: hashedPassword };
                handleSubmitUser(dataUser, hashedPassword);
                passwordFormSetvalue('old_password', '');
                passwordFormSetvalue('password', '');
                passwordFormSetvalue('password_repeat', '');
                setState((prev) => ({ ...prev, showModal: false, sWrongOldPass: false }));
            } else {
                setState((prev) => ({ ...prev, sWrongOldPass: true }));
            }
        } catch (error) {
            console.error('Error verifying password:', error);
        }
    };
    const displayImage = (event) => {
        const file = event.target.files[0];

        if (file) {
            setState((prev) => ({ ...prev, user: { ...prev.user, img: file } }));
            // Create a FileReader to read the image file
            const reader = new FileReader();

            // Define a callback for when the reading is completed
            reader.onload = (e) => {
                // Set the image URL to the result of the FileReader
                setState((prev) => ({ ...prev, imageUrl: e.target.result }));
            };

            // Read the image file as a data URL
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, clear the image URL
            setState((prev) => ({ ...prev, imageUrl: null }));
        }
    };
    const handleSetAddres = (data) => {
        // eslint-disable-next-line eqeqeq
        if (data && data.address != state.address) {
            setState((prev) => ({
                ...prev,
                address: data.address,
            }));
        }
    };
    // for first time with gg
    const isUserValid = useMemo(() => {
        if (state.user) {
            let vl = state.user.hasOwnProperty('phone') && state.user.hasOwnProperty('address');
            sendIsValid(vl);
            return vl;
        }
    }, [state.user]);
    return (
        <>
            {state.user && (
                <>
                    <form
                        onSubmit={userFormSubmit((data) => handleSubmitUser(data, null))}
                        encType="multipart/form-data"
                    >
                        <div className="row">
                            {isShowImg && (
                                <div className="col-md-4 col-sm-12 col-12 text-center">
                                    {!state.imageUrl ? (
                                        <img
                                            src={state.user.img}
                                            className="rounded-circle d-block mx-auto"
                                            width="200"
                                            height="200"
                                            alt=""
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <img
                                            src={state.imageUrl}
                                            className="rounded-circle d-block mx-auto"
                                            width="200"
                                            height="200"
                                            style={{ objectFit: 'cover' }}
                                            alt=""
                                        />
                                    )}
                                    <label for="img" className="text-center bg-success text-white p-2 rounded mt-2">
                                        Tải ảnh lên{' '}
                                    </label>
                                    <input type="file" id="img" name="img" className="d-none" onChange={displayImage} />
                                </div>
                            )}

                            <div className={`col-md-8 col-12 col-sm-12  ${isShowImg ? 'mx-auto' : ''}`}>
                                {/* <h6
                                    v-show="!isuserValid"
                                    className="text-center py-1"
                                    style="background-color: #d1f4da"
                                >
                                    <i className="fa fa-warning me-2" style="color: #f7c102"></i> Vui lòng cập nhật
                                    thông tin
                                </h6> */}
                                {!isUserValid && <Warning message={'Vui lòng cập nhật thông tin'} />}

                                <div>
                                    {/* <h6 v-if="countUpdateTime > 0" className="text-left my-2" style="color: #37e32a">
                                        <i className="fa-solid fa-check"></i> Cập nhật thành công x {countUpdateTime}
                                    </h6> */}
                                    {state.countUpdateTime > 0 && (
                                        <Success message={` Cập nhật thành công x ${state.countUpdateTime}`} />
                                    )}
                                    <div className="form-group mb-2">
                                        <label for="name">
                                            Họ và tên <strong className="text-danger">(*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="hoten"
                                            {...userFormRegister('name')}
                                        />
                                        <strong className="text-danger">{userFormError.errors.name?.message}</strong>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label for="email">Email</label>
                                        <p type="text" className="form-control m-0" name="email">
                                            {state.user.email}
                                        </p>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label for="phone">
                                            Số điện thoại <strong className="text-danger">(*)</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control m-0"
                                            name="phone"
                                            {...userFormRegister('phone')}
                                        />
                                        <strong className="text-danger">{userFormError.errors.phone?.message}</strong>
                                    </div>
                                    <div className="form-group mb-2">
                                        <VnAddress
                                            user_address={state.user.address}
                                            sendAddressData={(data) => handleSetAddres(data)}
                                            sendIsValid={(valid) => {
                                                setState((prev) => ({ ...prev, isChosenAddres: valid }));
                                            }}
                                        />
                                        {!state.isChosenAddres && <strong className="text-danger">Chọn địa chỉ</strong>}
                                    </div>

                                    <div className={cx('profile-update-btn')}>
                                        <button className="btn btn-success" type="submit">
                                            Cập nhật
                                        </button>
                                        {isShowImg && (
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    name="doimatkhau"
                                                    data-toggle="modal"
                                                    data-target="#modal-doimk"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setState((prev) => ({ ...prev, showModal: true }));
                                                    }}
                                                >
                                                    Đổi mật khẩu
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        dispatch(logout());
                                                        dispatch(setAmount(0));
                                                        navigate('/login');
                                                    }}
                                                    className="btn btn-danger"
                                                >
                                                    Đăng xuất
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Model1 show={state.showModal} isClosed={() => setState((prev) => ({ ...prev, showModal: false }))}>
                        <div className={cx('profile-change-password-model')}>
                            <form onSubmit={passwordFormSubmit(handleChangePassword)}>
                                {state.sWrongOldPass && (
                                    <div>
                                        <strong className="text-danger">Mật khẩu cũ không chính xác</strong>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label for="">
                                        Mật khẩu cũ <strong className="text-danger">(*)</strong>
                                    </label>
                                    <div className="input-group border rounded">
                                        <input
                                            type={state.sP1 ? 'text' : 'password'}
                                            className="form-control m-0 border-0"
                                            name="old_password"
                                            {...passwordFormRegister('old_password')}
                                        ></input>
                                        <FontAwesomeIcon
                                            onClick={() => setState((prev) => ({ ...prev, sP1: !prev.sP1 }))}
                                            className="border-0 bg-white px-2 my-auto"
                                            icon={faEye}
                                        />
                                    </div>
                                    <trong className="text-danger">
                                        {passwordFormError.errors.old_password?.message}
                                    </trong>
                                </div>
                                <div className="form-group">
                                    <label for="">
                                        Mật khẩu mới <strong className="text-danger">(*)</strong>
                                    </label>
                                    <div className="input-group border rounded">
                                        <input
                                            type={state.sP2 ? 'text' : 'password'}
                                            className="form-control m-0 border-0"
                                            name="password"
                                            {...passwordFormRegister('password')}
                                        ></input>
                                        <FontAwesomeIcon
                                            onClick={() => setState((prev) => ({ ...prev, sP2: !prev.sP2 }))}
                                            className="border-0 bg-white px-2 my-auto"
                                            icon={faEye}
                                        />
                                    </div>
                                    <trong className="text-danger">{passwordFormError.errors.password?.message}</trong>
                                </div>
                                <div className="form-group">
                                    <label for="">
                                        Lặp lại mật khẩu <strong className="text-danger">(*)</strong>
                                    </label>
                                    <div className="input-group border rounded">
                                        <input
                                            type={state.sP3 ? 'text' : 'password'}
                                            className="form-control m-0 border-0"
                                            name="password_repeat"
                                            {...passwordFormRegister('password_repeat')}
                                        ></input>
                                        <FontAwesomeIcon
                                            onClick={() => setState((prev) => ({ ...prev, sP3: !prev.sP3 }))}
                                            className="border-0 bg-white px-2 my-auto"
                                            icon={faEye}
                                        />
                                    </div>
                                    <trong className="text-danger">
                                        {passwordFormError.errors.password_repeat?.message}
                                    </trong>
                                </div>
                                <div>
                                    <button className="btn btn-success" type="submit">
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Model1>
                </>
            )}
        </>
    );
}

export default UpdateUserInforForm;
