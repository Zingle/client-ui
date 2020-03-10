import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SegmentsIcon extends PureComponent {
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
        const { size, color, ...otherProps } = this.props;

        return (
            <svg
                height={size}
                version="1.1"
                viewBox="0 0 24 21"
                width={size}
                xmlns="http://www.w3.org/2000/svg"
                {...otherProps}
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    id="Page-1"
                    stroke={color ? color : 'currentColor'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                >
                    <g
                        id="Group"
                        strokeWidth="2"
                        transform="translate(1.000000, 1.000000)"
                    >
                        <g id="users">
                            <path
                                d="M6,12 L3,12 C1.34314575,12 1.66533454e-16,13.790861 0,16 L0,18"
                                id="Path">
                            </path>
                            <circle cx="4.5" cy="3.5" id="Oval" r="3.5"></circle>
                        </g>
                        <g
                            id="pie-chart"
                            transform="translate(10.000000, 6.000000)"
                        >
                            <path d="M11.0769231,9.39421401 C10.0677951,11.7862919 7.59072903,13.2098818 5.02139299,12.8743759 C2.45205695,12.53887 0.421532797,10.5266755 0.0574963642,7.95528875 C-0.306540069,5.38390196 1.08532606,2.88490834 3.46010528,1.84615385" id="Path"></path>
                            <path d="M12,6.46153846 C12,4.74783191 11.4164852,3.10431432 10.3778222,1.8925408 C9.33915915,0.680767276 7.93042979,1.43474975e-16 6.46153846,0 L6.46153846,6.46153846 L12,6.46153846 Z" id="Path"></path>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}
