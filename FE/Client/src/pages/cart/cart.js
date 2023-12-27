import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import style from './cart.module.scss';
import cartService from '~/services/cart.service';
import { getTemporaryPriceOfOneProduct, getTemporaryPrice } from '~/components/functions';
import { Success } from '~/components/notification';

const cx = classNames.bind(style);
function Cart() {
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const [state, setState] = useState({
        cart: [],
        recentDeleteProduct: {},
        isShowCart: false,
        isShowUpdateCartSuccess: false,
        isShowDeleteProductOutOfCartSuccess: false,
        isShowUpdateCartFailure: false,
        isShowEmptyCart: false,
        isShowLoading: true,
        isDisableBtnGotoCheckout: false,
        isShowLoadingUpdateCart: false,
        isInputChanged: false,
    });

    useEffect(() => {
        (async () => {
            if (user) {
                try {
                    const result = await cartService.getCarts(user.user._id);
                    if (result.length !== 0) {
                        setState((prev) => ({ ...prev, cart: result, isShowCart: true }));
                        let flag = true;
                        result.forEach((item, index) => {
                            if (parseInt(item.ProductData.number) <= 0) {
                                flag = false;
                            }
                        });
                        setState((prev) => ({ ...prev, isDisableBtnGotoCheckout: !flag }));
                    } else {
                        setState((prev) => ({ ...prev, isShowEmptyCart: true, isShowCart: false }));
                    }
                    setState((prev) => ({ ...prev, isShowLoading: false }));
                } catch (error) {
                    navigate('/login');
                }
            }
        })();
    }, [navigate, user]);

    const updateCart = async () => {
        let flag = true;
        state.cart.forEach((item, index) => {
            if (parseInt(item.ProductData.number) < parseInt(item.Amount) || parseInt(item.Amount) <= 0) {
                flag = false;
                setState((prev) => ({
                    ...prev,
                    isShowUpdateCartFailure: true,
                    isShowUpdateCartSuccess: true,
                    isShowDeleteProductOutOfCartSuccess: true,
                }));
            }
        });
        if (flag === true) {
            setState((prev) => ({ ...prev, isShowLoadingUpdateCart: true }));
            const result = await cartService.updateCart(user.user._id, state.cart);
            if (result === true) {
                setState((prev) => ({
                    ...prev,
                    isShowUpdateCartFailure: false,
                    isShowUpdateCartSuccess: true,
                    isShowDeleteProductOutOfCartSuccess: false,
                    isShowLoadingUpdateCart: false,
                }));
            }
        }
    };
    const handleDeleteProductOutOfCart = async (index) => {
        setState((prev) => ({ ...prev, recentDeleteProduct: prev.cart[index].ProductData }));
        const result = await cartService.delete(user.user._id, state.cart[index].ProductId);
        if (result) {
            setState((prev) => ({
                ...prev,
                isShowDeleteProductOutOfCartSuccess: true,
                isShowUpdateCartSuccess: false,
                cart: prev.cart.filter((_, index1) => index1 !== index),
            }));
        }
    };

    //usememo

    const totalPrice = useMemo(() => {
        return getTemporaryPrice(state.cart);
    }, [state.cart]);

    const handleChangeAmount = (index, value) => {
        if (value > 0 && value <= parseInt(state.cart[index].ProductData.number)) {
            setState((prev) => {
                let newState = { ...prev, isInputChanged: true };
                newState.cart[index].Amount = value;
                return newState;
            });
        }
    };

    return (
        <div className="row mx-md-5 mx-1 my-2">
            <div className="my-2">
                <h2 className="text-center">Giỏ Hàng</h2>
                <div className="text-center"></div>
            </div>
            {state.isShowUpdateCartSuccess && <Success message={'Giỏ hàng đã được cập nhật'} />}
            {state.isShowDeleteProductOutOfCartSuccess && (
                <Success message={`${state.recentDeleteProduct.name} đã xóa khỏi giỏ hàng`} />
            )}

            {state.isShowCart && state.cart.length !== 0 && (
                <>
                    <div className="col-12 col-md-8 table-responsive-sm">
                        <table className={cx('cart-product-table')}>
                            <tr>
                                <th className="col" colspan="3">
                                    Sản phẩm
                                </th>
                                <th className="col">giá</th>
                                <th className="col">số lượng</th>
                                <th className="col">tạm tính</th>
                            </tr>
                            <tbody>
                                {state.cart.map((product, index) => (
                                    <tr>
                                        <td>
                                            <FontAwesomeIcon
                                                onClick={() => handleDeleteProductOutOfCart(index)}
                                                className={cx('delete-purchase-icon')}
                                                icon={faXmark}
                                            />
                                        </td>
                                        <td>
                                            <img
                                                className="m-2"
                                                width="130"
                                                height="100"
                                                src={product.ProductData.img}
                                                alt=""
                                            />
                                        </td>
                                        <td style={{ width: '400px' }}>
                                            {product.ProductData.name} kho {product.ProductData.number}
                                        </td>
                                        <td>
                                            <span>{product.ProductData.price} ₫</span>
                                        </td>
                                        <td>
                                            {/* <form> */}
                                            <div className="Cart-UpdateOrder-Number">
                                                <button
                                                    id="minus-sp"
                                                    onClick={() => handleChangeAmount(index, product.Amount - 1)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    id="number"
                                                    type="number"
                                                    name="order_number"
                                                    value={product.Amount}
                                                    onChange={(e) => handleChangeAmount(index, e.target.value)}
                                                />
                                                <button
                                                    id="plus-sp"
                                                    onClick={() => handleChangeAmount(index, product.Amount + 1)}
                                                >
                                                    +
                                                </button>
                                                {/* <ErrorMessage name="order_number" className="text-danger ms-2" /> */}
                                            </div>
                                            {/* </form> */}
                                        </td>
                                        <td>
                                            <span>
                                                {getTemporaryPriceOfOneProduct(
                                                    product.ProductData.price,
                                                    product.Amount,
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colspan="6">
                                        <div className={cx('form-update-amount')}>
                                            <button
                                                onClick={updateCart}
                                                disabled={!state.isInputChanged || state.isShowLoadingUpdateCart}
                                                id="submit-btn"
                                                type="submit"
                                                className="btn btn-primary my-1"
                                            >
                                                cập nhật giỏ hàng
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className={cx('cart-product-table')}>
                            <tr>
                                <th colspan="2" className="width-100 text-center">
                                    CỘNG GIỎ HÀNG
                                </th>
                            </tr>
                        </table>
                        <table className={cx('cart-product-table')}>
                            <tbody>
                                <tr>
                                    <td>Tạm tính</td>
                                    <td className="text-end">
                                        <span>{totalPrice}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tổng</td>
                                    <td className="text-end">
                                        <span name="tongtien">{totalPrice}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div></div>

                        <button
                            onClick={() => navigate('/checkout')}
                            disabled={state.isShowLoadingUpdateCart || state.isDisableBtnGotoCheckout}
                            className="btn btn-danger w-100 mt-2"
                        >
                            Thanh toán
                        </button>
                    </div>
                </>
            )}
            {state.isShowEmptyCart && (
                <div>
                    <h6 className="text-center mt-3">Thêm hàng vào giỏ ngay!!</h6>
                </div>
            )}
        </div>
    );
}

export default Cart;
