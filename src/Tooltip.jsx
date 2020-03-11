import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import { X } from './Icon';

class Tooltip extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        id: PropTypes.string,
        isFullWidth: PropTypes.bool,
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func,
        size: PropTypes.oneOf(['default', 'small']),
        showContactLink: PropTypes.bool,
        sentiment: PropTypes.oneOf(['default', 'negative', 'positive', 'neutral']),
        text: PropTypes.string.isRequired,
        wrap: PropTypes.bool
    }

    static defaultProps = {
        isFullWidth: false,
        size: 'default',
        showContactLink: false,
        sentiment: 'default',
        wrap: true
    }

    handleIntercomTrigger = () => {
        if (typeof window.Intercom === 'undefined') return;

        window.Intercom('showNewMessage', 'I believe I encountered a mistake. Can you help me?');
    }

    render() {
        const wrapperStyles = css(
            styles.wrapper,
            this.props.isFullWidth && styles.fullWidth,
            this.props.isOpen && styles.open,
            this.props.size === 'small' && styles.small,
            this.props.sentiment === 'negative' && styles.negative,
            this.props.sentiment === 'positive' && styles.positive,
            this.props.sentiment === 'neutral' && styles.neutral,
            this.props.onClose && styles.closeable
        );

        const caretStyles = css(
            styles.caret,
            this.props.sentiment === 'negative' && styles.negative,
            this.props.sentiment === 'positive' && styles.positive,
            this.props.sentiment === 'neutral' && styles.neutral,
        );

        return (
            <div
                className={wrapperStyles}
                id={this.props.id}
            >
                <div className={caretStyles} />
                <p className={css(!this.props.wrap && styles.noWrap)}>
                    {this.props.text}
                    {this.props.showContactLink ? (
                        <span> Please <a onClick={this.handleIntercomTrigger} style={{ textDecoration: 'underline' }}>contact us</a> if you believe this is a mistake. We&apos;re here to help!</span>
                    ) : null}
                </p>
                <span
                    className={css(
                        styles.wrapper,
                        styles.fullWidth,
                        styles.open,
                        styles.negative
                    )}
                    style={{ display: 'none' }}
                >
                    This span is a hack to fix transition weirdness when the class has not been mounted yet
                </span>
                {this.props.onClose ? (
                    <X
                        className={css(styles.closeButton)}
                        onClick={this.props.onClose}
                    />
                ) : null}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: '50%',
        bottom: 'calc(100% + 10px)',
        transform: 'translate(-50%, 5px)',
        backgroundColor: styleGuide.colors.primary,
        borderRadius: '4px',
        boxSizing: 'border-box',
        padding: '15px 30px',
        textAlign: 'center',
        color: 'white',
        opacity: 0,
        pointerEvents: 'none'
    },
    caret: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        borderBottomLeftRadius: '2px',
        height: '10px',
        width: '10px',
        borderWidth: '1px 0 0 1px',
    },
    closeButton: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        width: '16px',
        height: '16px',
        stroke: 'white',
        opacity: 0.5,
        cursor: 'pointer',
        ':hover': {
            opacity: 1
        }
    },
    small: {
        padding: '7px 15px',
        fontSize: '12px'
    },
    closeable: {
        paddingRight: '25px'
    },
    open: {
        opacity: 1,
        transform: 'translate(-50%, 0px)',
        pointerEvents: 'auto',
        transition: 'opacity .15s ease-out, transform .15s ease-out'
    },
    fullWidth: {
        width: '100%'
    },
    positive: {
        backgroundColor: styleGuide.colors.positive,
        color: 'white'
    },
    negative: {
        backgroundColor: styleGuide.colors.negative,
        color: 'white'
    },
    neutral: {
        backgroundColor: styleGuide.colors.neutral,
        color: styleGuide.colors.text
    },
    noWrap: {
        whiteSpace: 'nowrap'
    }
});

export default Tooltip;