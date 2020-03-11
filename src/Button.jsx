import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide, clearfix } from './style';
import Loader from './Loader';
import Color from 'color';

class Button extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isBlock: PropTypes.bool,
        className: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.func,
        iconOnly: PropTypes.bool,
        iconPosition: PropTypes.oneOf(['left', 'right']),
        id: PropTypes.string.isRequired,
        isDisabled: PropTypes.bool,
        isWorking: PropTypes.bool,
        modifier: PropTypes.oneOf(['primary', 'secondary', 'positive', 'negative', 'neutral', 'white', 'tertiary']),
        text: PropTypes.string,
        type: PropTypes.oneOf(['button', 'submit']),
        size: PropTypes.oneOf(['small', 'medium', 'large', 'default']),
        showTextWhenWorking: PropTypes.bool,
        style: PropTypes.object,
        workingText: PropTypes.string
    }

    static defaultProps = {
        isBlock: false,
        className: '',
        iconOnly: false,
        iconPosition: 'left',
        isDisabled: false,
        isWorking: false,
        labelPosition: 'left',
        modifier: 'primary',
        text: '',
        size: 'default',
        showTextWhenWorking: true,
        style: {},
        type: 'button',
        workingText: 'Processing...',
    }

    render() {
        const buttonClass = classNames(css([
            styles.base,
            this.props.modifier === 'primary' && styles.primary,
            this.props.modifier === 'negative' && styles.negative,
            this.props.modifier === 'positive' && styles.positive,
            this.props.modifier === 'white' && styles.white,
            (this.props.modifier === 'neutral' || this.props.modifier === 'secondary') && styles.neutral,
            this.props.modifier === 'tertiary' && styles.purple,
            this.props.isBlock && styles.block,
            this.props.size === 'large' && styles.large,
            this.props.size === 'medium' && styles.medium,
            this.props.size === 'small' && styles.small,
            this.props.icon && this.props.iconPosition === 'left' && !this.props.iconOnly && styles.withLeftIcon,
            this.props.icon && this.props.iconPosition === 'right' && !this.props.iconOnly && styles.withRightIcon,
            (this.props.isWorking && this.props.showTextWhenWorking) && styles.lessRightPadding,
            this.props.isDisabled && styles.disabled
        ]), this.props.className);
        const dotStyles = css(styles.dot, this.props.size === 'large' && styles.dotLarge);
        const Icon = this.props.icon ? this.props.icon : null;
        const textStyles = {
            opacity: (this.props.isWorking && !this.props.showTextWhenWorking) ? 0 : 1
        };
        const loaderStyles = {
            display: !this.props.isWorking ? 'none' : ''
        };
        const IconComponent = Icon ? ({ className }) => (
            <Icon
                className={classNames(
                    css(
                        styles.icon,
                        !this.props.iconOnly && styles.iconWithText,
                        this.props.iconOnly && styles.iconOnly
                    ),
                    className,
                )}
            />
        ) : null;

        return (
            <button
                className={buttonClass}
                disabled={this.props.isDisabled || this.props.isWorking}
                id={this.props.id}
                onClick={this.props.onClick}
                style={{...this.props.style}}
                type={this.props.type}
            >
                {IconComponent && this.props.iconPosition === 'left' ? <IconComponent /> : null}
                {!this.props.iconOnly ? (
                    <span style={textStyles}>{this.props.isWorking && this.props.workingText ? this.props.workingText : this.props.text}</span>
                ) : null}
                {IconComponent && this.props.iconPosition === 'right' && this.props.isWorking === false ? <IconComponent className={css(styles.icon__right)} /> : null}
                {!this.props.showTextWhenWorking ? (
                    <div className={css(styles.loader)} style={loaderStyles}>
                        <div className={dotStyles}></div>
                        <div className={dotStyles}></div>
                        <div className={dotStyles}></div>
                    </div>
                ) : null}
                {this.props.showTextWhenWorking && this.props.isWorking ? (
                    <Loader
                        className={css(styles.spinnerLoader)}
                        modifier="mixed"
                        size="small"
                    />
                ) : null}
            </button>
        );
    }
}

const pulseAnimation = {
    '0%, 60%, 100%': {
        opacity: 0
    },
    '33%': {
        opacity: 1
    }
};
const styles = StyleSheet.create({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '3px',
        border: 'none',
        color: 'white',
        padding: '11px 20px',
        cursor: 'pointer',
        fontWeight: '600',
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
        whiteSpace: 'nowrap',
        fontSize: '14px',
        ':focus': {
            outline: 'none'
        }
    },
    block: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    disabled: {
        opacity: 0.5
    },
    dot: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'white',
        animationName: pulseAnimation,
        animationDuration: '.8s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        ':nth-child(2)': {
            animationDelay: '-0.7s'
        },
        ':nth-child(3)': {
            animationDelay: '-0.6s'
        },
        ':not(:last-child)': {
            marginRight: '4px'
        }
    },
    dotLarge: {
        width: '10px',
        height: '10px',
        ':not(:last-child)': {
            marginRight: '5px'
        }
    },
    icon: {
        width: '16px',
        height: '16px'
    },
    iconOnly: {
        width: '15px',
        height: '14px'
    },
    iconWithText: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0%, -50%)',
        left: '10px',
    },
    icon__right: {
        left: 'auto !important',
        right: '10px'
    },
    medium: {
        padding: '10px 20px'
    },
    primary: {
        backgroundColor: styleGuide.colors.primary,
        ':active': {
            backgroundColor: Color(styleGuide.colors.primary).darken(0.12).toString(),
        },
        ':hover:not(:active)': {
            backgroundColor: Color(styleGuide.colors.primary).darken(0.08).toString()
        }
    },
    negative: {
        backgroundColor: styleGuide.colors.negative,
        ':hover': {
            backgroundColor: Color(styleGuide.colors.negative).darken(0.08).toString()
        }
    },
    positive: {
        backgroundColor: styleGuide.colors.positive,
        ':hover': {
            backgroundColor: Color(styleGuide.colors.positive).darken(0.08).toString()
        }
    },
    neutral: {
        backgroundColor: styleGuide.colors.neutral,
        color: styleGuide.colors.text,
        ':hover': {
            backgroundColor: Color(styleGuide.colors.neutral).darken(0.05).toString()
        }
    },
    large: {
        padding: '18px',
        fontSize: '1.2rem',
        fontWeight: '600'
    },
    lessRightPadding: {
        paddingRight: '12px'
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        lineHeight: '0.01',
        ...clearfix
    },
    purple: {
        backgroundColor: styleGuide.colors.purple,
        color: 'white',
        ':hover': {
            backgroundColor: Color(styleGuide.colors.purple).darken(0.05).toString()
        }
    },
    small: {
        padding: '8px 15px',
        fontSize: '.8em'
    },
    spinnerLoader: {
        marginLeft: '7px'
    },
    withLeftIcon: {
        paddingLeft: '30px'
    },
    withRightIcon: {
        paddingRight: '30px'
    },
    white: {
        backgroundColor: 'white',
        color: styleGuide.colors.primary,
        boxShadow: 'none !important',
        ':hover': {
            backgroundColor: '#F2F1F1'
        }
    }
});

export default Button;
