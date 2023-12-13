import { Link } from 'react-router-dom';

function Category() {
    return (
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <Link
                    class="nav-link dropdown-toggle"
                    href="index.php"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/"
                >
                    Trang chủ
                </Link>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/about" class="dropdown-item">
                        Giới thiệu
                    </Link>
                    <Link to="/contact" class="dropdown-item">
                        Liên hệ
                    </Link>
                </div>
            </li>
            {/* <li v-for="(Category, index) in Categorys" class="nav-item dropdown">
        <Link
            class="nav-link dropdown-toggle"
            href="index.php"
            id="navbarDropdownMenuLink"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            :to="{
                name: 'brand',
                params: {
                    CategoryId: Category._id,
                    CategoryName: removeDiacriticsAndReplaceSpaces(Category.name),
                },
            }"
        >
            {{ Category.name }}
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link
                v-for="(Brand, index) in Category.brand"
                :to="
                    '/shop/' +
                    removeDiacriticsAndReplaceSpaces(Category.name) +
                    '/' +
                    removeDiacriticsAndReplaceSpaces(Brand.name) +
                    '/' +
                    removeDiacriticsAndReplaceSpaces(Brand._id)
                "
                class="dropdown-item"
                >{{ Brand.name }}</Link
            >
        </div>
    </li> */}
        </ul>
    );
}

export default Category;
