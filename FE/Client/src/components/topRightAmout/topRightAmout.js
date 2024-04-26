import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './topRightAmount.module.scss';

import React from 'react';

const cx = classNames.bind(style);
function TopRightAmount({ children }) {
    let amount = useSelector((store) => store.cart.amount);
    const childClassName = cx('container-have-top-right-amount', 'mx-3');

    // Pass the className down to the children
    const childrenWithProps = React.Children.map(children, (child) => {
        // Clone the child and add the className prop
        return React.cloneElement(child, { className: childClassName });
    });
    return (
        <>
            {amount > 0 && <div className={cx('top-right-amount')}>{amount}</div>}

            {childrenWithProps}
        </>
    );
}
export default TopRightAmount;
