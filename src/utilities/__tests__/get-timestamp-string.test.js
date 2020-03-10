import { getApproximateDiffString } from '../get-timestamp-string';

describe('getApproximateDiffString', () => {
    it('returns difference in words when hour and minutes both have value', () => {
        expect(getApproximateDiffString(1, 65)).toBe('about 1 hour 5 minutes');
    });

    it ('returns difference in words with only minutes when hours arg has no value', () => {
        expect(getApproximateDiffString(0, 34)).toBe('about 34 minutes');
    });

    it('returns difference in words with only hours when minutes arg is a multiple of 60', () => {
        expect(getApproximateDiffString(1, 60)).toBe('about 1 hour');
        expect(getApproximateDiffString(2, 120)).toBe('about 2 hours');
    });

    it('returns difference in words for minutes in singular form when remaining minutes is 1', () => {
        expect(getApproximateDiffString(1, 61)).toBe('about 1 hour 1 minute');
        expect(getApproximateDiffString(0, 1)).toBe('about 1 minute');
    });

    it('rounds up minute display when provided seconds argument is greater than 50', () => {
        expect(getApproximateDiffString(0, 4, 295)).toBe('about 5 minutes');
        expect(getApproximateDiffString(1, 69, 4195)).toBe('about 1 hour 10 minutes');
    });
});