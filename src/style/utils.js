import styleGuide from './guide';

export const clearfix = {
    ':after': {
        content: '""',
        display: 'table',
        clear: 'both'
    }
};
export const center = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};
export const centerRight = {
    position: 'absolute',
    right: '0%',
    top: '50%',
    transform: 'translate(0%, -50%)'
};
export const centerLeft = {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translate(0%, -50%)'
};

export const centerVertical = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)'
};

export const centerHorizontal = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)'
};

const skeletonShimmerKeyframes = {
    'from': {
        backgroundPosition: '-768px 0',
    },
    'to': {
        backgroundPosition: '768px 0'
    }
};

const skeletonShimmerKeyframesLong = {
    'from': {
        backgroundPosition: '-1152px 0',
    },
    'to': {
        backgroundPosition: '1152px 0'
    }
};

export const skeletonShimmer = {
    animationDuration: '1.6s',
    animationDelay: '-0.5s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: [skeletonShimmerKeyframes],
    animationTimingFunction: 'linear',
    backgroundImage: 'linear-gradient(to right, #eeeeee 0%, #dddddd 19%, #eeeeee 41%)',
    backgroundSize: '800px 104px',
};

export const skeletonShimmerLight = {
    ...skeletonShimmer,
    animationDelay: '-0.6s',
    backgroundImage: 'linear-gradient(to right, #fff 0%, #eeeeee 19%, #fff 41%)',
};

export const skeletonShimmerLong = {
    ...skeletonShimmer,
    animationName: [skeletonShimmerKeyframesLong]
};

export const nameInputStyles = {
    appearance: 'none',
    backgroundColor: 'transparent !important',
    borderRadius: '3px !important',
    fontSize: '20px !important',
    lineHeight: '20px !important',
    fontWeight: '600 !important',
    border: '1px solid transparent !important',
    ':hover': {
        borderColor: `${styleGuide.colors.light} !important`,
    },
    ':focus': {
        borderColor: `${styleGuide.colors.primary} !important`,
        outline: 'none'
    },
    '::placeholder': {
        color: `${styleGuide.colors.textLight} !important`
    },
    '::-ms-expand': {
        display: 'none'
    }
};

export const themeFontOverride = {
    fontFamilies: {
        base: '"proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif',
        narrow: '"proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif',
        narrowSSm: '"proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif',
    },
    typeMixins: {
        book: 'font-family:"proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400;',
        medium: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500;',
        narrowBook: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400;',
        narrowLight: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 300;',
        narrowMedium: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500;',
    },
    typeStyles: {
        actionM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 14px; line-height: 1.42857;',
        base: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400;',
        bodyL: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 1.375;',
        bodyM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 14px; line-height: 1.42857;',
        bodyS: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 14px; line-height: 1.42857;',
        captionM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 12px; line-height: 1.5;',
        captionS: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 10px; line-height: 1.6;',
        dataL: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 36px; line-height: 1;',
        dataM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 28px; line-height: 1;',
        dataS: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 1;',
        displayL: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 300; font-size: 68px; line-height: 1;',
        displayM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 44px; line-height: 1;',
        displayS: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 28px; line-height: 1;',
        headerL: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 24px; line-height: 1.333;',
        headerM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 20px; line-height: 1.2;',
        headerS: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 18px; line-height: 1.333;',
        headerXL: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 32px; line-height: 1;',
        labelL: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 14px; line-height: 1.42857;',
        labelM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 400; font-size: 14px; line-height: 1;',
        // link: theme.typography.typeStyles.link,
        subHeaderM: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 16px; line-height: 1.375;',
        subHeaderS: 'font-family: "proxima-nova", "Proxima Nova", "Lato", Helvetica, Arial, sans-serif; font-weight: 500; font-size: 14px; line-height: 1.42857;',
    },
};