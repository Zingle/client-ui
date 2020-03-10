import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chunk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoadedComponent: null
        };
    }

    static propTypes = {
        load: PropTypes.func.isRequired,
        placeholder: PropTypes.func
    }

    componentDidMount() {
        this.load(this.props);
    }

    load(props) {
        this.setState({
            LoadedComponent: null
        });

        props.load().then(mod => {
            this.setState({
                LoadedComponent: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        const { LoadedComponent } = this.state;
        const Placeholder = this.props.placeholder ? this.props.placeholder : null;

        if (LoadedComponent) {
            return (
                <LoadedComponent {...this.props} />
            );
        } else if (Placeholder) {
            return (
                <Placeholder />
            );
        }

        return null;
    }
}

export default Chunk;