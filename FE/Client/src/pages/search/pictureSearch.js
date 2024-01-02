import { useState } from 'react';
import classNames from 'classnames/bind';

import style from './pictureSearch.module.scss';

const cx = classNames.bind(style);
function PictureSearch() {
    const [img, setImg] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        displayImage(e.dataTransfer.files[0]);
    };
    const displayImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImg(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, clear the image URL
            setImg('');
        }
    };
    return (
        <div className={cx('picture-search-container')} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className={cx('picture-search-body')}>
                {img === '' ? (
                    <>
                        Thả ảnh vào đây hoặc&nbsp;
                        <label for="img-search1">tải ảnh lên</label>
                        <input
                            type="file"
                            id="img-search1"
                            hidden
                            onChange={(e) => displayImage(e.target.files[0])}
                        ></input>
                    </>
                ) : (
                    <div>
                        <label for="img-search2">
                            <h5>tải lên</h5>
                        </label>
                        <input
                            type="file"
                            id="img-search2"
                            hidden
                            onChange={(e) => displayImage(e.target.files[0])}
                        ></input>
                        <img src={img} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}
export default PictureSearch;
