export const numberFormat = (numberText) => {
    const number = +numberText;
    const formattedNumber = number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
    })

    return formattedNumber;
}