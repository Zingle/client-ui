import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { skeletonShimmer } from '../style';
import classNames from 'classnames';

class SkeletonLine extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        className: PropTypes.string,
        isBlock: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        width: PropTypes.number
    };

    static defaultProps = {
        isBlock: false,
        width: 50
    };

    render() {
        return (
            <div
                className={classNames(
                    css(
                        styles.line,
                        this.props.isBlock && styles.block,
                        this.props.size === 'small' && styles.small,
                        this.props.size === 'large' && styles.large
                    ),
                    this.props.className
                )}
                style={!this.props.isBlock ? { width: this.props.width + 'px' } : null}
            ></div>
        );
    }
}

const styles = StyleSheet.create({
    block: {
        width: '100%'
    },
    line: {
        ...skeletonShimmer,
        height: '14px',
        borderRadius: '5000px'
    },
    small: {
        height: '12px'
    },
    large: {
        height: '24px'
    }
});

export default SkeletonLine;