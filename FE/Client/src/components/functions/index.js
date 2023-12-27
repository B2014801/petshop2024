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
export const getProductAfterDisCount = (product) => {
    const PriceInt = product.price.replace(/\./g, '');
    const AfterDiscount = PriceInt - (PriceInt * product.discount) / 100;
    return formatNumberWithDot(AfterDiscount);
};
export const getTemporaryPriceOfOneProduct = (price, amount) => {
    const priceInt = price.replace(/\./g, ''); //1.000.000 to 1000000

    const priceFinal = formatNumberWithDot(priceInt * amount);
    return priceFinal;
};

export const getTemporaryPrice = (cart, vouchers = null) => {
    if (cart.length !== 0) {
        const temporary_price = cart.reduce(
            (total, item) => total + item.Amount * item.ProductData.price.replace(/\./g, ''),
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
