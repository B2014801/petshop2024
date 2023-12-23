import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';

import { removeDiacriticsAndReplaceSpaces } from '~/components/functions';

function Category({ category }) {
    return (
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <Link
                    className="nav-link dropdown-toggle"
                    href="index.php"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/"
                >
                    Trang chủ
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/about" className="dropdown-item">
                        Giới thiệu
                    </Link>
                    <Link to="/contact" className="dropdown-item">
                        Liên hệ
                    </Link>
                </div>
            </li>

            {category?.map((Category, index) => (
                <li key={index} className="nav-item dropdown">
                    <Link
                        className="nav-link dropdown-toggle"
                        href="index.php"
                        id="navbarDropdownMenuLink"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        to={`/shop/${removeDiacriticsAndReplaceSpaces(Category.name)}/${Category._id}`}
                    >
                        {Category.name}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        {Category.brand.map((Brand, index) => (
                            <Link
                                key={index}
                                to={
                                    '/shop/' +
                                    removeDiacriticsAndReplaceSpaces(Category.name) +
                                    '/' +
                                    removeDiacriticsAndReplaceSpaces(Brand.name) +
                                    '/' +
                                    removeDiacriticsAndReplaceSpaces(Brand._id)
                                }
                                className="dropdown-item"
                            >
                                {Brand.name}
                            </Link>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
}
Category.propTypes = {
    category: Proptypes.array.isRequired,
};

export default Category;
