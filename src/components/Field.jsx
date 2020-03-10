import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import Tooltip from './Tooltip';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import getFirstScrollableParent from '../utilities/get-first-scrollable-parent';

class Field extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        didInvalidate: PropTypes.bool,
        errorMessage: PropTypes.string,
        isInline: PropTypes.bool,
        namespace: PropTypes.string.isRequired
    }

    static defaultProps = {
        didInvalidate: false,
        isInline: false,
        errorMessage: ''
    }

    componentDidUpdate(prevProps) {
        if (prevProps.didInvalidate === false && this.props.didInvalidate === true) {
            const elem = document.getElementById(`${this.props.namespace}-tooltip`);

            scrollIntoViewIfNeeded(elem, {
                boundary: getFirstScrollableParent(elem),
                offset: {
                    bottom: 70
                }
            });
        }
    }

    render() {
        return (
            <div className={css(styles.base, this.props.isInline && styles.inline)}>
                <Tooltip
                    id={`${this.props.namespace}-tooltip`}
                    isFullWidth={true}
                    isOpen={this.props.didInvalidate}
                    sentiment="negative"
                    text={this.props.errorMessage}
                />
                {this.props.children}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        position: 'relative',
    },
    inline: {
        display: 'inline-block'
    }
});

export default Field;