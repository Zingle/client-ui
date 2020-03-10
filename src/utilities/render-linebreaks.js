import React from 'react';

export default function(str) {
    return str.split('\n')
        .map((line, index) => {
            return index === 0 ? <span key={2}>{line}</span> : [<br key={0} />, <span key={1}>{line}</span>];
        });
}