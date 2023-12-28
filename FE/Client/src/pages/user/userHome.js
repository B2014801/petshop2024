import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './user.module.scss';

const cx = classNames.bind(style);
function UserHome() {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const list_user_category = [
        {
            title: 'TÀI KHOẢN',
            path: '/profile',
        },
        {
            title: 'TẤT CẢ',
            path: '/purchase/all',
        },
        {
            title: 'CHỜ XÁC NHẬN',
            path: '/purchase/0',
        },
        {
            title: 'ĐANG GIAO HÀNG',
            path: '/purchase/2',
        },
        {
            title: 'HOÀN THÀNH',
            path: '/purchase/3',
        },
        {
            title: 'ĐÃ HỦY',
            path: '/purchase/4',
        },
    ];
    return (
        <div class={cx('User-Home-Container')}>
            <div class="container">
                <div>
                    <ul class={cx('User-Home-Nav')}>
                        {list_user_category.map((category, index) => (
                            <li
                                v-for="(category, index) in list_user_category"
                                onClick={() => setActiveItemIndex((prev) => index)}
                                className={cx(activeItemIndex === index ? 'active-category' : '')}
                            >
                                <Link to={`/user${category.path}`}>{category.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default UserHome;
