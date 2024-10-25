export function formatDate(dateString) {
    const dateParts = dateString.split('T');

    if (dateParts.length !== 2) {
        document.getElementById('formattedDate').innerText = 'Invalid date format. Please use YYYY-MM-DDTHH:mm.';
        return;
    }

    const date = dateParts[0].split('-');
    const time = dateParts[1].split(':');

    if (date.length !== 3 || time.length !== 2) {
        document.getElementById('formattedDate').innerText = 'Invalid date or time format.';
        return;
    }

    const year = date[0];
    const month = date[1].padStart(2, '0');
    const day = date[2].padStart(2, '0');
    const hours = time[0].padStart(2, '0');
    const minutes = time[1].padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
}