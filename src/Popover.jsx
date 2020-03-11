import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { StyleSheet, css } from 'aphrodite/no-important';
import { guide as styleGuide } from './style';
import { OPTIMIZED_RESIZE_EVENT } from './utilities/optimized-resize';
import classNames from 'classnames';
import { getFirstScrollableParent, getScrollableDescendants } from "@zingle/es-util";
import { throttle, isEqual } from 'lodash';

const positions = [
    'top-center',
    'top-left',
    'top-right',
    'left-center',
    'left-top',
    'right-center',
    'right-top',
    'right-bottom',
    'bottom-center',
    'bottom-left',
    'bottom-right'
];

class Popover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldMountChildren: false, // oh no,
            isScrolling: false,
            isObscured: false,
            isOpen: false,
            position: this.props.position,
            elemStyles: {}
        };
    }

    static propTypes = {
        altPosition: PropTypes.oneOf(positions),
        appendToBody: PropTypes.bool,
        allowReposition: PropTypes.bool,
        className: PropTypes.string,
        closeOnClick: PropTypes.bool,
        disableOnClickOutside: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        onOutsideClick: PropTypes.func,
        forceMount: PropTypes.bool,
        hasBackground: PropTypes.bool,
        hasBorder: PropTypes.bool,
        hasCaret: PropTypes.bool,
        isBlock: PropTypes.bool,
        isPadded: PropTypes.bool,
        isOpen: PropTypes.bool,
        isScrollable: PropTypes.bool,
        maxHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number,
        outsideClickIgnoreClass: PropTypes.string,
        position: PropTypes.oneOf(positions),
        target: PropTypes.object, // only needed if appendToBody is true. Used to determine position
        type: PropTypes.oneOf(['default', 'menu'])
    };

    static defaultProps = {
        altPosition: 'left-center',
        allowReposition: true,
        appendToBody: false,
        closeOnClick: false,
        disableOnClickOutside: true,
        onOutsideClick: () => {},
        hasBackground: true,
        hasBorder: true,
        hasCaret: true,
        isBlock: false,
        isOpen: false,
        isPadded: true,
        isScrollable: true,
        forceMount: false,
        maxHeight: 500,
        maxWidth: 500,
        minWidth: 0,
        outsideClickIgnoreClass: 'ignore-react-onclickoutside',
        position: 'bottom-center',
        type: 'default'
    };

    scrollTimeout = null

    detectEdges = () => {
        if (!this.elem) return;

        const coords = this.elem.getBoundingClientRect();
        const parent = !this.props.appendToBody ? getFirstScrollableParent(this.elem).getBoundingClientRect() : null;
        const viewportRight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const viewportBottom = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const outOfBoundsRight = parent ? parent.right : viewportRight;
        const outOfBoundsTop = parent ? parent.top : 0;
        const outOfBoundsBottom = parent ? parent.bottom : viewportBottom;
        const outOfBoundsLeft = parent ? parent.left : 0;
        let outOfBoundsDetected = false;
        let state = null;
        // check for out of bounds at right
        if (coords.right > outOfBoundsRight) {
            if (this.state.position.includes('bottom-')) {
                state = { position: this.props.altPosition || 'bottom-right' };
            }
            if (this.state.position.includes('right-')) {
                state = { position: this.props.altPosition || 'bottom-center' };
            }
            outOfBoundsDetected = true;
        }
        // check for out of bounds at top
        if (coords.top < outOfBoundsTop) {
            if (this.state.position.includes('top-')) {
                state = { position: (!this.props.altPosition.includes('top-') && this.props.altPosition) || 'bottom-left' };
            }
            outOfBoundsDetected = true;
        }
        // check for out of bounds at bottom
        if (coords.bottom > outOfBoundsBottom) {
            if (this.state.position.includes('bottom-')) {
                state = { position: (!this.props.altPosition.includes('bottom-') && this.props.altPosition) || 'top-left' };
            }
            outOfBoundsDetected = true;
        }
        // check for out of bounds at left
        if (coords.left < outOfBoundsLeft) {
            if (this.state.position.includes('left-')) {
                state = { position: this.props.altPosition || 'right-center' };
            }
            outOfBoundsDetected = true;
        }

        if (state) {
            this.setState(prevState => ({
                ...prevState,
                ...state
            }), () => {
                // If we are appending to body, we need to call positionPortalPopover
                // after any position state adjustments have occured
                if (outOfBoundsDetected && this.props.appendToBody) {
                    this.positionPortalPopover();
                }
            });
        }
    }

    componentDidMount() {
        if (this.props.appendToBody) {
            setTimeout(() => {
                this.positionPortalPopover();
                this.subscribeParentScrollListener();
                window.addEventListener(OPTIMIZED_RESIZE_EVENT, this.positionPortalPopover);
            });
        }

        if (this.props.allowReposition) {
            setTimeout(() => {
                this.detectEdges();
            });

            window.addEventListener(OPTIMIZED_RESIZE_EVENT, this.detectEdges);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.appendToBody) {
            if (prevState.isScrolling && !this.state.isScrolling) {
                this.positionPortalPopover();
            }

            if (!prevProps.isOpen && this.props.isOpen) {
                this.setState(prevState => ({
                    ...prevState,
                    isObscured: true
                }), () => {
                    this.positionPortalPopover();
                });
            }
            // if for some reason the target did not load on mount,
            // we need to position the popover when we finally receive the target ref
            if (!prevProps.target && this.props.target) {
                this.positionPortalPopover();
            }
        }

        if (this.props.allowReposition && !prevProps.isOpen && this.props.isOpen) {
            setTimeout(() => {
                this.detectEdges();
            });
        }
        // Reset scroll position of scroll container when popover is closed
        if (prevProps.isOpen && !this.props.isOpen) {
            setTimeout(() => {
                this.scrollAllNodesToTop();
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const state = { ...prevState };

        if (nextProps.isOpen === true && prevState.shouldMountChildren === false) {
            state.position = nextProps.position;
            state.shouldMountChildren = true;
        }

        if (nextProps.forceMount) {
            state.shouldMountChildren = true;
        }

        if (!isEqual(state, prevState)) {
            return state;
        }

        return null;
    }

    componentWillUnmount() {
        if (this.props.allowReposition) {
            window.removeEventListener(OPTIMIZED_RESIZE_EVENT, this.detectEdges);
        }

        if (this.props.appendToBody) {
            window.removeEventListener(OPTIMIZED_RESIZE_EVENT, this.positionPortalPopover);
            this.unsubscribeParentScrollListener();
        }
    }

    getAbsolutePosition = () => {
        const { target } = this.props;
        const coords = target.getBoundingClientRect();
        const top = this.getTop(coords);
        const left = this.getLeft(coords);

        return {
            left,
            top
        };
    }

    getLeft = ({ left, width }) => {
        const { position } = this.state;
        const coords = this.elem.getBoundingClientRect();
        const dropdownWidth = coords.width;

        switch (position) {
            case 'bottom-center':
            case 'top-center':
                return Math.round((left - (dropdownWidth / 2)) + (width / 2));
            case 'bottom-left':
                return left;
            case 'bottom-right':
                return Math.round(left - (dropdownWidth - width));
            default:
                return 0;
        }
    }

    getTop = ({ top, height }) => {
        const { position, hasCaret } = this.props;
        const dropdownHeight = this.elem.offsetHeight;

        switch (position) {
            case 'bottom-center':
            case 'bottom-left':
            case 'bottom-right':
                return Math.round(top + height + (hasCaret ? 13 : 0));
            case 'top-center':
                return Math.round(top - dropdownHeight - 13);
            default:
                return 0;
        }
    }

    handleClick = () => {
        if (this.props.closeOnClick) {
            this.props.onOutsideClick();
        }
    }

    handleClickOutside = () => {
        this.props.onOutsideClick();
    }

    handleParentScroll = () => {
        if (!this.state.isScrolling) {
            this.setState({ isScrolling: true });
        }

        if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

        this.scrollTimeout = setTimeout(() => {
            this.setState({ isScrolling: false });
        }, 100);
    }

    handleParentScrollThrottled = throttle(this.handleParentScroll, 50)

    positionPortalPopover = () => {
        if (!this.props.target || !this.elem) {
            return;
        }

        let { top, left } = this.getAbsolutePosition();

        this.setState(prevState => ({
            ...prevState,
            elemStyles: { top, left, position: 'absolute' }
        }), () => {
            this.setState({ isObscured: false });
        });
    }

    scrollAllNodesToTop = () => {
        const scrollableNodes = getScrollableDescendants(this.elem);

        scrollableNodes.forEach(node => {
            node.scrollTop = 0;
        });
    }

    subscribeParentScrollListener = () => {
        const parent = getFirstScrollableParent(this.props.target);

        if (parent) {
            parent.addEventListener('scroll', this.handleParentScrollThrottled);
        }
    }

    unsubscribeParentScrollListener = () => {
        const parent = getFirstScrollableParent(this.props.target);

        if (parent) {
            parent.removeEventListener('scroll', this.handleParentScrollThrottled);
        }
    }

    render() {
        const containerStyles = classNames(
            css(
                styles.base,
                (!this.props.isOpen || this.state.isObscured) && styles.hidden,
                this.state.isScrolling && styles.hidden,
                this.props.type === 'default' && styles.default,
                this.props.type === 'menu' && styles.menu,
                !this.props.appendToBody && this.state.position === 'right-top' && styles.baseRightTop,
                !this.props.appendToBody && this.state.position === 'right-center' && styles.baseRightCenter,
                !this.props.appendToBody && this.state.position === 'right-bottom' && styles.baseRightBottom,
                !this.props.appendToBody && this.state.position === 'bottom-left' && styles.baseBottomLeft,
                !this.props.appendToBody && this.state.position === 'bottom-center' && styles.baseBottomCenter,
                !this.props.appendToBody && this.state.position === 'bottom-right' && styles.baseBottomRight,
                !this.props.appendToBody && this.state.position === 'top-center' && styles.baseTopCenter,
                !this.props.appendToBody && this.state.position === 'top-left' && styles.baseTopLeft,
                !this.props.appendToBody && this.state.position === 'top-right' && styles.baseTopRight,
                this.props.isBlock && styles.block,
                this.props.hasBorder === false && styles.noBorder,
                this.props.hasBackground === false && styles.noBackground
            ),
            this.props.className
        );
        const wrapperStyles = classNames(
            css(
                styles.wrapper,
                this.props.isPadded === false && styles.noPadding,
                this.props.isScrollable && styles.scrollable,
            )
        );
        const caretStyles = css([
            styles.caret,
            this.state.position === 'bottom-center' && styles.caretBottomCenter,
            this.state.position === 'bottom-right' && styles.caretBottomRight,
            this.state.position === 'left-center' && styles.caretLeftCenter,
            this.state.position === 'left-top' && styles.caretLeftTop,
            this.state.position === 'right-top' && styles.caretRightTop,
            this.state.position === 'top-center' && styles.caretTopCenter
        ]);

        return (
            <div
                className={containerStyles}
                onClick={this.handleClick}
                ref={elem => this.elem = elem}
                style={{
                    ...this.state.elemStyles,
                    maxWidth: this.props.maxWidth ? `${this.props.maxWidth}px` : 'auto'
                }}
            >
                {this.props.type === 'default' && this.props.hasCaret ? <div className={caretStyles}></div> : null}
                <div
                    className={wrapperStyles}
                    style={{
                        maxHeight: `${this.props.maxHeight}px`,
                        minWidth: `${this.props.minWidth}px`,
                        maxWidth: this.props.maxWidth ? `${this.props.maxWidth}px` : 'auto'
                    }}
                >
                    {this.state.shouldMountChildren ? this.props.children : null}
                </div>
            </div>
        );
    }
}

const clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.handleClickOutside;
    }
};

const OnClickOutsideWrappedPopover = onClickOutside(Popover, clickOutsideConfig);

class Controller extends Component {
    constructor(props) {
        super(props);

        if (this.props.appendToBody) {
            this.portalRoot = document.createElement('div');
            this.portalRoot.classList.add(css(styles.portalRoot));
            document.body.appendChild(this.portalRoot);
        }
    }

    static propTypes = {
        appendToBody: PropTypes.bool
    }

    componentWillUnmount() {
        if (this.portalRoot) {
            document.body.removeChild(this.portalRoot);
        }
    }

    render() {
        if (this.props.appendToBody) {
            return ReactDOM.createPortal(<OnClickOutsideWrappedPopover {...this.props} />, this.portalRoot);
        } else {
            return <OnClickOutsideWrappedPopover {...this.props} />;
        }
    }
}

const styles = StyleSheet.create({
    base: {
        position: 'absolute',
        display: 'inline-block',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        lineHeight: 1,
        color: styleGuide.colors.text,
        zIndex: '2',
        opacity: 1
    },
    portalRoot: {
        display: 'inline'
    },
    wrapper: {
        boxSizing: 'border-box',
        padding: '15px',
        borderRadius: '4px',
        position: 'relative'
    },
    scrollable: {
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    baseBottomLeft: {
        left: 0,
        top: '100%'
    },
    baseBottomCenter: {
        left: '50%',
        top: '100%',
        transform: 'translate(-50%, 0)',
    },
    baseBottomRight: {
        left: 'auto',
        right: '0',
        top: '100%',
        transform: 'translate(0,0)'
    },
    baseTopCenter: {
        left: '50%',
        right: 'auto',
        top: 'auto',
        bottom: '100%',
        transform: 'translate(-50%, 0)'
    },
    baseRightCenter: {
        left: '100%',
        top: '50%',
        transform: 'translate(0, -50%)'
    },
    baseRightTop: {
        left: '100%',
        top: '0px',
        transform: 'none'
    },
    baseRightBottom: {
        left: '100%',
        top: 'auto',
        bottom: 0
    },
    baseTopLeft: {
        left: 0,
        bottom: '100%',
        top: 'auto'
    },
    baseTopRight: {
        right: 0,
        bottom: '100%',
        top: 'auto'
    },
    block: {
        display: 'block',
        minWidth: '100%'
    },
    default: {
        boxShadow: '0px 1px 5px 1px rgba(0,0,0,0.2)',
        borderRadius: '4px'
    },
    hidden: {
        opacity: 0,
        pointerEvents: 'none !important'
    },
    caret: {
        position: 'absolute',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        height: '15px',
        width: '15px'
    },
    caretBottomCenter: {
        top: '0px',
        left: '50%',
        borderWidth: '1px 0 0 1px',
        borderTopLeftRadius: '2px',
        boxShadow: '1px -1px 1px 0px rgba(0,0,0,0.03)',
        transform: 'translate(-50%, -50%) rotate(-45deg)'
    },
    caretBottomRight: {
        top: '0px',
        left: 'auto',
        right: '10px',
        borderWidth: '1px 0 0 1px',
        borderTopLeftRadius: '2px',
        boxShadow: '1px -1px 1px 0px rgba(0,0,0,0.03)',
        transform: 'translateY(-50%) rotate(-45deg)'
    },
    caretLeftCenter: {
        top: '50%',
        left: '0',
        borderWidth: '1px 0 0 1px',
        borderTopLeftRadius: '2px',
        boxShadow: '-1px -1px 1px 0px rgba(0,0,0,0.07)',
        transform: 'translate(-50%, -50%) rotate(-45deg)'
    },
    caretLeftTop: {

    },
    caretRightTop: {
        top: '20px',
        left: '0',
        borderWidth: '1px 0 0 1px',
        borderTopLeftRadius: '2px',
        boxShadow: '-1px -1px 1px 0px rgba(0,0,0,0.07)',
        transform: 'translateX(-50%) rotate(-45deg)'
    },
    caretTopCenter: {
        top: '100%',
        left: '50%',
        borderWidth: '1px 0 0 1px',
        borderTopLeftRadius: '2px',
        boxShadow: '-1px 1px 1px 0px rgba(0,0,0,0.03)',
        transform: 'translateY(-50%) translateX(-50%) rotate(-45deg)'
    },
    menu: {
        border: `1px solid ${styleGuide.colors.light}`,
        borderRadius: '0px'
    },
    noBackground: {
        'backgroundColor': 'transparent !important'
    },
    noBorder: {
        border: 'none'
    },
    noPadding: {
        padding: '0px !important'
    }
});

export default Controller;