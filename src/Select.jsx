import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide, centerRight } from './style';
import { ChevronDown } from './Icon';
import classNames from 'classnames';
import Color from 'color';
import { find } from 'lodash';
import { truncate } from "@zingle/es-util";

class Select extends Component {
    constructor(props) {
        super(props);
        this.testNode = document.createElement('span');
        this.state = {
            width: 18
        };
    }

    static propTypes = {
        allowEmpty: PropTypes.bool,
        isBlock: PropTypes.bool,
        isDisabled: PropTypes.bool,
        className: PropTypes.string,
        default: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        didError: PropTypes.bool,
        displayProperty: PropTypes.string.isRequired,
        groupProperty: PropTypes.string,
        hasCaret: PropTypes.bool,
        id: PropTypes.string.isRequired,
        inputRef: PropTypes.func,
        modifier: PropTypes.oneOf(['default', 'inline', 'live']),
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        style: PropTypes.object,
        truncate: PropTypes.bool,
        value: PropTypes.any.isRequired,
        valueProperty: PropTypes.string.isRequired,
        groupSort: PropTypes.func,
    };

    static defaultProps = {
        allowEmpty: false,
        isBlock: false,
        isDisabled: false,
        default: 'Choose one...',
        didError: false,
        hasCaret: true,
        modifier: 'default',
        truncate: true,
        groupSort: (a, b) => a[0].localeCompare(b[0])
    };

    widthOffset = 3

    componentDidMount() {
        if (this.props.modifier === 'inline') {
            this.calculateWidth();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.modifier === 'inline' && this.props.value !== prevProps.value) {
            this.calculateWidth();
        }
    }

    calculateWidth() {
        const { fontSize, fontWeight } = window.getComputedStyle(this.input);
        const text = (this.props.value === null || typeof this.props.value === 'undefined' || (typeof this.props.value === 'string' && !this.props.value.length)) ? document.createTextNode(this.props.default) : document.createTextNode(this.getSelectedOptionDisplay());
        let width = 0;
        // Apply existing styles from input to tester span.
        this.testNode.style.fontSize = fontSize;
        this.testNode.style.fontWeight = fontWeight;
        // Append to body, capture width, and remove.
        this.testNode.appendChild(text);
        document.body.appendChild(this.testNode);
        width = this.testNode.offsetWidth;
        document.body.removeChild(this.testNode);
        this.testNode.removeChild(text);
        // Set state width value with captured width value + offset + optional caret offset.
        this.setState(prevState => ({
            ...prevState,
            width: width + this.widthOffset + (this.props.hasCaret ? 10 : 0)
        }));
    }

    getSelectedOptionDisplay = () => {
        const selectedOption = find(this.props.options, { [this.props.valueProperty]: this.props.value });

        if (selectedOption) {
            return selectedOption[this.props.displayProperty];
        } else {
            return '';
        }
    }

    handleRef = elem => {
        this.input = elem;

        if (this.props.inputRef) {
            this.props.inputRef(elem);
        }
    }

    handleTruncate = str => {
        if (!this.props.truncate) return str;

        return truncate(str, 20);
    }

    render() {
        return (
            <div className={css(
                styles.base,
                this.props.isBlock && styles.block
            )}>
                <select
                    className={classNames(css(
                        styles.select,
                        this.props.isBlock && styles.block,
                        this.props.modifier === 'default' && styles.default,
                        this.props.modifier === 'inline' && styles.inline,
                        this.props.modifier === 'live' && styles.live,
                        this.props.hasCaret && this.props.modifier !== 'inline' && styles.hasCaret,
                        this.props.didError && styles.error
                    ), this.props.className)}
                    disabled={this.props.isDisabled}
                    id={this.props.id}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    qa-value={this.props.value}
                    ref={this.handleRef}
                    style={{
                        width: this.props.modifier === 'inline' ? `${this.state.width}px` : null,
                        ...this.props.style
                    }}
                    value={this.props.value}
                >
                    {this.props.default !== false ? (
                        <option
                            disabled={this.props.allowEmpty ? !this.props.value : true}
                            value=""
                        >
                            {this.props.value && this.props.allowEmpty ? 'None' : this.props.default}
                        </option>
                    ) : null}
                    {this.props.groupProperty ? (
                        Object.entries(this.props.options.reduce((acc, option) => {
                            if (Object.prototype.hasOwnProperty.call(acc, option[this.props.groupProperty])) {
                                acc[option[this.props.groupProperty]].push(option);
                            } else {
                                acc[option[this.props.groupProperty]] = [option];
                            }

                            return acc;
                        }, {})).sort(this.props.groupSort).map(([group, options]) => {
                            return (
                                <optgroup
                                    key={group}
                                    label={group}
                                >
                                    {options.sort((a, b) => a[this.props.displayProperty].localeCompare(b[this.props.displayProperty])).map(option => (
                                        <option
                                            key={option[this.props.valueProperty]}
                                            value={option[this.props.valueProperty]}
                                        >
                                            {this.handleTruncate(option[this.props.displayProperty])}
                                        </option>
                                    ))}
                                </optgroup>
                            );
                        })
                    ) : this.props.options.map(option => (
                        <option
                            key={option[this.props.valueProperty]}
                            value={option[this.props.valueProperty]}
                        >
                            {this.handleTruncate(option[this.props.displayProperty])}
                        </option>
                    ))}
                </select>
                {this.props.modifier !== 'live' && this.props.hasCaret ? (
                    <ChevronDown
                        className={css(
                            styles.icon,
                            this.props.modifier === 'default' && styles.iconDefault,
                            this.props.modifier === 'inline' && styles.iconInline
                        )}
                    />
                ) : null}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        display: 'inline-block',
        position: 'relative'
    },
    block: {
        display: 'block',
        width: '100%'
    },
    default: {
        backgroundColor: 'white',
        borderRadius: '4px',
        lineHeight: '17px',
        border: `1px solid ${styleGuide.colors.light}`,
        padding: '9px 11px',
        fontWeight: 500
    },
    error: {
        borderColor: `${styleGuide.colors.negative} !important`
    },
    hasCaret: {
        paddingRight: '30px !important'
    },
    icon: {
        ...centerRight,
        pointerEvents: 'none'
    },
    iconDefault: {
        width: '18px',
        height: '18px',
        right: '8px',
    },
    iconInline: {
        width: '10px',
        height: '10px',
        stroke: styleGuide.colors.primary,
        right: '4px'
    },
    inline: {
        appearance: 'none',
        display: 'inline-block',
        borderRadius: '0px',
        border: 'none',
        borderBottom: `1px dotted ${styleGuide.colors.primary}`,
        padding: '0px 0px 2px 0px',
        fontWeight: 600,
        backgroundColor: 'transparent',
        color: styleGuide.colors.primary,
        paddingRight: '8px',
        ':not(:first-child)': {
            marginLeft: '5px',
        },
        ':not(:last-child)': {
            marginRight: '5px',
        }
    },
    live: {
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        display: 'inline-block',
        border: '1px solid transparent',
        fontSize: '1em',
        borderRadius: '3px',
        color: styleGuide.colors.primary,
        lineHeight: 1.6,
        padding: '2px 8px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ':active': {
            outline: 'none'
        },
        ':hover:not(:focus):not(:disabled)': {
            borderColor: styleGuide.colors.light
        },
        ':focus': {
            color: styleGuide.colors.primary,
            borderColor: styleGuide.colors.primary,
            backgroundColor: Color(styleGuide.colors.primary).lighten(0.9).toString(),
            outline: 'none'
        },
        '::placeholder': {
            color: Color(styleGuide.colors.primary).lighten(0.65).toString()
        }
    },
    select: {
        boxSizing: 'border-box',
        minWidth: '18px'
    },
});

export default Select;