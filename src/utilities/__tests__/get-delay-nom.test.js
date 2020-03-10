import getDelayNom from '../get-delay-nom';

describe('getDelayNom', () => {
    it('Renders correct plurality', () => {
        const oneMinute = 1;
        const oneHour = 60;
        const minutes = 3;
        const hours = 180;

        expect(getDelayNom(oneMinute)).toBe('Send in 1 min');
        expect(getDelayNom(oneHour)).toBe('Send in 1 hr');
        expect(getDelayNom(minutes)).toBe('Send in 3 mins');
        expect(getDelayNom(hours)).toBe('Send in 3 hrs');
    });

    it('Renders hours and minutes together', () => {
        const oneHourThirtyMinutes = 90;
        const threeHoursFortyFiveMinutes = 225;

        expect(getDelayNom(oneHourThirtyMinutes)).toBe('Send in 1 hr 30 mins');
        expect(getDelayNom(threeHoursFortyFiveMinutes)).toBe('Send in 3 hrs 45 mins');
    });
});