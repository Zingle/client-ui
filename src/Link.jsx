import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import classNames from 'classnames';

class Link extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        className: PropTypes.string,
        href: PropTypes.string,
        openNewTab: PropTypes.bool,
    }

    static defaultProps = {
        openNewTab: false
    }

    render() {
        return (
            <a
                className={classNames(css(styles.base), this.props.className)}
                href={this.props.href}
                rel={this.props.openNewTab ? 'noopener noreferrer' : undefined}
                target={this.props.openNewTab ? '_blank' : undefined}
            >
                {this.props.children}
            </a>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        color: `${styleGuide.colors.primary} !important`,
        ':hover': {
            textDecoration: 'underline !important'
        }
    }
});

export default Link;