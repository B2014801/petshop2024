export const removeDiacriticsAndReplaceSpaces = (inputString) => {
    // Remove diacritics using a regular expression
    const withoutDiacritics = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace spaces with hyphens
    const modifiedString = withoutDiacritics.replace(/\s+/g, '-');

    return modifiedString;
};
