import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import classNames from 'classnames';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        className: PropTypes.string
    }

    render() {
        return (
            <table
                className={classNames(css(styles.base), this.props.className)}
            >
                {this.props.children}
            </table>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        width: '100%',
        borderCollapse: 'separate',
        border: `1px solid ${styleGuide.colors.light}`,
        borderRadius: '3px'
    }
});

export default Table;