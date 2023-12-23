import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './search.module.scss';
import { useDebounce } from '~/components/hooks';
import productService from '~/services/product.service';
import { removeDiacriticsAndReplaceSpaces } from '~/components/functions';

const cx = classNames.bind(style);

function Search() {
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedValue.trim() === '') {
            setSearchResult([]);
            return;
        }
        let getProduct = async () => {
            try {
                setLoading(true);

                let result = await productService.findByName(debouncedValue);
                console.log(result);
                setSearchResult(result);
                setLoading(false);
            } catch (error) {}
        };
        getProduct();
    }, [debouncedValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ') && !searchValue.startsWith('&')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('search')}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length !== 0}
                render={() => (
                    <div className={cx('search-result-container-wrapper')}>
                        <div className={cx('search-result-container')}>
                            {searchResult.map((product) => (
                                <div className={cx('search-result-item')}>
                                    <Link
                                        className="text-dark"
                                        to={
                                            `/product/` +
                                            removeDiacriticsAndReplaceSpaces(product.name) +
                                            '/' +
                                            product._id
                                        }
                                    >
                                        <img src={product.img} alt="" />
                                        <div>{product.name}</div>
                                        <span>{product.price} ₫</span>
                                    </Link>
                                </div>
                            ))}
                            {/* {searchResult.length === 0 && loading === false && (
                                <div className="text-center">Không có sản phẩm nào</div>
                            )} */}
                        </div>
                    </div>
                )}
                onClickOutside={() => {
                    setShowResult(false);
                }}
            >
                <form>
                    <div className="input-group-form">
                        <input
                            className="search-header border-0"
                            type="search"
                            placeholder="Tìm kiếm..."
                            name="search_query"
                            value={searchValue}
                            autocomplete="off"
                            onFocus={() => setShowResult(true)}
                            onChange={handleChange}
                        />
                        {!loading && (
                            <button type="submit" className="border-0 bg-white">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        )}
                        {loading && (
                            <button
                                className="border-0 bg-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                            </button>
                        )}
                        {/* <HalfCircleSpinner v-else className="mx-auto" :animation-duration="1200" :size="20" color="#4f0b14" /> */}
                    </div>
                </form>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
