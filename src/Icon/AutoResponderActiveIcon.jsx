import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class AutoResponderActiveIcon extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    }

    static defaultProps = {
        size: 11
    }

    render() {
        const { size, ...otherProps } = this.props;

        return (
            <svg
                height={size}
                version="1.1"
                viewBox="0 0 11 12"
                width={size}
                xmlns="http://www.w3.org/2000/svg"
                {...otherProps}
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                >
                    <g
                        fillRule="nonzero"
                        id="autoresponder"
                    >
                        <path
                            d="M10.5,4 L8.5,4 C8.315,4 8.146,3.898 8.06,3.736 C7.972,3.573 7.982,3.376 8.084,3.223 L9.565,1 L8.5,1 C8.224,1 8,0.776 8,0.5 C8,0.224 8.224,0 8.5,0 L10.5,0 C10.685,0 10.854,0.102 10.94,0.264 C11.028,0.427 11.018,0.624 10.916,0.777 L9.434,3 L10.5,3 C10.776,3 11,3.224 11,3.5 C11,3.776 10.776,4 10.5,4 Z"
                            fill="#FFFFFF"
                            id="Shape"
                        ></path>
                        <polygon
                            fill="#FFFFFF"
                            id="Shape"
                            points="4 2 4 2.9 6.2 2.9 4 5.9 4 6.7 7.6 6.7 7.6 5.8 5.3 5.8 7.5 2.8 7.5 2"
                        ></polygon>
                        <path
                            d="M3,7.7 L3,6.7 L3,5.9 L3,5.5 L3.2,5.3 L4,4.2 C3.8,4.2 3.7,4.2 3.5,4.2 C1.6,4.2 0,5.7 0,7.7 C0,9.6 1.6,11.2 3.5,11.2 C5.4,11.2 7,9.6 7,7.7 L4,7.7 L3,7.7 Z"
                            fill="#4BC499"
                            id="Shape"
                        ></path>
                    </g>
                </g>
            </svg>
        );
    }
}
