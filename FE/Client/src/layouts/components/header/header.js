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

const cx = classNames.bind(style);
function Header() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);

    const getAllCategory = async () => {
        try {
            let category = await categoryService.getAll();
            if (category.length !== 0) {
                setCategory(category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        dispatch(loadAuthState());
    }, [dispatch]);

    let user = useSelector((store) => store.auth.user);
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
                        <div className="header-search">
                            {/* 
                    <Search
                        @value="getProductWithName"
                        :products="products"
                        :LoadingSearch="LoadingSearch"
                        :isEmptyProduct="isEmptyProduct"
                        :isSearch="isSearch"
                    ></Search>
                    
                    <div>
                        <Microphone></Microphone>
                    </div> */}
                            <Search />
                        </div>
                    </div>

                    <div>
                        <Link to="/cart">
                            {/* <toprightamout> */}
                            <FontAwesomeIcon icon={faCartShopping} className="mx-3" />
                            {/* </toprightamout> */}
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
