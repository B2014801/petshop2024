export const removeDiacriticsAndReplaceSpaces = (inputString) => {
    // Remove diacritics using a regular expression
    const withoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace spaces with hyphens
    const modifiedString = withoutDiacritics.replace(/\s+/g, '-');

    return modifiedString;
};
export const formatNumberWithDot = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; //1000 to 1.000
};
export const getProductAfterDisCount = (product, ints = null) => {
    const PriceInt = product.price.replace(/\./g, '');
    const AfterDiscount = PriceInt - (PriceInt * parseInt(product.discount)) / 100;
    return ints ? AfterDiscount : formatNumberWithDot(AfterDiscount);
};
export const getTemporaryPriceOfOneProduct = (price, amount, discount) => {
    let priceInt = price.replace(/\./g, ''); //1.000.000 to 1000000
    priceInt -= (priceInt * parseInt(discount)) / 100;
    const priceFinal = formatNumberWithDot(priceInt * amount);
    return priceFinal;
};

export const getTemporaryPrice = (cart, vouchers = null) => {
    if (cart.length !== 0) {
        const temporary_price = cart.reduce(
            (total, item) => total + item.Amount * getProductAfterDisCount(item.ProductData, 1),
            0,
        );

        if (!vouchers) {
            return formatNumberWithDot(temporary_price);
        } else {
            let discount_percent = 0;
            discount_percent = vouchers.reduce((total, voucher) => total + voucher.discount, 0);
            return formatNumberWithDot(temporary_price - (temporary_price * discount_percent) / 100 + 15000);
        }
    }
};
export function areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        // eslint-disable-next-line eqeqeq

        if (obj1[key] != obj2[key]) {
            return false;
        }
    }

    return true;
}
