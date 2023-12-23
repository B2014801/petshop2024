import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '~/components/list/productList';
import brandService from '~/services/brand.service';

function Brand() {
    const [brand, setBrand] = useState([]);
    const { CategoryName, CategoryId } = useParams();

    useEffect(() => {
        const getBrands = async () => {
            try {
                const result = await brandService.getAllBrandWithCategoryId(CategoryId);
                if (result.length !== 0) {
                    setBrand(result);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getBrands();
        document.title = 'Brand';
    }, [CategoryId]);

    return <div>{brand.length !== 0 && <ProductList products={brand} CategoryName={CategoryName} />}</div>;
}

export default Brand;
