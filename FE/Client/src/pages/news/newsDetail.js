import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './news.module.scss';
import { useEffect, useState } from 'react';
import newsService from '~/services/news.service';

const cx = classNames.bind(style);
function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        (async () => {
            let rs = await newsService.getNewsWithId(id);
            setNews(rs[0]);
        })();
    }, [id]);
    return (
        <div className={cx('news-detail')}>
            {news && (
                <>
                    <div
                        className={cx('news-detail-header')}
                        style={{
                            backgroundImage: `linear-gradient(rgb(20 18 18 / 50%), rgb(30 27 27 / 50%)),url(${news.img})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    >
                        <h1 className="text-white positon-relative">{news.title}</h1>
                    </div>
                    <div className={cx('news-detail-body')}>
                        <div className={cx('news-detail-body-left')}>
                            <div
                                dangerouslySetInnerHTML={{ __html: news.content }}
                                className={cx('news-detail-content')}
                            ></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default NewsDetail;
