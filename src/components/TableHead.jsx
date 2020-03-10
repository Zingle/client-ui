import React, { Component } from 'react';
import { StyleSheet as coreStyleSheet } from 'aphrodite/no-important';
import descendantSelectorExtension from '../utilities/descendant-selector-aphrodite-extention';
import { guide as styleGuide } from '../style';

// allows use of descendant css selector
const extensions = { selectorHandler: descendantSelectorExtension };
const { StyleSheet, css } = coreStyleSheet.extend([extensions]);

class TableHead extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {

    }

    render() {
        return (
            <thead className={css(styles.base)}>
                {this.props.children}
            </thead>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        '& th': {
            textAlign: 'left',
            padding: '15px',
            fontWeight: 600,
            backgroundColor: styleGuide.colors.faint
        }
    }
});

export default TableHead;