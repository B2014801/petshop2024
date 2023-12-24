import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStartRegular } from '@fortawesome/free-regular-svg-icons';
import { memo } from 'react';

import style from './list.module.scss';

const cx = classNames.bind(style);
function CommentList({ comments }) {
    return (
        <div className={cx('card-comment', 'w-100')}>
            {comments.map((comment, index) => (
                <div className="d-flex">
                    <div>
                        <img
                            src={comment.user_data.img}
                            width="40"
                            height="40"
                            alt=""
                            className="rounded-circle mt-2"
                        />
                    </div>
                    <div className="col-10">
                        <div className={cx('comment-box')}>
                            <h6>{comment.user_data.name}</h6>

                            <div className="rating-other-user d-inline-block w-100">
                                {Array.from({ length: parseInt(comment.star) }).map(() => (
                                    <FontAwesomeIcon icon={faStar} style={{ color: '#ff0000' }} />
                                ))}
                                {Array.from({ length: 5 - parseInt(comment.star) }).map(() => (
                                    <FontAwesomeIcon icon={faStartRegular} style={{ color: '#ff0000' }} />
                                ))}
                            </div>
                            <p className="mb-0">{comment.comment_date}</p>
                            <p className="mb-0">{comment.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(CommentList);
