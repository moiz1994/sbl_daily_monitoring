export const numberFormat = (numberText) => {
    const number = +numberText;
    const formattedNumber = number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
    })

    return formattedNumber;
}

export const toTitleCase = (str) => {
    //return str.replace(/\b\w/g, char => char.toUpperCase());
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}