function getCursorPosition(field) {
    // Initialize
    let caretPos = 0;

    // IE Support
    if (document.selection) {
        // Set focus on the element
        field.focus();
        // To get cursor position, get empty selection range
        const selectionRange = document.selection.createRange();
        // Move selection start to 0 position
        selectionRange.moveStart('character', -field.value.length);
        // The caret position is selection length
        caretPos = selectionRange.text.length;
    } else if (field.selectionStart || field.selectionStart === '0') {
        // Firefox support
        caretPos = field.selectionStart;
    }

    // Return results
    return caretPos;
}

export default getCursorPosition;