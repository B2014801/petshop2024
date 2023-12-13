import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import style from './header.module.scss';
import img from '~/assets/imgs';
import Category from './category';
import productService from '~/services/product.service';

const cx = classNames.bind(style);
function Header() {
    // const getProduct = async () => {
    //     let result = await productService.getAllProduct();
    //     console.log(result);
    // };
    // getProduct();
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
                        <Category />
                        {/* 
                <div className="header-search">
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
                        {/* </div> */}
                    </div>

                    <div>
                        <Link to="/cart">
                            {/* <toprightamout> */}
                            <FontAwesomeIcon icon={faCartShopping} className="mx-3" />
                            {/* </toprightamout> */}
                        </Link>

                        <span>
                            <Link to="/login">
                                <FontAwesomeIcon icon={faUser} />
                                <span> |</span>&nbsp;
                            </Link>
                            <Link to="/register">
                                <FontAwesomeIcon icon={faUserPlus} />
                            </Link>
                        </span>
                        {/* <span v-else>
                            <Link to="/user/profile">
                                <i className="fa-solid fa-user mr-3 ml-2"></i>
                            </Link>
                        </span> */}
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
