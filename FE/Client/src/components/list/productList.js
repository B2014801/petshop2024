import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import style from './list.module.scss';
import { removeDiacriticsAndReplaceSpaces, getProductAfterDisCount } from '~/components/functions';

const cx = classNames.bind(style);

function ProductList({ products, itemsPerPage = 8, CategoryName = null, customCol = null }) {
    const [screenWidth, setScreenWith] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
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
        const priceInt = products[index].price + ' ₫';
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

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const targetPage = (index) => {
        setCurrentPage(index + 1);
    };

    // computed: {
    const responseImg = () => {
        return screenWidth <= 768 ? '100px' : '250px';
    };

    const totalPages = useMemo(() => {
        return Math.ceil(products.length / itemsPerPage);
    }, [products]);
    // Slice the products array based on the current page and items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return (
        <>
            <div className="row card-group mx-3 mt-2">
                {paginatedProducts.map((product, index) => (
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
            {totalPages >= 2 && (
                <div className={cx('product-list-devide-page')}>
                    <button onClick={previousPage} disabled={currentPage === 1}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => targetPage(index)}
                            className={index + 1 === currentPage ? cx('active') : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            )}
        </>
    );
}

export default ProductList;
