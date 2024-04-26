import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import style from './header.module.scss';
import img from '~/assets/imgs';
import Category from './category';
import productService from '~/services/product.service';
import { loadAuthState } from '~/stores/auth.store';
import categoryService from '~/services/category.service';
import Search from '../search/search';
import Micro from '../search/micro';
import TopRightAmount from '~/components/topRightAmout/topRightAmout';
import { cartService } from '~/services';
import { setAmount } from '~/stores/cart.store';

const cx = classNames.bind(style);
function Header() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const user = useSelector((store) => store.auth.user);

    useEffect(() => {
        (async () => {
            try {
                let category = await categoryService.getAll();
                if (category.length !== 0) {
                    setCategory(category);
                }
                let _user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    await dispatch(loadAuthState());
                }
                if (_user) {
                    let carts = await cartService.getCarts(_user.user._id);
                    if (carts) {
                        dispatch(setAmount(carts.length));
                    }
                }
            } catch (error) {
                console.log(error, user);
            }
        })();
    }, [user]);
    //when login logout

    return (
        <div>
            <nav className="navbar navbar-expand-lg p-1">
                <div className="container-fluid position-relative p-0 mx-2">
                    <button className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link to="/" className="mr-2">
                        <img src={img.logo} className="" alt="" width="130" height="70" />
                    </Link>
                    <div className="collapse navbar-collapse justify-content-between mr-3">
                        <Category category={category} />
                        <div className={cx('header-search')}>
                            <Search />
                        </div>
                    </div>

                    <div>
                        <Link to="/cart">
                            <TopRightAmount>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </TopRightAmount>
                        </Link>
                        ,
                        {user === null ? (
                            <span>
                                <Link to="/login">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span> |</span>&nbsp;
                                </Link>
                                <Link to="/register">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </Link>
                            </span>
                        ) : (
                            <span>
                                <Link to="/user">
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </span>
                        )}
                    </div>
                </div>
            </nav>
            {/* // <CollapseContent :isCollapsed="isCollapsed" :Categorys="Categorys">
    //     <Search
    //         @value="getProductWithName"
    //         :products="products"
    //         :LoadingSearch="LoadingSearch"
    //         :isEmptyProduct="isEmptyProduct"
    //         :isSearch="isSearch"
    //     ></Search>
    // </CollapseContent> */}
        </div>
    );
}
export default Header;
