import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import style from './modals.module.scss';

const cx = classNames.bind(style);
function Model1({ children, show, isClosed }) {
    const [_show, set_show] = useState(false);
    const modelRef = useRef('');
    useEffect(() => {
        set_show(show);
        const handleClickOutSite = (e) => {
            if (modelRef.current && !modelRef.current.contains(e.target)) {
                set_show(false);
                isClosed(_show);
            }
        };

        document.addEventListener('click', handleClickOutSite);
        return () => {
            document.removeEventListener('click', handleClickOutSite);
        };
    }, [show]);
    return (
        <>
            {_show && (
                <div className={cx('modal-wrapper')}>
                    <div className={cx('modal-content')} ref={modelRef}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Model1;
