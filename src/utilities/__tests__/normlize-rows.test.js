import normalizeHeaders from '../normalize-headers';
import normalizeRows from '../normalize-rows';

describe('normalizeHeaders', () => {
    it('returns array with extra entries if rows have more items than header', () => {
        const headers = ['one', 'two'];
        const rows = [
            ['1', '2', '3', '4', '5', '6'],
            ['1', '2', '3', '4', '5', '6']
        ];
        const expected = ['one', 'two', ' ', ' ', ' ', ' '];

        expect(normalizeHeaders(headers, rows)).toEqual(expected);
    });
});

describe('normalizeRows', () => {
    it('returns array with entries with normalized lengths if header has more items', () => {
        const headers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
        const rows = [
            ['1', '2', '3', '4'],
            ['1', '2', '3', '4']
        ];
        const expected = [
            ['1', '2', '3', '4', ' ', ' ', ' '],
            ['1', '2', '3', '4', ' ', ' ', ' ']
        ];

        expect(normalizeRows(rows, headers)).toEqual(expected);
    });

    it('returns array with entries with normalized lengths if another entry has a longer length', () => {
        const headers = ['one', 'two', 'three', 'four', 'five'];
        const rows = [
            ['1', '2', '3', '4'],
            ['1', '2', '3', '4', '5', '6', '7'],
            ['1', '2', '3', '4'],
            ['1', '2', '3', '4'],
            ['1', '2', '3', '4']
        ];
        const expected = [
            ['1', '2', '3', '4', ' ', ' ', ' '],
            ['1', '2', '3', '4', '5', '6', '7'],
            ['1', '2', '3', '4', ' ', ' ', ' '],
            ['1', '2', '3', '4', ' ', ' ', ' '],
            ['1', '2', '3', '4', ' ', ' ', ' ']
        ];

        expect(normalizeRows(rows, headers)).toEqual(expected);
    });
});
