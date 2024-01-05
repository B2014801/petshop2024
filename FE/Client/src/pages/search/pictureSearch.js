import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import style from './pictureSearch.module.scss';
import { productService } from '~/services';
import { ProductList } from '~/components/list';

const cx = classNames.bind(style);
function PictureSearch() {
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(null);
    const [dragenter, setDragenter] = useState(null);
    const [product, setProduct] = useState([]);
    const formRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.target.style.backgroundColor = '';
        setDragenter(false);
        displayImage(e.dataTransfer.files[0]);
    };
    const handleDragEnter = (e) => {
        setDragenter(true);
        e.target.style.backgroundColor = 'lightblue';
    };
    const handleDragLeave = (e) => {
        setDragenter(false);
        e.target.style.backgroundColor = '';
    };
    const displayImage = async (file) => {
        try {
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImg(e.target.result);
                };
                reader.readAsDataURL(file);

                (async () => {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append('pictureSearch', true);
                    formData.append('img', file);
                    // const rs = await productService.findProductByImg(formData);
                    const rs = await productService.findByName('cho');
                    if (rs) {
                        setLoading(false);
                        setProduct(rs);
                        console.log(rs);
                    }
                })();
            } else {
                // If no file is selected, clear the image URL
                setImg('');
            }
        } catch (error) {}
    };
    return (
        <div className={cx('picture-search-wrapper')}>
            <div
                className={cx('picture-search-container')}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                <div className={cx('picture-search-body')}>
                    {!dragenter ? (
                        <form ref={formRef} encType="multipart/form-data">
                            {img === '' ? (
                                <>
                                    Thả ảnh vào đây hoặc&nbsp;
                                    <label for="img_search1">tải ảnh lên</label>
                                    <input
                                        type="file"
                                        id="img_search1"
                                        hidden
                                        onChange={(e) => displayImage(e.target.files[0])}
                                    ></input>
                                </>
                            ) : (
                                <div>
                                    <label for="img_search2">
                                        <h5>Tải lên</h5>
                                    </label>
                                    <input
                                        type="file"
                                        id="img_search2"
                                        hidden
                                        onChange={(e) => displayImage(e.target.files[0])}
                                    ></input>
                                    <img src={img} alt="" />
                                </div>
                            )}
                        </form>
                    ) : (
                        <div>Thả ảnh vào đây</div>
                    )}
                </div>
            </div>
            {product.length !== 0 && (
                <div className={cx('picture-search-result')}>
                    <ProductList products={product} customCol={'col-sm-4 col-md-4 col-lg-4'} itemsPerPage={20} />
                </div>
            )}
            {loading && (
                <div className={cx('loading')}>
                    <div className={cx('loading-icon')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </div>
                </div>
            )}
        </div>
    );
}
export default PictureSearch;
