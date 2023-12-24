import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { plusAmount } from '~/stores/cart.store';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import productService from '~/services/product.service';
import commentService from '~/services/comment.service';
import { getProductAfterDisCount } from '~/components/functions';
import { Success } from '~/components/notification';
import { ProductList, CommentList } from '~/components/list';
import CommentForm from '~/components/form/commentForm';

function ProductDetail() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { id } = useParams();
    const dispath = useDispatch();
    const [state, setState] = useState({
        product: {},
        products: [],
        comments: [],
        isShowProductDetail: false,
        isShowCollapse1: false,
        isShowCollapse2: false,
        AddCartNumberValidate: false,
        isShowAddToCartSuccess: false,
    });
    const AddCartNumberValidate = yup.object().shape({
        order_number: yup
            .number()
            .typeError('Phải là số')
            .min(1, 'Tối thiểu là 1')
            .test('max', 'Không đủ hàng', function (value) {
                const maxValue = state.product.number;
                //return false = > error 'khong du hang
                return value <= maxValue;
            }),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useForm({ resolver: yupResolver(AddCartNumberValidate) });

    useEffect(() => {
        (async () => {
            try {
                let result = await productService.findProductById(id);

                if (result) {
                    setState((prev) => ({ ...prev, product: result }));

                    let sameProduct = (await productService.getAllProductWithBrandId(result.brand)).slice(0, 4);
                    if (sameProduct) {
                        setState((prev) => ({ ...prev, products: sameProduct }));
                    }

                    let comment = await commentService.getAll(id);
                    if (comment) {
                        setState((prev) => ({ ...prev, comments: comment }));
                    }
                    setState((prev) => ({ ...prev, isShowProductDetail: true }));
                }
            } catch (error) {}
        })();
        setValue('order_number', 1);
    }, [id, setValue]);

    const handleCollapse1 = () => {
        setState((prev) => ({ ...prev, isShowCollapse1: !prev.isShowCollapse1 }));
        if (state.isShowCollapse2 === true) {
            setState((prev) => ({ ...prev, isShowCollapse2: false }));
        }
    };
    const handleCollapse2 = () => {
        setState((prev) => ({ ...prev, isShowCollapse2: !prev.isShowCollapse2 }));
        if (state.isShowCollapse1 === true) {
            setState((prev) => ({ ...prev, isShowCollapse1: false }));
            console.log(state.isShowCollapse1);
        }
    };
    const plusAddCartNumber = (e) => {
        e.preventDefault();
        const previousValue = parseInt(getValues('order_number'));
        if (previousValue < parseInt(state.product.number)) {
            const newValue = previousValue + 1;
            setValue('order_number', newValue);
        }
    };
    const minusAddCartNumber = (e) => {
        e.preventDefault();
        const previousValue = parseInt(getValues('order_number'));
        if (previousValue > 1) {
            const newValue = previousValue - 1;
            setValue('order_number', newValue);
        }
    };

    const handleAddToCart = async (number) => {
        const data = {
            UserId: user.user._id,
            ProductId: id,
            Amount: number.order_number,
        };
        try {
            const result = await productService.addToCart(id, data);
            if (result) {
                setState((prev) => ({ ...prev, isShowAddToCartSuccess: true }));
                if (result.updatedExisting === false) {
                    dispath(plusAmount());
                }
            }
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    };
    const getProductPrice = () => {
        const price = state.product.price + ' ₫';
        return price;
    };

    const isDiscout = () => {
        return parseInt(state.product.discount) > 0;
    };
    const isEnoughProductNumber = () => {
        return state.product.number < 1;
    };
    const handleAddComment = async (data) => {
        if (!user) {
            navigate('/login');
        } else {
            try {
                data.user_id = user.user._id;
                data.product_id = state.product._id;
                const result = await commentService.create(data);
                if (result) {
                    // this.getComments(this.product._id);
                }
            } catch (error) {
                navigate('/login');
            }
        }
    };
    const handleResetComment = async (data) => {
        setState((prev) => ({
            ...prev,
            comments: [
                ...prev.comments,
                {
                    user_data: { img: data.user_img, name: data.user_name },
                    ...data,
                    start: parseInt(data.start),
                },
            ],
        }));
    };

    return (
        <section className="mx-5">
            {state.isShowProductDetail && (
                <>
                    <section>
                        {state.isShowAddToCartSuccess && (
                            <Success message={`${state.product.name}  đã được thêm vào giỏ hàng`} />
                        )}
                        <div className="row my-2">
                            <div className="col-md-5 col-12">
                                <div className="card text-center border-0">
                                    <div className="mt-2">
                                        <img
                                            className="img-fluid"
                                            src={state.product.img}
                                            alt="book1"
                                            style={{ width: '500px', height: '300px' }}
                                        />
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                            <div className="col-md-7 col-12 pl-0">
                                <div className="row">
                                    <h2 className="text-uppercase">{state.product.name}</h2>
                                </div>
                                <div className="row">
                                    {isDiscout() ? (
                                        <h4 className="text-uppercase">
                                            <del style={{ opacity: '0.5', marginRight: '6px' }}>
                                                {getProductPrice()}{' '}
                                            </del>
                                            <bdi className="text-danger">{getProductAfterDisCount(state.product)}</bdi>
                                        </h4>
                                    ) : (
                                        <h4>{getProductPrice()}</h4>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit(handleAddToCart)}>
                                    <div className="mt-4">
                                        <div className="d-flex">
                                            <label className="d-inline" for="">
                                                Số lượng:
                                            </label>
                                            <div className="Cart-UpdateOrder-Number">
                                                <button onClick={minusAddCartNumber}>-</button>
                                                <input
                                                    id="number"
                                                    type="number"
                                                    name="order_number"
                                                    {...register('order_number')}
                                                />
                                                <button onClick={plusAddCartNumber}>+</button>

                                                <strong className="text-danger ms-2">
                                                    {errors.order_number?.message}
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label for="" className="mb-0">
                                                Kho:&nbsp;
                                                {parseInt(state.product.number) > 0 ? (
                                                    <span> {state.product.number}</span>
                                                ) : (
                                                    <span class="text-danger font-weight-bold">
                                                        Sản phẩm hiện đang hết hàng
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                        <div className="mt-3">
                                            <p>
                                                <b>Lưu ý</b>: Giá sản phẩm có thể thay đổi theo từng thời điểm.
                                                <span className="text-primary font-weight-bold">Kết Bạn Zalo</span> hoặc
                                                <span className="text-danger font-weight-bold">Gọi Hotline</span> để xem
                                                thêm hình ảnh/video chi tiết.
                                            </p>
                                        </div>
                                        <div className="d-flex mt-3">
                                            <button
                                                disabled={isEnoughProductNumber()}
                                                className="btn btn-lg btn-primary text-white ml-0"
                                                type="submit"
                                                name="themvaogio"
                                            >
                                                Thêm vào giỏ
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button
                                        className="accordion-button collapsed fs-5"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                        onClick={handleCollapse1}
                                    >
                                        Mô tả
                                    </button>
                                </h2>
                                {state.isShowCollapse1 && (
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse"
                                        aria-labelledby="flush-headingOne"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body">
                                            <p>
                                                <b>{state.product.name} </b> {state.product.describe}
                                            </p>
                                            <p className="text-center">
                                                <b>Quyền lợi có được khi mua {state.product.name} tại Pet Shop.</b>
                                            </p>
                                            <ol>
                                                <li>Bảo hành thuần chủng trọn đời.</li>
                                                <li>
                                                    Bảo hành bệnh truyền nhiễm nguy hiểm ở chó là Care và Parvo 7 ngày
                                                    đầu về nhà mới. Ngoài ra, quý khách có thể mua thêm gói bảo hiểm sức
                                                    khỏe 1 năm nếu có nhu cầu. (Thú cưng là động vật sống, nhạy cảm với
                                                    môi trường sống, thức ăn… bởi vậy hãy chăm sóc theo hướng dẫn của
                                                    PetHouse hướng dẫn nhé)
                                                </li>
                                                <li>Miễn phí vận chuyển toàn quốc</li>
                                                <li>Giảm giá 10% cho các lần mua thú cưng tiếp theo.</li>
                                            </ol>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button
                                        className="accordion-button collapsed fs-5"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                        onClick={handleCollapse2}
                                    >
                                        Đánh giá
                                    </button>
                                </h2>
                                {state.isShowCollapse2 && (
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse"
                                        aria-labelledby="flush-headingTwo"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="accordion-body mt-3">
                                            <h5 className="text-center">Nhận xét về {state.product.name}</h5>

                                            {state.comments.length !== 0 && <CommentList comments={state.comments} />}
                                            <CommentForm
                                                sendComment={handleAddComment}
                                                sendNewComment={handleResetComment}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <hr />
                        <h4>SẢN PHẨM TƯƠNG TỰ</h4>
                        <ProductList products={state.products} />
                    </section>
                </>
            )}
        </section>
    );
}

export default ProductDetail;
