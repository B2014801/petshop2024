import classNames from 'classnames/bind';
import style from './news.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import newsService from '~/services/news.service';
import Search from '~/layouts/components/search/search';
const cx = classNames.bind(style);
function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        (async () => {
            let news = await newsService.getNews();
            setNews(news.reverse());
        })();
    }, []);
    return (
        <div className={cx('news-body', { row: true })}>
            {news.length !== 0 && (
                <>
                    <div className={cx('news-list-container', { 'row col-md-9': true })}>
                        {news.map((news, index) => (
                            <div className="col-md-6">
                                <Link to={`/news/detail/${news._id}`}>
                                    <img className={cx('news-titile-img')} src={news.img} alt=""></img>
                                    <h5 className="mt-1">{news.title}</h5>

                                    {(index + 1) % 2 === 0 ? (
                                        <p>Lời nói đầu Xin chào tất cả các bạn độc giả đang theo dõi bài [...]</p>
                                    ) : (
                                        <p>Lời nói đầu Xin chào tất cả các bạn độc giả yêu dấu của Pet [...]</p>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className={cx('news-list-right', { 'col-md-3': true })}>
                        <h5>Bài viết xem nhiều</h5>
                        <div className={cx('is-divider')}></div>
                        <div>
                            <ul>
                                {news
                                    .sort((a, b) => {
                                        return b.view - a.view;
                                    })
                                    // .slice(0, 8)
                                    .map((item, index) => (
                                        <Link to={`/news/detail/${item._id}`}>
                                            <li>
                                                <div>
                                                    <div>
                                                        <h6>{index + 1}</h6>
                                                    </div>
                                                    <div>{item.title}</div>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default News;
