import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class SliderHorizontal extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    }

    render() {
        const { color, size, ...otherProps } = this.props;

        return (
            <svg
                height={size}
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                version="1.1"
                viewBox="0 0 24 24"
                width={size}
                xmlns="http://www.w3.org/2000/svg"
                {...otherProps}
            >
                <g id="filter" transform="translate(0.000000, 1.000000)">
                    <g id="slider2" transform="translate(1.000000, 10.000000)">
                        <circle cx="7" cy="6" fill="none" id="Oval" r="3" />
                        <path d="M10,6h14" id="Shape" />
                        <path d="M-2,6H3" id="Shape_1_" />
                    </g>
                    <g id="slider1">
                        <circle cx="16" cy="6" fill="none" id="Oval_1_" r="3" />
                        <path d="M-1,6h14" id="Shape_2_" />
                        <path d="M20,6H25" id="Shape_3_" />
                    </g>
                </g>
            </svg>
        );
    }
}
