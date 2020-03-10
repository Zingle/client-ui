import 'moment-timezone';
import moment from 'moment';
import { isEqual } from 'lodash';

export default function getAutoResponderEnabledStatus(schedule = [], timeZone) {
    if (!schedule.length) return false;

    const date = moment().tz(timeZone);
    const lastMonday = date.clone().startOf('isoWeek');
    const secondsFromMonday = date.diff(lastMonday, 'seconds');
    const fullWeekOnly = [0, 604800]; //604800 seconds (1 week)

    if (isEqual(fullWeekOnly, schedule)) {
        return false;
    } else {
        for (let i = 0; i < schedule.length; i += 2) {
            if (secondsFromMonday >= schedule[i] && secondsFromMonday <= schedule[i + 1]) {
                return true;
            }
        }
    }

    return false;
}