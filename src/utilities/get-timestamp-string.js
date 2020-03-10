import {
    differenceInSeconds,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    isAfter,
    distanceInWordsToNow,
    differenceInMonths,
    differenceInYears,
    subSeconds
} from 'date-fns';
import moment from 'moment';

// override moment calendar format to account for differences in
// dates within current year and not within current year
moment.calendarFormat = function(myMoment, now) {
    const diffDays = myMoment.diff(now, 'days', true);

    if (diffDays < -6 && (myMoment.year() !== now.year())) return 'sameElse';
    if (diffDays < -6 && (myMoment.year() === now.year())) return 'sameYear';
    if (diffDays < -1) return 'lastWeek';
    if (diffDays < 0) return 'lastDay';
    if (diffDays < 1) return 'sameDay';
    if (diffDays < 2) return 'nextDay';
    if (diffDays < 7) return 'nextWeek';

    return 'sameElse';
};

const formats = {
    sameDay: '[Today] LT',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday] LT',
    lastWeek: 'dddd LT',
    sameYear: 'MMM Do LT',
    sameElse: 'MMM D YYYY LT'
};

export function getApproximateDiffString(hours = 0, minutes = 0, seconds = 0) {
    let str = ['about'];
    let formattedMinutes = minutes;
    let formattedSeconds = seconds;

    if (hours) {
        str.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
        formattedMinutes = formattedMinutes - (hours * 60);
        formattedSeconds = formattedSeconds - (hours * 3600);
    }

    if (formattedMinutes) {
        formattedSeconds = formattedSeconds - (formattedMinutes * 60);
        // if the amount of formatted seconds is greater than 50, add 1 minute to
        // "round up" the display. This implies that the source action of this timestamp happened
        // recently, meaning the user is probably expecting a display of "5 minutes" instead of "4 minutes"
        // taking into account "55 seconds".
        if (formattedSeconds > 50) {
            formattedMinutes = formattedMinutes + 1;
        }

        str.push(`${formattedMinutes} minute${formattedMinutes !== 1 ? 's' : ''}`);
    }

    if (!hours && !formattedMinutes) {
        if (seconds < 30) {
            return 'a few seconds';
        } else {
            return 'about 1 minute';
        }
    }

    return str.join(' ');
}

export default function getTimestampString(time, truncate = false, forceFuture = false) {
    const now = new Date();
    const bufferedTime = subSeconds(time, 5);
    const isFuture = isAfter(bufferedTime, now);
    const seconds = Math.abs(differenceInSeconds(time, now));
    const minutes = Math.abs(differenceInMinutes(time, now));
    const hours = Math.abs(differenceInHours(time, now));
    const days = Math.abs(differenceInDays(time, now));
    const months = Math.abs(differenceInMonths(time, now));
    const years = Math.abs(differenceInYears(time, now));

    if (isFuture) {
        // When delayed time is father than 5 hours, we don't need as
        // exact a word representation of time, so use distanceInWordsToNow.
        // If closer than 5 hours, use a more precise measurement.
        if (hours > 5) {
            return distanceInWordsToNow(bufferedTime);
        } else {
            return getApproximateDiffString(hours, minutes, seconds);
        }
    } else if (forceFuture) {
        // if the forceFuture flag is true, this means this timestamp should
        // never appear as if it happened in the past, e.g., only future tenses are allowed.
        // If the actual timestamp is not in the future as calculated by the isFuture const,
        // we can default to 'a few seconds', the nearest future unit to "now", to be rendered in perpetuity.
        return 'a few seconds';
    }

    if (truncate) {
        if (years) {
            return `${years}yrs`;
        } else if (months) {
            return `${months}mth`;
        } else if (days) {
            return `${days}d`;
        } else if (hours) {
            return `${hours}h`;
        } else if (minutes) {
            return `${minutes}m`;
        } else {
            return `Just Now`;
        }
    } else {
        return moment(time).calendar(null, formats);
    }
}