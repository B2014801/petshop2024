/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import style from './contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function Contact() {
    return (
        <>
            <div className={cx('contact-header')}>
                <h5 className="text-white positon-relative">
                    <FontAwesomeIcon icon={faPhone} /> LIÊN HỆ PET SHOP
                </h5>
                <p className="text-white">
                    <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ shop: Long Tuyền, Bình Thủy, Cần Thơ
                </p>
                <p className="text-white">
                    <FontAwesomeIcon icon={faEnvelope} /> Email : trungb2014801@student.ctu.edu.vn
                </p>
                <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faPhone} /> 0925.086.811
                </button>
            </div>
            <hr />
            <div>
                <p className="mt-2 text-center">
                    Chúng Tôi sẽ rất vui lòng nếu nhận được sự phản hồi của các bạn. Nếu có bất kỳ điều gì chưa hài thì
                    hãy gửi yêu cầu đến chúng tôi. Chúng tôi sẽ cố gắng phản hồi nhanh nhất có thể
                </p>
            </div>
            <hr />
            <div>
                <a href="#">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31431.17147607504!2d105.7437779!3d10.0254046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1677681023019!5m2!1svi!2s"
                        height="450"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        width="100%"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </a>
            </div>
        </>
    );
}

export default Contact;
