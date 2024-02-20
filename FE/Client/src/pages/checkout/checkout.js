import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import style from './checkout.module.scss';
import { invoiceService, cartService, voucherService } from '~/services';
import { getTemporaryPriceOfOneProduct, getTemporaryPrice } from '~/components/functions';
import { Modal1 } from '~/components/modals';
import { Success } from '~/components/notification';
import { UpdateUserInforForm } from '~/components/form';

const cx = classNames.bind(style);
function CheckOut() {
    const navigate = useNavigate();
    const user = useSelector((store) => store.auth.user);
    const [state, setState] = useState({
        CheckOutData: [],
        vouchers: [],
        selectedVoucher: [],
        selectedVoucher2: [],
        isShowCheckOut: null,
        isChoosePaymentMethod: false,
        paymentMethod: '',
        isShowEmptyCheckOut: false,
        isShowLoading: null,
        countUpdateTime: 0,
        showVoucherModal: false,
        isUserValid: null,
    });

    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    const checkoutData = await cartService.getCarts(user.user._id);
                    const voucherData = await voucherService.getAll();
                    if (checkoutData.length !== 0) {
                        setState((prev) => ({
                            ...prev,
                            isShowCheckOut: true,
                            CheckOutData: checkoutData,
                            vouchers: voucherData,
                        }));
                    } else {
                        setState((prev) => ({ ...prev, isShowCheckOut: false, CheckOutData: [] }));
                    }
                } catch (error) {
                    navigate('/login');
                }
            })();
        }
    }, [navigate, user]);

    const handleChange = (e) => {
        setState((prev) => ({
            ...prev,
            paymentMethod: e.target.value,
        }));
    };
    const checkEnoughProductNumber = () => {
        let flag = true;
        state.CheckOutData.forEach((item, index) => {
            if (parseInt(item.ProductData.number) <= 0) {
                flag = false;
            }
        });
        return flag;
    };
    const getDetail = () => {
        let Detail = [];
        state.CheckOutData.map((item, index) =>
            Detail.push({
                _id: item.ProductData._id,
                name: item.ProductData.name,
                price: item.ProductData.price,
                amount: item.Amount,
            }),
        );
        return Detail;
    };

    const handleCheckOut = async () => {
        try {
            if (checkEnoughProductNumber() === true) {
                if (state.isUserValid) {
                    if (state.paymentMethod && state.paymentMethod !== 'nochoose') {
                        setState((prev) => ({ ...prev, isShowLoading: true }));
                        const Detail = getDetail();
                        const voucher = [];
                        state.selectedVoucher2.map((index) => voucher.push(state.vouchers[index]));

                        let data = {
                            UserId: user.user._id,
                            PaymentMethod: state.paymentMethod,
                            Detail: Detail,
                            Vouchers: voucher,
                            Total: totalPrice,
                        };
                        const result = await invoiceService.create(data);
                        if (result) {
                            setState((prev) => ({ ...prev, isShowLoading: false }));
                            navigate('/');
                        }
                    } else {
                        setState((prev) => ({ ...prev, paymentMethod: 'nochoose' }));
                    }
                } else {
                    alert('vui lòng cập nhật thông tin');
                }
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setState((prev) => ({ ...prev, showVoucherModal: false, selectedVoucher2: prev.selectedVoucher }));
    };
    const handleChoseVoucher = (index) => {
        setState((prev) => {
            const isChecked = prev.selectedVoucher.includes(index);
            let voucher = [];
            if (isChecked) {
                voucher = prev.selectedVoucher.filter((item) => item !== index);
            } else {
                voucher = [...prev.selectedVoucher, index];
            }
            return { ...prev, selectedVoucher: voucher };
        });
    };

    const handleChangePaymentMethodsChecKBox = (e) => {
        setState((prev) => {
            let pm = prev.paymentMethod;
            if (e.target.checked === false) {
                pm = 'nochoose';
            }
            return {
                ...prev,
                isChoosePaymentMethod: !prev.isChoosePaymentMethod,
                paymentMethod: pm,
            };
        });
    };

    const productPrice = useMemo(() => {
        return getTemporaryPrice(state.CheckOutData);
    }, [state.CheckOutData]);

    const totalPrice = useMemo(() => {
        const voucher = [];
        state.selectedVoucher2.map((index) => voucher.push(state.vouchers[index]));
        const tp = getTemporaryPrice(state.CheckOutData, voucher);
        return tp && tp.slice(0, -2); //remove ' đ'
    }, [state.CheckOutData, state.selectedVoucher2, state.vouchers]);

    const isExpiredDate = useMemo(
        () => (date) => {
            // const formattedDateStr = dateStr.replace(/\//g, '-');
            const currentDate = new Date();
            const inputDate = new Date(date);
            // Check if the input date is a valid date
            if (isNaN(inputDate.getTime())) {
                throw new Error('Invalid date format');
            }

            return inputDate < currentDate;
        },
        [],
    );

    return (
        <>
            <div v-if="isShowCheckOut" className="container row mx-auto mt-2">
                <div className="col-md-6 col-12 mb-2">
                    <h3 className="col-12 pl-0">Thông tin thanh toán</h3>

                    <UpdateUserInforForm sendIsValid={(vl) => setState((prev) => ({ ...prev, isUserValid: vl }))} />
                </div>

                <div className="col-md-6 col-12 mb-2 col" style={{ border: '2px solid blue' }}>
                    {/* <Form @submit="handleCheckOut" :validation-schema="PaymentMethodValidate"> */}
                    <div style={{ padding: '20px' }}>
                        {state.isShowLoading === false && <Success message={'Đặt hàng thành công'} />}
                        {/* <intersecting-circles-spinner
                    v-if="isShowLoading"
                    className="mx-auto"
                    :animation-duration="1200"
                    :size="50"
                    color="#ff1d5e"
                /> */}
                        <h3 className="text-upercase">Đơn hàng của bạn</h3>
                        <table className={cx('CheckOut-Product-table')}>
                            <tr>
                                <th>Sản phẩm</th>
                                <th className="text-end">Tạm tính</th>
                            </tr>

                            {state.CheckOutData.map((Product, index) => (
                                <tr key={index}>
                                    <td>
                                        {Product.ProductData.name} <b> x{Product.Amount} </b>
                                    </td>
                                    <td className="text-end">
                                        <b>
                                            {getTemporaryPriceOfOneProduct(Product.ProductData.price, Product.Amount)}
                                        </b>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <b>Voucher</b>
                                </td>
                                <td className="text-end">
                                    <button
                                        onClick={() => setState((prev) => ({ ...prev, showVoucherModal: true }))}
                                        className="btn btn-secondary rounded p-1"
                                    >
                                        Chọn
                                    </button>
                                </td>
                            </tr>
                        </table>
                        <hr className="my-2" />
                        <div className={cx('checkout-detail')}>
                            <div>
                                <b>Chi tiết thanh toán </b>
                            </div>
                            <div>
                                <span>Tổng tiền hàng </span>
                                <span>{productPrice} </span>
                            </div>
                            <div>
                                <span>Tổng tiền phí vận chuyển </span>
                                <span>15.000 ₫</span>
                            </div>
                            {state.selectedVoucher2.map((index) => (
                                <div v-for="index in selectedvoucher2">
                                    <span>{state.vouchers[index].name}</span>
                                    <span>{state.vouchers[index].discount}%</span>
                                </div>
                            ))}
                            <div>
                                <span>
                                    <b>Tổng thanh toán</b>
                                </span>
                                <span className="text-danger fw-bold">{totalPrice}</span>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="form-inline">
                            <div className="accordion form-group col-12">
                                <div>
                                    {state.paymentMethod === 'nochoose' && (
                                        <div className="my-1">
                                            <strong name="PaymentMethod" className="text-danger">
                                                Vui lòng chọn hình thức thanh toán
                                            </strong>
                                        </div>
                                    )}
                                    <div className="form-group" id="headingOne">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="checkboxOne"
                                            name="paymentMethods"
                                            onChange={handleChangePaymentMethodsChecKBox}
                                        />
                                        <label className="ms-2" for="checkboxOne">
                                            <b>Hình thức thanh toán</b>
                                        </label>
                                    </div>
                                    <hr className="my-2" />
                                    {state.isChoosePaymentMethod && (
                                        <div>
                                            <div>
                                                <div className="form-group" id="headingTwo">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="inPersion"
                                                        name="PaymentMethod"
                                                        id="checkboxTwo"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label ms-2" for="checkboxTwo">
                                                        Thanh toán khi nhận hàng
                                                    </label>
                                                </div>
                                            </div>
                                            <hr className="my-2" />
                                            <div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="online"
                                                        name="PaymentMethod"
                                                        id="checkboxThree"
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label ms-2" for="checkboxThree">
                                                        Thanh toán online
                                                    </label>
                                                </div>
                                                {state.paymentMethod === 'online' && (
                                                    <div className="p-3 bg-light">
                                                        <p>
                                                            Thông tin tài khoản thụ hưởng của Pet shop. Sau khi chuyển
                                                            khoản, xin vui lòng thông báo cho chúng tôi qua số điên
                                                            thoại 0925 086 811 để được phục vụ nhanh nhất.
                                                        </p>
                                                        <p>
                                                            Ngân hàng: <b>Agribank</b>
                                                        </p>
                                                        <p>
                                                            Số tài khoản: <b>076582640</b>
                                                        </p>
                                                        <p>
                                                            Tên tài khoản: <b>NGUYỄN QUỐC TRUNG</b>
                                                        </p>
                                                        <div className="text-center">
                                                            <img src="img/thanhtoan/qr.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={handleCheckOut}
                                disabled={state.isShowLoading}
                                className="btn btn-danger mt-2"
                                type="submit"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="isShowEmptyCheckOut">
                    <h6 className="text-center mt-3">Chưa có sản phẩm thanh toán!!</h6>
                </div>
            </div>
            <Modal1 show={state.showVoucherModal} isClosed={() => closeModal()}>
                <div className={cx('voucher-container')}>
                    <div className={cx('voucher-title')}>
                        <h5 className="text-start m-0">Chọn voucher</h5>
                        <FontAwesomeIcon onClick={() => closeModal()} icon={faTimes} />
                    </div>
                    {state.vouchers.map((voucher, index) => (
                        <div key={index} className={cx('voucher-item')}>
                            <div>
                                <label for={'vourcher' + index}>
                                    <h6>
                                        {voucher.name} : <b>{voucher.discount} %</b>
                                    </h6>
                                </label>
                                <p v-html="getExpiredDate(voucher.expired_date)"></p>
                            </div>
                            <div>
                                <input
                                    disabled={isExpiredDate(voucher.expired_date)}
                                    type="checkbox"
                                    checked={state.selectedVoucher.includes(index)}
                                    id={'vourcher' + index}
                                    onChange={() => handleChoseVoucher(index)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="text-center">
                        <button onClick={() => closeModal()} className="btn btn-danger">
                            Đồng ý
                        </button>
                    </div>
                </div>
            </Modal1>
        </>
    );
}

export default CheckOut;
