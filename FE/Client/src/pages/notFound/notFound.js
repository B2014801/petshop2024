import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div class="page my-5 text-center">
            <p>
                Oops, không thể tìm thấy trang.
                <Link class="text-dark" to="/">
                    <button class="btn btn-light">Trở về trang chủ.</button>
                </Link>
            </p>
        </div>
    );
}

export default NotFound;
