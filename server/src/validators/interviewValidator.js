const ALLOWED_STATUSES = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected"
];

const validateInterview = ({ company, role, status }) => {
    if (!company?.trim()) {
        return "Company is required";
    }

    if (!role?.trim()) {
        return "Role is required";
    }

    if (!ALLOWED_STATUSES.includes(status)) {
        return "Invalid interview status";
    }

    return null;
}

module.exports = {
    validateInterview,
    ALLOWED_STATUSES,
};