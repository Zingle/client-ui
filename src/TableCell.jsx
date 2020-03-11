import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import classNames from 'classnames';

class TableCell extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        alignment: PropTypes.oneOf(['left', 'right', 'center']),
        className: PropTypes.string,
        colspan: PropTypes.number,
        id: PropTypes.string,
    }

    static defaultProps = {
        alignment: 'left',
        colspan: 1
    }

    render() {
        return (
            <td
                className={classNames(
                    this.props.className,
                    css(
                        styles.base,
                        this.props.alignment === 'left' && styles.left,
                        this.props.alignment === 'center' && styles.center,
                        this.props.alignment === 'right' && styles.right
                    )
                )}
                colSpan={this.props.colspan}
                id={this.props.id}
            >
                {this.props.children}
            </td>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        padding: '18px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        borderTop: `1px solid ${styleGuide.colors.light}`,
        verticalAlign: 'middle'
    },
    left: {
        textAlign: 'left'
    },
    right: {
        textAlign: 'right'
    },
    center: {
        textAlign: 'center'
    }
});

export default TableCell;