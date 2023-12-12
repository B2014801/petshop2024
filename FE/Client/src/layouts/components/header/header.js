import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            header
            <Link to="/">home</Link>
            <Link to={`/cart/${23}`}>cart</Link>
        </div>
    );
}
export default Header;
