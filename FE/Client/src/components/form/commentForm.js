import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import style from '~/components/list/list.module.scss';

const cx = classNames.bind(style);
function CommentForm({ sendComment, sendNewComment }) {
    const [comment, setComment] = useState({
        content: '',
        star: 0,
        url: document.URL,
    });
    const handleChange = (e) => {
        setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendComment(comment);
    };
    useEffect(() => {
        try {
            const socket = io('http://localhost:3000');
            socket.on('comment', (comment) => {
                sendNewComment(comment);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={cx('card-comment')}>
                    <div className="d-flex">
                        <div></div>
                        <div className="col-10">
                            <div className={cx('comment-box', 'ml-2')}>
                                <h4>Thêm bình luận</h4>
                                <div className={cx('rating')}>
                                    <input type="radio" name="star" value="5" id="5" onChange={handleChange} />
                                    <label for="5">☆</label>
                                    <input type="radio" name="star" value="4" id="4" onChange={handleChange} />
                                    <label for="4">☆</label>
                                    <input type="radio" name="star" value="3" id="3" onChange={handleChange} />
                                    <label for="3">☆</label>
                                    <input type="radio" name="star" value="2" id="2" onChange={handleChange} />
                                    <label for="2">☆</label>
                                    <input type="radio" name="star" value="1" id="1" onChange={handleChange} />
                                    <label for="1">☆</label>
                                </div>
                                <div className={cx('comment-area')}>
                                    <textarea
                                        className="form-control"
                                        placeholder="Bạn cảm thấy sản phẩm này thế nào?"
                                        rows="3"
                                        name="content"
                                        value={comment.content}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="comment-btns mt-2">
                                    <div className="text-left">
                                        <button className="btn btn-success" type="submit">
                                            GỬI
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CommentForm;
