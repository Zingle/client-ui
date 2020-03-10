const colors = {
    primary: '#1299EB',
    primaryMedium: '#81CFFF',
    primaryLight: '#e5f4fd',
    dark: '#174D68',
    faint: '#efefef',
    text: '#354c61',
    textMedium: '#618294',
    textLight: '#9FB4C0',
    positive: '#37C597',
    negative: '#FD555D',
    neutral: '#d2dade',
    purple: '#727AE8',
    light: '#d2dade',
    noteYellow: '#FFF6D9',
    translations: '#9B59B6',
    yellow: '#FCBD01',
    yellowLight: '#FFEB07'
};

const guide = {
    containerWidth: '1200px',
    settingsTitle: {
        fontSize: '27px',
        fontWeight: 600
    },
    settingsSubtitle: {
        fontSize: '16px',
        fontWeight: 600
    },
    title: {
        fontSize: '2.85rem',
        fontWeight: 400
    },
    subtitle: {
        marginTop: '12px',
        fontSize: '1.42rem',
        lineHeight: '1.2',
        color: '#9FB4C0',
        fontWeight: 400
    },
    boxShadow: {
        boxShadow: `0px 1px 1px 0px ${colors.light}`
    }
};

export default {
    ...guide,
    colors
};
