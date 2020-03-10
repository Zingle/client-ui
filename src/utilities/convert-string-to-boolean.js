const convertStringToBoolean = value => {
    if (value && typeof value === 'string') {
        if (value.toLowerCase() === 'true' || value.toLowerCase() === 'yes') return true;
        if (value.toLowerCase() === 'false' || value.toLowerCase() === 'no') return false;
    }
    return value;
};

export default convertStringToBoolean;