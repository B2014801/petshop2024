import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { invoiceService } from '~/services';
import { formatNumberWithDot } from '~/components/functions';

function Purchase() {
    const { stateId } = useParams();
    const [state, setState] = useState({ invoices: null, countCanCelOrderSuccess: 0, isShowEmptyPurchase: false });
    const user = useSelector((store) => store.auth.user);
    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    let invoice = await invoiceService.getAllInvoice(stateId, user.user._id);
                    console.log(invoice, user.user._id);
                    setState((prev) => ({ ...prev, invoices: invoice }));
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [state.countCanCelOrderSuccess, stateId, user]);
    useEffect(() => {
        setState((prev) => ({ ...prev, countCanCelOrderSuccess: 0 }));
    }, [stateId]);
    const handleCancelOrder = async (id) => {
        try {
            let data = {
                id: id,
                status: null,
            };
            const result = await invoiceService.cancelOrder(data);
            if (result) {
                setState((prev) => ({ ...prev, countCanCelOrderSuccess: prev.countCanCelOrderSuccess + 1 }));
            }
        } catch (error) {}
    };
    const isShowBtnCancelOrder = (status) => {
        return parseInt(status) === 0 || parseInt(status) === 1;
    };
    const getIconAndStatus = (status, date) => {
        const _status = parseInt(status);
        console.log(status, date);
        switch (_status) {
            case 0:
            case 1:
                return (
                    <p class="mb-0 text-success">
                        <FontAwesomeIcon icon={faCheck} /> Đơn hàng đang được xác nhận
                    </p>
                );
            case 2:
                return (
                    <p class="mb-0 text-success">
                        <FontAwesomeIcon icon={faTruck} /> Đang giao hàng (dự kiến: {date})
                    </p>
                );
            case 3:
                return (
                    <p class="mb-0 text-success">
                        <FontAwesomeIcon icon={faTruck} /> Đơn hàng đã được giao thành công
                    </p>
                );
            case 4:
                return (
                    <p class="mb-0 text-success">
                        <FontAwesomeIcon icon={faTimes} /> Đơn hàng đã hủy
                    </p>
                );
            default:
                console.warn('not configured');
                break;
        }
    };
    const productTotal = (product) => {
        if (product) {
            const priceInt = product.oldprice.replace(/\./g, ''); //1.000.000 to 1000000

            const priceFinal = formatNumberWithDot(priceInt * product.ordernumber);
            return priceFinal;
        } else {
            return '';
        }
    };
    return (
        <div className="container">
            {state.invoices && (
                <>
                    <hr />
                    {state.countCanCelOrderSuccess > 0 && (
                        <h6 className="text-success text-center">
                            <FontAwesomeIcon icon={faCheck} />
                            &nbsp; Đơn hàng đã được huỷ thành công x{state.countCanCelOrderSuccess}
                        </h6>
                    )}
                    {state.invoices.length !== 0 ? (
                        state.invoices.map((invoice, index1) => (
                            <table className="table table-bordered table-responsive-sm shadow w-75 mx-auto">
                                <tbody>
                                    <tr>
                                        <td colspan="2">{getIconAndStatus(invoice.status, invoice.deliverydate)}</td>
                                    </tr>

                                    {invoice.detail?.map((product, index2) => (
                                        <tr v-for="(product, index2) in invoice.detail">
                                            <td className="col-2">
                                                <img
                                                    className="ml-2"
                                                    width="130"
                                                    height="100"
                                                    src={product.img}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <span>
                                                    {product.name}
                                                    <b> x {product.ordernumber}</b>
                                                </span>
                                                <p className="text-danger">{product.price}</p>
                                                <p className="mb-0">
                                                    Thành tiền: <b className="text-danger"> {productTotal(product)}</b>
                                                </p>
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colspan="2" className="text-end">
                                            <div>
                                                {invoice.vouchers
                                                    ? invoice.vouchers.map((item) => (
                                                          <div v-for="item in invoice.vouchers">
                                                              <span className="me-2">{item.name}</span>
                                                              <span>{item.discount}%</span>
                                                          </div>
                                                      ))
                                                    : ''}
                                                <div>
                                                    <span className="me-2">Phí vận chuyển</span>
                                                    <span>15.000 ₫</span>
                                                </div>
                                            </div>
                                            <hr />
                                            Tổng đơn:&nbsp;
                                            <span className="text-danger font-weight-bold me-2">
                                                <b>{invoice.total}</b>
                                            </span>
                                            {isShowBtnCancelOrder(invoice.status) && (
                                                <button
                                                    onClick={() => handleCancelOrder(invoice._id)}
                                                    className="btn btn-danger float-right"
                                                >
                                                    Huỷ
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    ) : (
                        <p className="text-center m-0" v-if="isShowEmptyPurchase">
                            Chưa có đơn hàng
                        </p>
                    )}
                </>
            )}
        </div>
    );
}

export default Purchase;
