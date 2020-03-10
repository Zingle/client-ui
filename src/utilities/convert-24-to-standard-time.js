// https://stackoverflow.com/questions/29206453/best-way-to-convert-military-time-to-standard-time-in-javascript
function convert(str) {
    const split = str.split(':');
    const hours = Number(split[0]);
    const minutes = Number(split[1]);

    let timeValue = '';

    if (hours > 0 && hours <= 12) {
        timeValue = '' + parseInt(hours);
    } else if (hours > 12) {
        timeValue = '' + (hours - 12);
    } else if (hours === 0) {
        timeValue = '12';
    }

    timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;  // get minutes
    timeValue += (hours >= 12) ? 'pm' : 'am';  // get AM/PM

    return timeValue;
}

export default convert;