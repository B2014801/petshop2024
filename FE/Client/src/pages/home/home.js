import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import style from './home.module.scss';
import img from '~/assets/imgs';
import { ProductList } from '~/components/list';
import { productService } from '~/services';

const cx = classNames.bind(style);
function Home() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        (async () => {
            let rs = await productService.getAllProduct();
            let reverse = rs.reverse();
            setProduct(
                reverse.filter((_, index) => {
                    return index < 8;
                }),
            );
        })();
    }, []);

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className={cx('prev-img')}>
                <div onClick={onClick}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
            </div>
        );
    };
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className={cx('next-img')}>
                <FontAwesomeIcon onClick={onClick} icon={faAngleRight} />
            </div>
        );
    };

    const settings = {
        autoplay: true,
        infinite: true,
        speed: 2500,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <section>
            <Slider {...settings} className={cx('slider-container')}>
                {img.home.map((img, index) => (
                    <img className="w-100" src={img} alt="" />
                ))}
            </Slider>
            <hr />

            <div class="mx-3">
                <div>
                    <h3 class="text-center">THÚ CƯNG MỚI NHẤT</h3>
                    {product.length !== 0 && <ProductList products={product} />}
                </div>
            </div>
        </section>
    );
}
export default Home;
