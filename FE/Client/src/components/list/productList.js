import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import style from './list.module.scss';
import { removeDiacriticsAndReplaceSpaces, getProductAfterDisCount } from '~/components/functions';
import DividePage from './dividePage';

const cx = classNames.bind(style);

function ProductList({ products, CategoryName = null, customCol = null }) {
    const [screenWidth, setScreenWith] = useState(window.innerWidth);
    const [_products, setProduct] = useState(products);
    useEffect(() => {
        const updateScreenWidth = () => {
            setScreenWith(window.innerWidth);
        };

        window.addEventListener('resize', updateScreenWidth);

        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    const getProductPrice = (index) => {
        const priceInt = _products[index].price + ' ₫';
        return priceInt;
    };

    const isDiscout = (product) => {
        return parseInt(product.discount) > 0;
    };

    const getRouter = (product) => {
        let router = {};
        if (CategoryName)
            router = `/shop/${CategoryName}/${removeDiacriticsAndReplaceSpaces(product.name)}/${product._id}`;
        else {
            router = `/product/${removeDiacriticsAndReplaceSpaces(product.name)}/${product._id}`;
        }
        return router;
    };

    // computed: {
    const responseImg = () => {
        return screenWidth <= 768 ? '100px' : '250px';
    };

    return (
        <>
            <div className="row card-group mx-3 mt-2">
                {_products.map((product, index) => (
                    <div key={index} className={customCol ? customCol : 'col-sm-4 col-md-3 col-lg-3'}>
                        <div className={cx('product-item')}>
                            <Link to={getRouter(product)} className="text-dark text-decoration-none">
                                <div className="card position-relative border-0">
                                    {isDiscout(product) && (
                                        <div className={cx('selloff')}>
                                            <h6 className="text-center m-1">-{product.discount}%</h6>
                                        </div>
                                    )}

                                    <img
                                        style={{ height: responseImg() }}
                                        src={product.img}
                                        className="card-img-top"
                                        alt="#"
                                    />
                                    <div className="card-body text-center p-1">
                                        {/* for product */}
                                        {!CategoryName && (
                                            <div>
                                                <p className="mb-1">{product.name}</p>
                                                {isDiscout(product) ? (
                                                    <span className={cx('card-title')}>
                                                        <del className={cx('discountDel')}>
                                                            {getProductPrice(index)}
                                                        </del>
                                                        <bdi className="text-danger fw-bold">
                                                            {getProductAfterDisCount(product)}
                                                        </bdi>
                                                    </span>
                                                ) : (
                                                    <span className={cx('card-title')}>
                                                        <b>{getProductPrice(index)}</b>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {/* for brand */}
                                        {CategoryName && (
                                            <div>
                                                <h5 className={cx('brand-title', 'my-auto')}>{product.name}</h5>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <DividePage
                products={products}
                sendPage={(product) => {
                    setProduct(product);
                }}
            />
        </>
    );
}

export default ProductList;
