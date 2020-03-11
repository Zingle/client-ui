import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ContactFields extends PureComponent {
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
                version="1.1"
                viewBox="-2 -2 24 24"
                width={size}
                xmlns="http://www.w3.org/2000/svg"
                {...otherProps}
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    id="Page-1"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                >
                    <g
                        id="log-in"
                        stroke="#000000"
                        strokeWidth="2"
                        transform="translate(1.000000, 1.000000)"
                    >
                        <path
                            d="M14,0 L16.6666667,0 C17.4030463,0 18,0.8954305 18,2 L18,16 C18,17.1045695 17.4030463,18 16.6666667,18 L14,18"
                            id="Shape"
                        />
                        <path
                            d="M0,0 L2.66666667,0 C3.40304633,0 4,0.8954305 4,2 C4,5.33333333 4,7.66666667 4,9 C4,10.3333333 4,12.6666667 4,16 C4,17.1045695 3.40304633,18 2.66666667,18 L0,18"
                            id="Shape"
                            transform="translate(2.000000, 9.000000) scale(-1, 1) translate(-2.000000, -9.000000) "
                        />
                    </g>
                </g>
            </svg>
        );
    }
}
