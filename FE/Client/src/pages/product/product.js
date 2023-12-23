import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import ProductList from '~/components/list/productList';
import productService from '~/services/product.service';
import style from './product.module.scss';

const cx = classNames.bind(style);
function Product() {
    const [products, setProducts] = useState([]);
    const [sortType, setSortType] = useState('new');
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const result = await productService.getAllProductWithBrandId(id);
                setProducts(result);
            } catch (error) {
                console.log(error);
            }
        })();
        document.title = 'Product';
    }, [id]);

    const sortProduct = () => {
        if (sortType === 'new') {
            return products.sort((a, b) => {
                const dateA = new Date(a.createDate);

                const dateB = new Date(b.createDate);

                if (dateA < dateB) return 1;
                if (dateA > dateB) return -1;
                return 0;
            });
        } else {
            // eslint-disable-next-line array-callback-return
            return products.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/\./g, ''));
                const priceB = parseFloat(b.price.replace(/\./g, ''));
                const AfterDiscountA = priceA - (priceA * a.discount) / 100;
                const AfterDiscountB = priceB - (priceB * b.discount) / 100;
                if (sortType === 'price_asc') {
                    return AfterDiscountA - AfterDiscountB;
                }
                if (sortType === 'price_des') {
                    return AfterDiscountB - AfterDiscountA;
                }
            });
        }
    };

    return (
        <>
            <div className={cx('product-sort')}>
                <select name="" id="" value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    <option value="new">Mới nhất</option>
                    <option value="price_des">Giá Cao Đến Thấp</option>
                    <option value="price_asc">Giá Thấp Đến Cao</option>
                </select>
            </div>
            {products.length !== 0 && <ProductList products={sortProduct()} />}
        </>
    );
}

export default Product;
