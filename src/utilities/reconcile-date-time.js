import { getMinutes, getHours, setHours, setMinutes, setSeconds } from 'date-fns';

/**
 * Receives two dates and sets the hours and minutes of 'source' onto 'date'
 * @param  {Date|String|Number} date    date where hours and minutes will be applied
 * @param  {Date|String|Number} source  date containing the hours and minutes to extract
 * @return {Number}                     UNIX timestamp
 */
function reconcileDateTime(date, source) {
    const minutes = getMinutes(source);
    const hours = getHours(source);

    return setSeconds(setMinutes(setHours(date, hours), minutes), 0).getTime();
}

export default reconcileDateTime;