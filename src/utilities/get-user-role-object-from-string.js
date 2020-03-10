function getUserRoleObjectFromString(value) {
    if (!value) return null;

    const regex = new RegExp(/dashboard_(administrator|standard)(_with_bulk_messaging)?(_with_contact_deletion)?(_with_analytics)?(_with_user_management)?/g);
    const results = regex.exec(value);

    return {
        role: results[1],
        canGroupMessage: results[2] ? true : false,
        canDeleteContacts: results[3] ? true : false,
        canViewAnalytics: results[4] ? true : false,
        canManageUsers: results[5] ? true : false
    };
}

export default getUserRoleObjectFromString;