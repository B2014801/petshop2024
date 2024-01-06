import { useEffect, useState } from 'react';
import { ProductList } from '~/components/list';
import { productService } from '~/services';
import { useLocation } from 'react-router-dom';

function NameSearch() {
    const [product, setProduct] = useState([]);
    const location = useLocation();
    const [query, setQuery] = useState('');
    useEffect(() => {
        (async () => {
            try {
                const spliUrl = location.search.split('=');
                const _query = decodeURIComponent(spliUrl[spliUrl.length - 1]);
                console.log(_query);
                setQuery(_query);
                let rs = await productService.findByName(_query);

                setProduct(rs);
            } catch (er) {}
        })();
    }, [location]);
    return (
        <div className="my-2">
            <h3 className="text-center mb-2">Từ khoá: {query}</h3>
            {product.length !== 0 && <ProductList products={product} />}
        </div>
    );
}
export default NameSearch;
