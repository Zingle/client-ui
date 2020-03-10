import { subHours, isWithinRange } from 'date-fns';

function isWithinPreviousDay(dateToTest, endOfRange) {
    const startOfRange = subHours(endOfRange, 24);

    return isWithinRange(dateToTest, startOfRange, endOfRange);
}

export default isWithinPreviousDay;