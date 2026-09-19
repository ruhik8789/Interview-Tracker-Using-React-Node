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

const ALLOWED_SORT_FIELDS = {
    created_at: "created_at",
    company: "company",
    role: "role",
    status: "status",
};

const ALLOWED_SORT_ORDERS = ["asc", "desc"];

module.exports = {
    validateInterview,
    ALLOWED_STATUSES,
    ALLOWED_SORT_FIELDS,
    ALLOWED_SORT_ORDERS
};