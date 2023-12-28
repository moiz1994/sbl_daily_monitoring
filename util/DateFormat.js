export const systemDateFormat = (dateString) => {
    const months = {
        JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
        JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
    };

    const dateParts = dateString.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = months[dateParts[1]];
    const year = 2000 + parseInt(dateParts[2], 10); // Assuming 2-digit year

    return new Date(year, month, day);
}

export const getCurrentDateFormatted = () => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

export const dateFormat = (inputDate) => {
    const day = inputDate.getDate();
    const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    return `${day}-${month}-${year}`;
}

