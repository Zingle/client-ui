import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from './Button';
import Input from './Input';
import { guide as styleGuide } from './style';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';

class LoginForm extends Component {
    static propTypes = {
        autofocusOnProp: PropTypes.bool,
        buttonText: PropTypes.string,
        didInvalidate: PropTypes.bool,
        didError: PropTypes.bool,
        doAutofocus: PropTypes.bool,
        onUsernameValueChange: PropTypes.func.isRequired,
        onPasswordValueChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        namespace: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordAutoFocus: PropTypes.bool,
        remindPath: PropTypes.string,
        size: PropTypes.oneOf(['large', 'default']),
        username: PropTypes.string.isRequired,
        errorText: PropTypes.string
    };

    static defaultProps = {
        autofocusOnProp: false,
        didInvalidate: false,
        doAutofocus: false,
        didError: false,
        isFetching: false,
        passwordAutoFocus: false,
        size: 'default',
        buttonText: 'Log in',
        errorText: 'We don\'t recognize that email & password combination.'
    };

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.autofocusOnProp === false && this.props.autofocusOnProp === true) {
            this.props.passwordAutoFocus ? setTimeout(() => this.passwordInput.focus()) : this.usernameInput.focus();
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();

        this.props.onSubmit({ username: this.props.username, password: this.props.password });
    }

    render() {
        return (
            <div className={css(styles.base)}>
                <form className={css(styles.form, this.props.size === 'large' && styles.form__block)}>
                    <Tooltip
                        id={this.props.namespace + '-error'}
                        isFullWidth={true}
                        isOpen={(this.props.didError || this.props.didInvalidate)}
                        sentiment="negative"
                        size={this.props.size !== 'large' ? 'small' : 'default'}
                        text={this.props.errorText}
                    />
                    <div className={css(styles.inputContainer, this.props.size === 'large' && styles.inputContainer__large)}>
                        <div className={css(this.props.size === 'large' ? styles.input__large : styles.input)}>
                            <Input
                                autocomplete={true}
                                autofocus={this.props.doAutofocus ? true : false}
                                id={this.props.namespace + '-username-input'}
                                inputRef={input => { this['usernameInput'] = input; }}
                                name="username"
                                onChange={evt => this.props.onUsernameValueChange(evt.target.value)}
                                placeholder="Email"
                                size={this.props.size === 'large' ? 'large' : 'default'}
                                value={this.props.username}
                            />
                        </div>
                        <div className={css(this.props.size === 'large' ? styles.input__large : styles.input)}>
                            <Input
                                autocomplete={false}
                                id={this.props.namespace + '-password-input'}
                                inputRef={input => { this['passwordInput'] = input; }}
                                name="password"
                                onChange={evt => this.props.onPasswordValueChange(evt.target.value)}
                                placeholder="Password"
                                size={this.props.size === 'large' ? 'large' : 'default'}
                                type="password"
                                value={this.props.password}
                            />
                        </div>
                    </div>
                    <div className={css(styles.subActions, this.props.size !== 'large' && styles.subActions__small)}>
                        {this.props.remindPath &&
                            <Link
                                id={this.props.namespace + '-remind-link'}
                                to={this.props.remindPath}
                            >
                                <span className={css(styles.forgotPasswordText)}>Forgot password?</span>
                            </Link>
                        }
                    </div>
                    <Button
                        id={this.props.namespace + '-submit-button'}
                        isBlock={true}
                        isWorking={this.props.isFetching}
                        onClick={this.handleSubmit}
                        showTextWhenWorking={false}
                        size={this.props.size === 'large' ? 'large' : 'default'}
                        text={this.props.buttonText}
                        type="submit"
                    />
                </form>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        textAlign: 'left'
    },
    forgotPasswordText: {
        color: styleGuide.colors.primary
    },
    form: {
        position: 'relative',
        width: '225px'
    },
    form__block: {
        width: '100%'
    },
    input: {
        'position': 'relative',
        ':not(:last-child)': {
            marginBottom: '10px'
        }
    },
    input__large: {
        'position': 'relative',
        ':not(:last-child)': {
            marginBottom: '17px'
        }
    },
    inputContainer: {
        marginBottom: '15px'
    },
    inputContainer__large: {
        marginBottom: '20px',
    },
    rememberText: {
        color: styleGuide.colors.textLight,
        marginLeft: '5px',
        cursor: 'pointer',
        userSelect: 'none'
    },
    subActions: {
        marginBottom: '30px'
    },
    subActions__small: {
        fontSize: '12px',
        marginBottom: '20px'
    }
});

export default LoginForm;