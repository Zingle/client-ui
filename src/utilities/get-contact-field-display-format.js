import { DATE, TIME, BOOL, OPTIONS, ANNIVERSARY } from 'constants/contact-field-types';

export default function(type) {
    switch (type) {
        case DATE:
            return 'date';
        case ANNIVERSARY:
            return 'month_day';
        case TIME:
            return 'time';
        case OPTIONS:
            return 'proper_case_string';
        case BOOL:
            return 'string';
        default:
            return null;
    }
}